import MainContainer from "@/components/MainContainer";
import PostContentPreview from "@/components/PostContentPreview";
import prismaClient from "@/prismaClient";
import { notFound } from "next/navigation";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const post = await prismaClient.post.findFirst({
      where: { id: Number(id) }
    });
    if (!post) {
      return notFound();
    }
    return (
      <MainContainer>
        <PostContentPreview content={post.content} />
      </MainContainer>
    );
  } catch {
    return notFound();
  }
};

export default PostPage;
