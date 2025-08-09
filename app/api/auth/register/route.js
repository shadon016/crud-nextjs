import { User } from "@/models/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/mongo";

export const POST = async (request) => {
  await connectDb();
  const { username, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return new NextResponse("user has been created", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
