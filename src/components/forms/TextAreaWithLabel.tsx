import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { InputHTMLAttributes } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController
} from "react-hook-form";
import { TextArea } from "../ui/TextArea";

interface TextAreaWithLabelProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  inputClassname?: string;
}

const TextAreaWithLabel = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className = "",
  inputClassname = ""
}: TextAreaWithLabelProps<T>) => {
  const {
    field,
    fieldState: { invalid, error }
  } = useController<T>({ control, name });
  return (
    <fieldset className={className}>
      <div className="flex items-baseline justify-between h-6">
        <Label htmlFor={name} className="leading-6 cursor-pointer">
          <span className="text-xs font-medium">{label}</span>
        </Label>
        <p className="text-red-500 text-xs mt-0.5">{error?.message}</p>
      </div>
      <TextArea
        {...field}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          {
            "border-red-500 focus-visible:ring-red-500": invalid
          },
          inputClassname
        )}
      />
    </fieldset>
  );
};

export default TextAreaWithLabel;
