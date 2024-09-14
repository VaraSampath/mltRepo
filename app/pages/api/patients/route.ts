import connectDB from "@/lib/connectDb";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { PatientSchemaType } from "@/lib/types";
import Patients from "@/model/Patients";

connectDB();

export const dynamic = "force-static";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany();
    return NextResponse.json(patients);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: PatientSchemaType = await req.json();
    const patient = new Patients(body);
    await patient.save();
    return NextResponse.json(
      { message: "Patient created successfully", patient },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
