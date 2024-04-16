"use client";

import useCreateOrUpdatePostMutation from "@/mutations/useCreateOrUpdatePostMutation";
import { PostFormData, PostSchema } from "@/zod-schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import MarkdownEditorInput from "./MarkdownEditorInput";
import TextAreaWithLabel from "./TextAreaWithLabel";
import InputWithLabel from "./TextInputWithLabel";

const EditPostForm = ({ post }: { post?: PostFormData }) => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isValid }
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: post ?? {
      content: "",
      title: ""
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const { mutate: submitPost, isSuccess } = useCreateOrUpdatePostMutation();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNew = Boolean(post);

  useEffect(() => {
    if (isSuccess) {
      router.push("/posts");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    const { unsubscribe } = watch((value, { name, type }) => {
      if (name === "summary" && type === "change" && value.summary === "") {
        setValue("summary", undefined, { shouldValidate: true });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setIsSubmitting(true);
        if (isNew) {
          submitPost({ ...data, id: post?.id });
        } else {
          submitPost(data);
        }
      })}
    >
      <InputWithLabel
        control={control}
        label="Title *"
        name="title"
        placeholder="Title"
        className="mb-4"
      />
      <TextAreaWithLabel
        control={control}
        name="summary"
        label="Summary"
        placeholder="Summary"
        className="mb-4 min-h-10"
        inputClassname="resize-none"
      />
      <MarkdownEditorInput
        control={control}
        name="content"
        label="Content *"
        className="h-96"
        rules={{ required: true }}
      />
      <Button
        type="submit"
        className="mt-7"
        disabled={!isValid || isSubmitting}
      >
        {post ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default EditPostForm;
