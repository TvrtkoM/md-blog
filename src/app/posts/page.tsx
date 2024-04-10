"use client";

import MainContainer from "@/components/containers/MainContainer";
import Post from "@/components/Post";
import { usePostsQuery } from "@/queries/usePostsQuery";

const PostsPage = () => {
  const { data: posts } = usePostsQuery();
  return (
    <MainContainer>
      <div className="flex flex-col space-y-4">
        {posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
    </MainContainer>
  );
};

export default PostsPage;
