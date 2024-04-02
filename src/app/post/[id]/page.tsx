import { PostResponseData } from "@/zod-schemas/post";
import React from "react";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3000/api/post/${params.id}`, {
    method: "get"
  });
  const post: PostResponseData = await res.json();
  console.log(post);
  return <>{post.content}</>;
};

export default PostPage;
