"use client";

import React, { FC } from "react";
import MDPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";

type MarkdownPreviewProps = {
  content: string;
};

const rehypePlugins = [rehypeSanitize];

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div data-color-mode="light">
      <MDPreview
        source={content}
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
      />
    </div>
  );
};

export default MarkdownPreview;
