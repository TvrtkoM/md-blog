"use client";

import MainContainer from "@/components/containers/MainContainer";
import PostContentPreview from "@/components/PostContentPreview";
import { usePostsQuery } from "@/queries/usePostsQuery";
import { Suspense } from "react";

const PostsPage = () => {
  const { data: posts } = usePostsQuery();
  return (
    <MainContainer>
      <Suspense>
        <div className="flex flex-col space-y-4">
          {posts.map((post) => {
            return <PostContentPreview post={post} key={post.id} />;
          })}
        </div>
      </Suspense>
    </MainContainer>
  );
};

export default PostsPage;
