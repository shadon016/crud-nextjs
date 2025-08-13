import Link from "next/link";
import Form from "@/components/form.jsx";
import { getPosts } from "../../services/crudService";
import Delete from "@/components/delete.jsx";
import { checkLogin } from "@/utils/checkAuth.js";
import Profile from "@/components/profile.jsx";
import Sugesstion from "@/components/sugesstion.jsx";
export default async function Home() {
  const posts = await getPosts();
  await checkLogin();

  return (
    <div className="flex ">
      <div className="flex-1/4">
        <Profile />
      </div>
      <div className="flex-2/4 flex flex-col  py-12 container mx-auto gap-16 h-[200vh] overflow-y-auto p-5">
        <div>
          <Form />
        </div>
        <div className="space-y-3">
          {posts?.data?.map((post) => (
            <div key={post?._id} className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <Link href={`/${post?.userId._id}`}>
                  <p className="text-xl font-bold">{post?.userId?.username}</p>
                </Link>
                <p>follow</p>
              </div>
              <p>{post?.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1/4">
        <Sugesstion />
      </div>
    </div>
  );
}
