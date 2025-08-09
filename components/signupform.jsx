"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SignupForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/signin");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <p>{error && error}</p>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="user name" name="username" />
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">sign in</button>
      </form>
    </>
  );
}

export default SignupForm;
