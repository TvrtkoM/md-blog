"use client";
import { formatDateStringLocalized } from "@/lib/utils";
import { PostResponseData } from "@/zod-schemas/post";
import ContentFrame from "./containers/ContentFrame";
import PostHeading from "./PostHeading";
import MarkdownPreview from "./MarkdownPreview";
import PostFooter from "./containers/PostFooter";

const Post = ({ post }: { post: PostResponseData }) => {
  return (
    <ContentFrame>
      <PostHeading post={post} />
      <div data-color-mode="light">
        <MarkdownPreview content={post.content} />
      </div>
      <PostFooter>
        <div>
          <span className="font-medium">Created at:</span>{" "}
          {formatDateStringLocalized(post.createdAt)}
        </div>
        <div>
          <span className="font-medium">Updated at:</span>{" "}
          {formatDateStringLocalized(post.updatedAt)}
        </div>
      </PostFooter>
    </ContentFrame>
  );
};

export default Post;
