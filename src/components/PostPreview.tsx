"use client";
import { PostResponseData } from "@/zod-schemas/post";
import ContentFrame from "./containers/ContentFrame";
import PostFooter from "./containers/PostFooter";
import PostHeading from "./PostHeading";
import { formatDateStringLocalized } from "@/lib/utils";
import Link from "next/link";

const PostPreview = ({ post }: { post: PostResponseData }) => {
  return (
    <ContentFrame>
      <PostHeading post={post} />
      <div className="italic">{post.summary ?? ""}</div>
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
