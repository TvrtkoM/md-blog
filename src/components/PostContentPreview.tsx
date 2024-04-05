"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";
import ContentFrame from "./containers/ContentFrame";

const PostContentPreview = ({ content }: { content: string }) => {
  return (
    <ContentFrame>
      <div data-color-mode="light">
        <MarkdownPreview
          source={content}
          className="!bg-transparent"
        ></MarkdownPreview>
      </div>
    </ContentFrame>
  );
};

export default PostContentPreview;
