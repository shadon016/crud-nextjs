import React from "react";
import { getPosts } from "@/services/crudService.js";
import { updateAction } from "@/actions/index.js";

const Page = async ({ params }) => {
  const { id } = await params;
  const posts = await getPosts();

  const post = posts?.data?.find((postData) => postData?._id === id);
  const modifiedAction = updateAction?.bind(null, id);
  return (
    <div>
      <form action={modifiedAction}>
        <input type="text" defaultValue={post?.title} name="title" />
        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default Page;
