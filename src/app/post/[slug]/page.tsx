"use client";
import MainContainer from "@/components/containers/MainContainer";
import Post from "@/components/Post";
import usePostBySlugQuery from "@/queries/usePostBySlugQuery";
import { notFound } from "next/navigation";

const PostPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: post } = usePostBySlugQuery(slug);
  if (!post) {
    return notFound();
  }
  return (
    <MainContainer>
      <Post post={post} />
    </MainContainer>
  );
};

export default PostPage;
