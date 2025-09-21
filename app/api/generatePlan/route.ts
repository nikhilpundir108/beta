import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // 👈 ADDED: Import the User model
import Plan from "@/models/Plan";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // --- START OF FIX ---
    // ❌ REMOVED: const { destination } = await req.json();

    // ✅ ADDED: Fetch the user from the database to get their saved destination
    const user = await User.findOne({ clerkId }).lean();
    if (!user || !user.preferences?.destination) {
      return NextResponse.json(
        { error: "User preferences not found. Please set a destination first." },
        { status: 404 }
      );
    }
    const { destination } = user.preferences;
    // --- END OF FIX ---

    // The rest of the function works perfectly with the retrieved destination
    if (!destination) {
      return NextResponse.json({ error: "Destination is required" }, { status: 400 });
    }

    // prompt that forces Gemini to return JSON only
    const prompt = `
      You are a smart travel assistant.
      Suggest 5 local **restaurants**, 5 **vendors/shops**, and 5 **homestays** in ${destination}.
      For each, return name, short description, and estimated cost (if applicable).
      
      Return ONLY valid JSON, no markdown, no explanations. 
      Example format:
      {
        "restaurants": [
          { "name": "ABC", "description": "Famous for...", "cost": "₹500 avg" }
        ],
        "vendors": [
          { "name": "XYZ Market", "description": "Known for...", "cost": "Varies" }
        ],
        "homestays": [
          { "name": "Sunrise Villa", "description": "Cozy stay...", "cost": "₹1500/night" }
        ]
      }
    `;

    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("Google API key is not configured in .env.local");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", safetySettings });

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    let suggestions;
    try {
      suggestions = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON parse failed. Raw text:", text);
      return NextResponse.json({ error: "Gemini returned invalid JSON" }, { status: 500 });
    }

    const plan = await Plan.create({
      clerkId,
      destination,
      suggestions,
    });

    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    console.error("❌ /api/generatePlan error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}