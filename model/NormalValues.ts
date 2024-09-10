import mongoose from "mongoose";

const NormalValues = new mongoose.Schema(
  {
    testGroup: { type: String },
    name: { type: String },
    units: { type: String },
    maleMax: { type: Number },
    maleMin: { type: Number },
    femaleMax: { type: Number },
    femaleMin: { type: Number },
    modifiedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NormalValues ||
  mongoose.model("NormalValues", NormalValues);
