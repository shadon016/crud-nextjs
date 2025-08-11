import React from "react";
import { auth } from "@/auth.js";
import { getLoggedInUser } from "@/models/queries/user.js";

const Profile = async () => {
  const session = await auth();
  const user = await getLoggedInUser(session?.user?.email);

  return <div className="sticky top-0">{user[0]?.username}</div>;
};

export default Profile;
