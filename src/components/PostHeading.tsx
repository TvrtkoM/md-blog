"use client";
import React, { FC, PropsWithChildren } from "react";
import Heading2 from "./ui/Heading2";
import Link from "next/link";
import { PostResponseData } from "@/zod-schemas/post";
import useUserByIdQuery from "@/queries/useUserByIdQuery";
import { useUserContext } from "@/providers/UserProvider";

type PostHeadingProps = {
  post: PostResponseData;
  link?: boolean;
};

const PostHeading: FC<PostHeadingProps> = ({ post, link = true }) => {
  const { data: postUser } = useUserByIdQuery(post.userId);
  const { user } = useUserContext();

  return (
    <Heading2 className="flex items-baseline justify-between">
      <div className="space-x-2">
        {link ? (
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        ) : (
          <span>{post.title}</span>
        )}
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
  );
};

export default PostHeading;
