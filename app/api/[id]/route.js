import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/models/postSchema.js";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const { title } = body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title },
      {
        new: true, // updated data return করে
        runValidators: true, // schema validation চালু রাখে
      }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "post not found" });
    }

    return NextResponse.json({ data: updatedPost });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(_request, { params }) {
  const { id } = await params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
