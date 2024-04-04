"use client";
import ContentFrame from "@/components/ContentFrame";
import CreatePostForm from "@/components/forms/CreatePostForm";
import MainContainer from "@/components/MainContainer";
import withAuthGuard from "@/withAuthGuard";

const CreatePostPage = () => {
  return (
    <MainContainer>
      <ContentFrame>
        <h2 className="text-xl font-semibold pb-3 border-b border-stone-400 mb-6">
          Create new post
        </h2>
        <CreatePostForm />
      </ContentFrame>
    </MainContainer>
  );
};

export default withAuthGuard(CreatePostPage);
