import { ActionButton } from "@/components/action-button";
import { TextInput } from "@/components/text-input";
import type { EditableAntdTreeProps } from "@/editable-antd-tree";
import type { IconConfig, NodeAction } from "@/types";
import { cn } from "@/utilities/cn";

type TreeFooterProps = {
  rootNodeTitle: string;
  setRootNodeTitle: (value: string) => void;
  handleCreateRootNode: (
    isLeaf: boolean,
    createRootLeaf?: EditableAntdTreeProps["createRootLeaf"],
    createRootParent?: EditableAntdTreeProps["createRootParent"],
  ) => void;
  createRootLeaf?: EditableAntdTreeProps["createRootLeaf"];
  createRootParent?: EditableAntdTreeProps["createRootParent"];
  icons: IconConfig;
  classNames?: EditableAntdTreeProps["classNames"];
};

export const TreeFooter = ({
  rootNodeTitle,
  setRootNodeTitle,
  handleCreateRootNode,
  createRootLeaf,
  createRootParent,
  icons,
  classNames,
}: TreeFooterProps) => {
  const isActionDisabled = (disabled?: NodeAction["disabled"]) => {
    if (typeof disabled === "function") return false;
    return Boolean(disabled);
  };

  return (
    <div
      className={cn(
        "mt-2 flex items-center space-x-4 border-t border-gray-100 pt-4 pl-2",
        classNames?.footer,
      )}>
      <TextInput
        value={rootNodeTitle}
        onChange={setRootNodeTitle}
        onEnter={() => handleCreateRootNode(true, createRootLeaf, createRootParent)}
        className={cn(
          "max-w-50 flex-1 rounded-md border-none bg-transparent px-2 py-1 ring-1 ring-gray-200 transition-all outline-none focus:ring-2 focus:ring-blue-400",
          classNames?.rootInput,
        )}
        placeholder="Add root node..."
      />

      <div className="flex items-center space-x-2">
        <ActionButton
          disabled={isActionDisabled(createRootParent?.disabled)}
          onClick={() => handleCreateRootNode(false, createRootLeaf, createRootParent)}
          label={createRootParent?.label ?? "Create parent"}
          icon={icons.createParent}
          className={classNames?.createParentBtn}
        />
        <ActionButton
          disabled={isActionDisabled(createRootLeaf?.disabled)}
          onClick={() => handleCreateRootNode(true, createRootLeaf, createRootParent)}
          label={createRootLeaf?.label ?? "Create leaf"}
          icon={icons.createLeaf}
          className={classNames?.createLeafBtn}
        />
      </div>
    </div>
  );
};
