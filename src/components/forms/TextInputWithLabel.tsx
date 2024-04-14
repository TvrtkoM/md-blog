import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController
} from "react-hook-form";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface InputWithLabelProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
}

const TextInputWithLabel = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  className = ""
}: InputWithLabelProps<T>) => {
  const {
    field,
    fieldState: { invalid, error }
  } = useController<T>({ control, name });
  return (
    <fieldset className={className}>
      <div className="flex items-baseline justify-between h-6">
        <Label htmlFor={name} className="leading-6 cursor-pointer">
          <span className="text-xs">{label}</span>
        </Label>
        <p className="text-red-500 text-xs mt-0.5">{error?.message}</p>
      </div>
      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className={cn({
          "border-red-500 focus-visible:ring-red-500": invalid
        })}
      />
    </fieldset>
  );
};

export default TextInputWithLabel;
