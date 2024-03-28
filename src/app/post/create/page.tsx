"use client";
import MainContainer from "@/components/MainContainer";
import { useUserContext } from "@/providers/UserProvider";
import withAuthGuard from "@/withAuthGuard";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const CreatePostPage = () => {
  const [text, setText] = useState("## Hi, *Pluto*!");

  return (
    <MainContainer>
      <h2 className="text-xl font-semibold pb-3 border-b border-stone-400 mb-6">
        Create new post
      </h2>
      <div data-color-mode="light">
        <MarkdownEditor
          value={text}
          className="h-96"
          enablePreview={false}
          onChange={(v) => setText(v)}
        />
      </div>
    </MainContainer>
  );
};

export default withAuthGuard(CreatePostPage);
