import React from "react";
import { logout } from "@/actions/index.js";
const Signout = () => {
  return (
    <div>
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
};

export default Signout;
