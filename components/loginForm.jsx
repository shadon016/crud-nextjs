"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/actions/index.js";

function LoginForm() {
  const [error, setError] = useState();
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await login(formData);
      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError(error);
    }
  }
  return (
    <>
      {error && error}
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="email" required name="email" />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
        />
        <button type="submit">login</button>
      </form>
    </>
  );
}

export default LoginForm;
