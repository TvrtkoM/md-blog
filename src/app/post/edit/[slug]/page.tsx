"use client";
import ContentFrame from "@/components/containers/ContentFrame";
import MainContainer from "@/components/containers/MainContainer";
import EditPostForm from "@/components/forms/EditPostForm";
import Heading2 from "@/components/ui/Heading2";
import usePostBySlugQuery from "@/queries/usePostBySlugQuery";
import withAuthGuard from "@/withAuthGuard";

const EditPostPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const { data: post } = usePostBySlugQuery(slug);
  return (
    <MainContainer>
      <ContentFrame>
        <Heading2>Edit post</Heading2>
        <EditPostForm post={post} />
      </ContentFrame>
    </MainContainer>
  );
};

export default withAuthGuard(EditPostPage);
