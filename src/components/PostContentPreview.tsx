"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";

const PostContentPreview = ({ content }: { content: string }) => {
  return (
    <div data-color-mode="light">
      <MarkdownPreview
        source={content}
        className="!bg-transparent"
      ></MarkdownPreview>
    </div>
  );
};

export default PostContentPreview;
