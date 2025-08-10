"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/actions/index.js";
import Link from "next/link";

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
      setError("incorrect username or password");
    }
  }
  return (
    <div className="h-screen flex flex-col lg:justify-center lg:items-center">
      <form
        onSubmit={onSubmit}
        className="max-w-sm mx-auto  p-8 rounded-lg shadow-md flex flex-col gap-6"
      >
        <p className="text-red-500">{error && error}</p>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p>
          dont have an account ?{" "}
          <span className="text-blue-400 underline">
            <Link href="/signup">signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
