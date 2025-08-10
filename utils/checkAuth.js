import { redirect } from "next/navigation";
import { auth } from "@/auth.js";
export async function checkLogin() {
  const session = await auth();

  if (!session) {
    redirect("signin");
  }
}

export async function islogggedIn(path) {
  const session = await auth();

  if (session) {
    redirect(path);
  }
}
