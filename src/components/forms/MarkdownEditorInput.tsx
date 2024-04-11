"use client";
import { cn } from "@/lib/utils";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { Label } from "../ui/Label";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <>Loading editor...</> }
);

interface MarkdownEditorInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: UseControllerProps<T>["rules"];
  className?: string;
  label: string;
}

const MarkdownEditorInput = <T extends FieldValues>({
  control,
  name,
  className = "",
  rules,
  label
}: MarkdownEditorInputProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController<T>({ control, name, rules });
  return (
    <>
      <div className="flex items-baseline justify-between h-6">
        <Label className="leading-6 cursor-pointer">
          <span className="text-xs">{label}</span>
        </Label>
        <p className="text-red-500 text-xs mt-0.5">{error?.message}</p>
      </div>
      <div data-color-mode="light">
        <MarkdownEditor
          value={value}
          enablePreview={false}
          toolbarsMode={[]}
          onChange={onChange}
          className={cn("border border-transparent rounded-sm", className, {
            "border-red-500": error?.message
          })}
        />
      </div>
    </>
  );
};

export default MarkdownEditorInput;
