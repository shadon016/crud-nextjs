import { usersModel } from "@/models/schemas/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { DbCon } from "@/services/mongo";

export const POST = async (request) => {
  const { username, email, password } = await request.json();
  await DbCon();

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await usersModel.create({
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
