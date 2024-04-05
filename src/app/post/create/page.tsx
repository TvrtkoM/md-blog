"use client";
import ContentFrame from "@/components/containers/ContentFrame";
import MainContainer from "@/components/containers/MainContainer";
import CreatePostForm from "@/components/forms/CreatePostForm";
import Heading2 from "@/components/ui/Heading2";
import withAuthGuard from "@/withAuthGuard";

const CreatePostPage = () => {
  return (
    <MainContainer>
      <ContentFrame>
        <Heading2>Create new post</Heading2>
        <CreatePostForm />
      </ContentFrame>
    </MainContainer>
  );
};

export default withAuthGuard(CreatePostPage);
