import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/models/schemas/postSchema.js";
import { User } from "@/models/schemas/userSchema.js";
import { connectDb } from "@/config/mongo";
import { auth } from "@/auth.js";
export async function GET() {
  await connectDb();
  try {
    const posts = await Post?.find({}).populate({
      path: "userId",
      model: User,
    });
    console.log(posts);
    return NextResponse.json({ data: posts });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}

export async function POST(request) {
  const { title, userId } = await request.json();

  try {
    const data = await Post.create({ title, userId });
    return NextResponse.json({ data: data });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
