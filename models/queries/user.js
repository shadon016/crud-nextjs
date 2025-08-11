import { User } from "../schemas/userSchema";

export async function getLoggedInUser(email) {
  const user = User?.find({ email: email });
  return user;
}
