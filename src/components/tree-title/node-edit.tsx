import { ActionButton } from "@/components/action-button";
import { TextInput } from "@/components/text-input";
import { cn } from "@/utilities/cn";
import React from "react";
import type { EditableTreeTitleProps } from "./editable-tree-title";

type NodeEditProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleUpdate: () => void;
  toggleEdit: (forceClose?: boolean) => void;
  icons: EditableTreeTitleProps["icons"];
  classNames?: EditableTreeTitleProps["classNames"];
};

export const NodeEdit = ({
  inputRef,
  inputValue,
  setInputValue,
  handleUpdate,
  toggleEdit,
  icons,
  classNames,
}: NodeEditProps) => (
  <div className="flex flex-1 items-center space-x-2">
    <TextInput
      ref={inputRef}
      value={inputValue}
      onChange={setInputValue}
      onEnter={handleUpdate}
      className={cn(
        "w-full rounded-md border-none bg-transparent px-2 py-0.5 ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-blue-400",
        classNames?.input,
      )}
      placeholder="Node title..."
    />
    <div className="flex space-x-0.5">
      <ActionButton
        label="Confirm"
        onClick={handleUpdate}
        icon={icons.confirm}
        className={cn("text-green-300 hover:text-green-600", classNames?.confirmBtn)}
      />
      <ActionButton
        label="Cancel"
        onClick={() => toggleEdit(false)}
        icon={icons.cancel}
        className={cn("text-red-300 hover:text-red-600", classNames?.cancelBtn)}
      />
    </div>
  </div>
);
