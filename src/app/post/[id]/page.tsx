import MainContainer from "@/components/MainContainer";
import PostContentPreview from "@/components/PostContentPreview";
import { isErrorResponse } from "@/lib/client-errors";
import { notFound } from "next/navigation";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3000/api/post/${params.id}`, {
    method: "get"
  });
  const data = await res.json();
  if (isErrorResponse(data)) {
    return notFound();
  }
  return (
    <MainContainer>
      <PostContentPreview content={data.content} />
    </MainContainer>
  );
};

export default PostPage;
