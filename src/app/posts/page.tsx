"use client";

import MainContainer from "@/components/MainContainer";
import PostContentPreview from "@/components/PostContentPreview";
import { usePostsQuery } from "@/queries/usePostsQuery";

const PostsPage = () => {
  const { data: posts } = usePostsQuery();
  return (
    <MainContainer>
      <div className="flex flex-col space-y-4">
        {posts?.map((post) => {
          return <PostContentPreview content={post.content} />;
        })}
      </div>
    </MainContainer>
  );
};

export default PostsPage;
