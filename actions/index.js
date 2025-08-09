"use server";
import { revalidatePath } from "next/cache";
import { createPost, deletePost, updatePost } from "@/services/crudService.js";
import { redirect } from "next/navigation";

export async function addPostAction(formData) {
  const title = formData.get("title");

  try {
    await createPost({ title });
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
