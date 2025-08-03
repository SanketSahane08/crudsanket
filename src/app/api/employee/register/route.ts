import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


// Connect to MongoDB
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL!);
  }
}

// Define Employee schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

// POST API
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, birthdate, email, contact, password, designation } = await req.json();

    // Check for existing employee
    const existing = await Employee.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Employee already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmp = await Employee.create({
      name,
      birthdate,
      email,
      contact,
      password: hashedPassword,
      designation,
    });

    return NextResponse.json({ message: "Employee registered successfully", employee: newEmp });
  } catch (err: any) {
    return NextResponse.json({ message: "Error registering employee", error: err.message }, { status: 500 });
  }
}
