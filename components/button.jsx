"use client";
import React, { useState, useRef } from "react";

export default function Button() {
  const [submitting, setSubmitting] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    if (submitting) {
      e.preventDefault(); // rapid multiple submit বন্ধ করবে
      return;
    }

    e.preventDefault(); // প্রথমে form submit বন্ধ করো

    setSubmitting(true);

    // debounce শেষে form submit করো
    timeoutRef.current = setTimeout(() => {
      e.preventDefault();
      e.target.form.submit(); // form কে programmatically submit করো
      setSubmitting(false);
    }, 1500);
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={submitting}
      className="px-8 text-gray-200 bg-purple-600 rounded-lg"
    >
      {submitting ? "Submitting..." : "Submit"}
    </button>
  );
}
