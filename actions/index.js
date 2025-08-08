"use server";
import { revalidatePath } from "next/cache";
import { createPost, deletePost } from "@/services/crudService.js";

export async function addPostAction(formData) {
  const title = formData.get("title");

  try {
    await createPost({ title });
    revalidatePath("/");
  } catch (err) {
    console.log(err?.message);
  }
}

export async function deleteAction(id) {
  await deletePost(id);
  revalidatePath("/");
}
