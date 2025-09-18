import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ clerkId }).lean() as { preferences?: { destination: string; travelType: string; budget: string; duration: string } } | null;
    if (!user || !user.preferences) {
      return NextResponse.json({ error: "User preferences not found. Please set them first." }, { status: 404 });
    }

    const { destination, travelType, budget, duration } = user.preferences;

    // The same detailed prompt works perfectly with the Flash model
    const prompt = `
      You are an expert travel planner located in Agra, India.
      The current date is September 17, 2025.
      A user wants a detailed travel plan with the following requirements:
      - Destination: ${destination}
      - Trip Duration: ${duration}
      - Travel Style: ${travelType}
      - Budget: ${budget}
      Generate a friendly, engaging, and detailed, day-by-day travel itinerary in Markdown format.
    `;
    
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("Google API key is not configured in your .env.local file");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    // CHANGE: Switched to the faster "Flash" model with higher free-tier rate limits.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", safetySettings });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const itineraryText = response.text();

    return NextResponse.json({ success: true, itinerary: itineraryText });

  } catch (error: any) {
    console.error("❌ /api/itinerary error:", error);
    if (error.message.includes('SAFETY')) {
      return NextResponse.json({ error: "The response was blocked due to safety settings. Try a different query." }, { status: 400 });
    }
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}