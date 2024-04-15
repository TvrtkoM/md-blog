"use client";
import { formatDateStringLocalized } from "@/lib/utils";
import { useUserContext } from "@/providers/UserProvider";
import useUserByIdQuery from "@/queries/useUserByIdQuery";
import { PostResponseData } from "@/zod-schemas/post";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Link from "next/link";
import rehypeSanitize from "rehype-sanitize";
import ContentFrame from "./containers/ContentFrame";
import Heading2 from "./ui/Heading2";

const rehypePlugins = [rehypeSanitize];

const Post = ({ post }: { post: PostResponseData }) => {
  const { user } = useUserContext();
  const { data: postUser } = useUserByIdQuery(post.userId);
  return (
    <ContentFrame>
      <Heading2 className="flex items-baseline justify-between">
        <div className="space-x-2">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
          <span className="text-xs">
            <em> by {postUser?.name}</em>
          </span>
        </div>
        {user && user.id === post.userId && (
          <Link
            className="text-xs underline hover:opacity-80"
            href={`/post/edit/${post.slug}`}
          >
            Edit
          </Link>
        )}
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
          rehypePlugins={rehypePlugins}
        ></MarkdownPreview>
      </div>
      <div className="mt-4 border-t border-stone-400 flex justify-between pt-2 text-xs">
        <div>
          <span className="font-medium">Created at:</span>{" "}
          {formatDateStringLocalized(post.createdAt)}
        </div>
        <div>
          <span className="font-medium">Updated at:</span>{" "}
          {formatDateStringLocalized(post.updatedAt)}
        </div>
      </div>
    </ContentFrame>
  );
};

export default Post;
