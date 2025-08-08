"use server";
import { revalidatePath } from "next/cache";
import { createPost } from "@/services/crudService.js";

export async function addPostAction(formData) {
  const title = formData.get("title");

  try {
    await createPost({ title });
    revalidatePath("/");
  } catch (err) {
    console.log(err?.message);
  }
}
