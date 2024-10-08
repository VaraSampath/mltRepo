import connectDB from "@/lib/connectDb";
import { NextResponse, NextRequest } from "next/server";
import NormalValues from "@/model/NormalValues";
import { NormalValuesSchemaType } from "@/lib/types";

connectDB();

export const dynamic = "force-static";

export async function GET() {
  try {
    const normalValues = await NormalValues.find()
      .sort({ updatedAt: -1 })
      .exec();
    return NextResponse.json(normalValues);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: NormalValuesSchemaType = await req.json();
    const normalValue = new NormalValues(body);
    await normalValue.save();
    return NextResponse.json(
      { message: "Normal value created successfully", normalValue },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  await NormalValues.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Value deleted successfully" },
    { status: 200 }
  );
}
