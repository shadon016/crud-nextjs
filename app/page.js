import Link from "next/link";
import Form from "@/components/form.jsx";
import { getPosts } from "@/services/crudService.js";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="h-screen flex justify-between py-12 container mx-auto gap-16">
      <div>
        <p>all lists</p>
        {posts?.data?.map((post) => (
          <div key={post?._id}>
            <Link href={`/${post?._id}`}>
              <p>{post?.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}
