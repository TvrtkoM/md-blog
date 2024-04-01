"use client";

import usePostByIdQuery from "@/queries/usePostByIdQuery";
import { PostResponseData } from "@/zod-schemas/post";

const PostDetails = ({ post }: { post: PostResponseData }) => {
  const { data } = usePostByIdQuery(post.id);
  return <>{data?.content ?? post.content}</>;
};

export default PostDetails;
