import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TextProps = {
  onChange?: (value: any) => void;
  onEnter?: Function;
  endIcon?: React.ReactElement;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const TextInput = forwardRef<HTMLInputElement, TextProps>(
  ({ onChange, onEnter, placeholder, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onEnter) {
        onEnter();
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        onKeyDown={handleKeyDown}
        className={twMerge("bg-transparent py-0", props.className)}
        placeholder={placeholder ?? "Type.."}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";
