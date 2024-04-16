"use client";
import MainContainer from "@/components/containers/MainContainer";
import PostPreview from "@/components/PostPreview";
import { usePostsQuery } from "@/queries/usePostsQuery";

const PostsPage = () => {
  const { data: posts } = usePostsQuery();
  const hasPosts = posts.length > 0;
  return (
    <MainContainer>
      <div className="flex flex-col space-y-4">
        {posts.map((post) => {
          return <PostPreview post={post} key={post.id} />;
        })}
        {!hasPosts && <div className="text-center">No posts</div>}
      </div>
    </MainContainer>
  );
};

export default PostsPage;
