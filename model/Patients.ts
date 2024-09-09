import mongoose from "mongoose";

const Patients = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: { type: String },
    age: { type: Number },
    ageUnit: { type: String },
    gender: { type: String },
    phone: { type: String },
    village: { type: String },
    amount: { type: Number },
    referredBy: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Patients || mongoose.model("Patients", Patients);
