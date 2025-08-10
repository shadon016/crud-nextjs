import LoginForm from "@/components/loginForm.jsx";
import { islogggedIn } from "@/utils/checkAuth.js";
const Page = async () => {
  await islogggedIn("/");
  return <LoginForm />;
};

export default Page;
