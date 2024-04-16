"use client";
import { PostResponseData } from "@/zod-schemas/post";
import ContentFrame from "./containers/ContentFrame";
import PostFooter from "./containers/PostFooter";
import PostHeading from "./PostHeading";
import { formatDateStringLocalized } from "@/lib/utils";
import Link from "next/link";

const PostPreview = ({ post }: { post: PostResponseData }) => {
  const getPostSummary = () => {
    if (post.summary) {
      return post.summary;
    } else {
      return `${post.content.slice(0, 197)}...`;
    }
  };
  return (
    <ContentFrame>
      <PostHeading post={post} />
      <div className="italic">{getPostSummary()}</div>
      <PostFooter>
        <div>
          <span className="font-medium">Created at:</span>{" "}
          {formatDateStringLocalized(post.createdAt)}
        </div>
        <div className="ml-auto">
          <Link
            className="text-xs underline hover:opacity-80 font-semibold"
            href={`/post/${post.slug}`}
          >
            Read more
          </Link>
        </div>
      </PostFooter>
    </ContentFrame>
  );
};

export default PostPreview;
