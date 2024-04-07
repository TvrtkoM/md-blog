"use client";
import { PostResponseData } from "@/zod-schemas/post";
import MarkdownPreview from "@uiw/react-markdown-preview";
import ContentFrame from "./containers/ContentFrame";
import Heading2 from "./ui/Heading2";
import Link from "next/link";

const PostContentPreview = ({ post }: { post: PostResponseData }) => {
  return (
    <ContentFrame>
      <Heading2 className="flex items-baseline justify-between">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
        <Link
          className="text-xs underline hover:opacity-80"
          href={`/post/edit/${post.slug}`}
        >
          Edit
        </Link>
      </Heading2>
      <div data-color-mode="light">
        <MarkdownPreview
          source={post.content}
          className="!bg-transparent"
          rehypeRewrite={(node, index, parent) => {
            if (
              node.type === "element" &&
              parent?.type === "element" &&
              node.tagName === "a" &&
              parent &&
              /^h(1|2|3|4|5|6)/.test(parent.tagName)
            ) {
              parent.children = parent.children.slice(1);
            }
          }}
        ></MarkdownPreview>
      </div>
    </ContentFrame>
  );
};

export default PostContentPreview;
