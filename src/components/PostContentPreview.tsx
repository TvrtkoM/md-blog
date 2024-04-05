"use client";
import { PostResponseData } from "@/zod-schemas/post";
import MarkdownPreview from "@uiw/react-markdown-preview";
import ContentFrame from "./containers/ContentFrame";
import Heading2 from "./ui/Heading2";
import Link from "next/link";

const PostContentPreview = ({ post }: { post: PostResponseData }) => {
  return (
    <ContentFrame>
      <Heading2>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </Heading2>
      <div data-color-mode="light">
        <MarkdownPreview
          source={post.content}
          className="!bg-transparent"
        ></MarkdownPreview>
      </div>
    </ContentFrame>
  );
};

export default PostContentPreview;
