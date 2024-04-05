"use client";
import MainContainer from "@/components/containers/MainContainer";
import PostContentPreview from "@/components/PostContentPreview";
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
      <PostContentPreview post={post} />
    </MainContainer>
  );
};

export default PostPage;
