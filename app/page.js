import Link from "next/link";
import Form from "@/components/form.jsx";
import { getPosts } from "@/services/crudService.js";
import Delete from "@/components/delete.jsx";
export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="h-screen flex justify-between py-12 container mx-auto gap-16">
      <div>
        <p>all lists</p>
        {posts?.data?.map((post) => (
          <div key={post?._id} className="flex gap-3">
            <Link href={`/${post?._id}`}>
              <p>{post?.title}</p>
            </Link>
            <Link href="/">edit</Link>
            <Delete id={post?._id?.toString()} />
          </div>
        ))}
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}
