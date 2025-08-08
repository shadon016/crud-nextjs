import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/models/postSchema.js";
import { connectDb } from "@/config/mongo";

export async function GET() {
  await connectDb();
  try {
    const posts = await Post.find({});
    return NextResponse.json({ data: posts });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}

export async function POST(request) {
  const { title } = await request.json();

  try {
    const data = await Post.create({ title });
    return NextResponse.json({ data: data });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
