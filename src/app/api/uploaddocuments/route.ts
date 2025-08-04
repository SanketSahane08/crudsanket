// app/api/upload/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const type = formData.get("type");
    const description = formData.get("description");
    const file = formData.get("file");

    // ✅ Check for missing fields
    if (!file || !title || !type) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    // ✅ Save file to /public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = file.name;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Make sure the directory exists (optional safety)
    // You can add fs.mkdir if needed with { recursive: true }

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // ✅ Build document object
    const document = {
      title,
      type,
      description,
      filePath: `/uploads/${fileName}`,
      uploadedAt: new Date(),
    };

    // ✅ Insert to MongoDB
    async function connectDB() {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URL!);
      }
    }

    return NextResponse.json({
      message: "✅ Document uploaded successfully.",
      document,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
