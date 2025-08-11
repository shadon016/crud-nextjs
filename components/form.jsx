"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addPostAction } from "@/actions";
const Form = () => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) {
      return;
    }

    if (!submitting) {
      setSubmitting(true);
      const formData = new FormData(e.currentTarget);
      await addPostAction(formData);
      setTitle("");
      setSubmitting(false);
    }
  }
  return (
    <form className="flex flex-col gap-2 relative" onSubmit={handleSubmit}>
      <p className="my-2 text-red-500">
        {title?.length >= 120 && "character over limit"}
      </p>
      <p className="absolute text-xs px-5 py-1 right-0">{title.length}/120</p>
      <input
        type="text"
        placeholder="enter the title"
        name="title"
        className="ring-1 ring-purple-600 p-6 "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={title?.length >= 120}
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-8 text-gray-200 bg-purple-600 rounded-lg"
      >
        {submitting ? "posting.." : "post"}
      </button>
    </form>
  );
};

export default Form;
