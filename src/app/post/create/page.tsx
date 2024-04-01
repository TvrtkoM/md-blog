"use client";
import CreatePostForm from "@/components/forms/CreatePostForm";
import withAuthGuard from "@/withAuthGuard";

const CreatePostPage = () => {
  return (
    <>
      <h2 className="text-xl font-semibold pb-3 border-b border-stone-400 mb-6">
        Create new post
      </h2>
      <CreatePostForm />
    </>
  );
};

export default withAuthGuard(CreatePostPage);
