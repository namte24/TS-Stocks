import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../DATABASE/Mongoose"; // <--- CHANGE THIS to the path of your connection file

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ 
      status: "success", 
      message: "Connected to MongoDB successfully!" 
    });
  } catch (error: any) {
    console.error("Database Connection Error:", error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to connect to the database.", 
      error: error.message 
    }, { status: 500 });
  }
}