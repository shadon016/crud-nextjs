"use client";
import React from "react";
import { deleteAction } from "@/actions/index.js";
const Delete = ({ id }) => {
  async function handleSubmit(e) {
    e.preventDefault();
    await deleteAction(id);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">delete</button>
      </form>
    </div>
  );
};

export default Delete;
