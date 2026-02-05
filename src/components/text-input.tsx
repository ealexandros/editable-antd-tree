import { cn } from "@/utilities/cn";
import React, { forwardRef } from "react";

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  endIcon?: React.ReactElement;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { onChange, onEnter, className, placeholder, ...rest } = props;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onEnter?.();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      ref={ref}
      type="text"
      className={cn("bg-transparent py-0", className)}
      placeholder={placeholder ?? "Type.."}
      onKeyDown={handleKeyDown}
      onChange={handleOnChange}
      {...rest}
    />
  );
});

TextInput.displayName = "TextInput";
