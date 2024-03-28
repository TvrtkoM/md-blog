"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const CreatePostForm = () => {
  const [text, setText] = useState("## Hi, *Pluto*!");
  return (
    <div data-color-mode="light">
      <MarkdownEditor
        value={text}
        className="h-96"
        enablePreview={false}
        onChange={(v) => setText(v)}
      />
    </div>
  );
};

export default CreatePostForm;
