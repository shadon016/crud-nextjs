"use server";
import { signIn, signOut, auth } from "@/auth.js";
import { revalidatePath } from "next/cache";
import { createPost, deletePost, updatePost } from "@/services/crudService.js";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/models/queries/user.js";
import { User } from "@/models/schemas/userSchema.js";
import mongoose from "mongoose";
// auth
export const login = async (formData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  const signout = await signOut();
  if (signout) {
    redirect("/login");
  }
};

// posts
export async function addPostAction(formData) {
  const title = formData.get("title");
  const session = await auth();
  try {
    await createPost({ title, userId: session?.user.id });
    revalidatePath("/");
  } catch (err) {
    console.log(err?.message);
  }
}

export async function updateAction(id, formData) {
  const title = formData.get("title");

  try {
    await updatePost(id, { title });
  } catch (err) {
    console.log(err?.message);
  }
  redirect("/");
}

export async function deleteAction(id) {
  await deletePost(id);
  revalidatePath("/");
}

// follow option

export async function toggleFollow(targetUserId) {
  const session = await auth();

  if (!session) throw new Error("Not authenticated");

  if (targetUserId === session?.user?.id) {
    throw new Error("You cannot follow yourself");
  }

  const me = await User.findById(session.user.id);
  const target = await User.findById(targetUserId);
  console.log("target" + me);
  if (!target) throw new Error("User not found");

  const alreadyFollowing = me?.following?.includes(target._id);

  if (alreadyFollowing) {
    me.following.pull(target?._id);
    target.followers.pull(me?._id);
  } else {
    me?.following.push(target?._id);
    target?.followers.push(me?._id);
  }

  await me?.save();
  await target?.save();
  revalidatePath("/");
  return !alreadyFollowing; // true হলে এখন follow করা হল
}
