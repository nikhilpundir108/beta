import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Destination from "@/models/Destination";
import Homestay from "@/models/Homestay";
import Restaurant from "@/models/Restaurant";
import Vendor from "@/models/Vendor";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const destination = await Destination.findById(params.id).lean();
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const [homestays, restaurants, vendors] = await Promise.all([
      Homestay.find({ destinationId: params.id }).lean(),
      Restaurant.find({ destinationId: params.id }).lean(),
      Vendor.find({ destinationId: params.id }).lean(),
    ]);

    return NextResponse.json({
      ...destination,
      homestays,
      restaurants,
      vendors,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 });
  }
}
