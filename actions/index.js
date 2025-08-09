"use server";
import { signIn, signOut } from "@/auth.js";
import { revalidatePath } from "next/cache";
import { createPost, deletePost, updatePost } from "@/services/crudService.js";
import { redirect } from "next/navigation";
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
