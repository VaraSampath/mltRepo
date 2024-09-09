/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }

  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("database started"))
    .catch((err) => console.log(err));

  //
};

export default connectDB;
