import { ActionButton } from "@/components/action-button";
import type { NodeActionDisabled } from "@/types";
import { cn } from "@/utilities/cn";
import type { EditableTreeTitleProps } from "./editable-tree-title";

type NodeActionsProps = {
  node: EditableTreeTitleProps["node"];
  icons: EditableTreeTitleProps["icons"];
  classNames?: EditableTreeTitleProps["classNames"];
  showActions: boolean;
  isDisabled: (action?: NodeActionDisabled) => boolean;
  handleCreateNode: (isLeaf: boolean) => void;
  toggleEdit: (forceClose?: boolean) => void;
  handleDelete: () => void;
  createParent?: EditableTreeTitleProps["createParent"];
  createLeaf?: EditableTreeTitleProps["createLeaf"];
  updateNode?: EditableTreeTitleProps["updateNode"];
  deleteNode?: EditableTreeTitleProps["deleteNode"];
};

export const NodeActions = ({
  node,
  icons,
  classNames,
  showActions,
  isDisabled,
  handleCreateNode,
  toggleEdit,
  handleDelete,
  createParent,
  createLeaf,
  updateNode,
  deleteNode,
}: NodeActionsProps) => (
  <div
    className={cn(
      "ml-4 flex items-center space-x-1.5 transition-opacity duration-200",
      !showActions && "invisible opacity-0",
      classNames?.nodeActions,
    )}>
    {node.children && (
      <>
        <ActionButton
          disabled={isDisabled(createParent?.disabled)}
          label={createParent?.label ?? "Create parent"}
          onClick={() => handleCreateNode(false)}
          icon={icons.createParent}
          className={classNames?.createParentBtn}
        />
        <ActionButton
          disabled={isDisabled(createLeaf?.disabled)}
          label={createLeaf?.label ?? "Create leaf"}
          onClick={() => handleCreateNode(true)}
          icon={icons.createLeaf}
          className={classNames?.createLeafBtn}
        />
      </>
    )}
    <ActionButton
      disabled={isDisabled(updateNode?.disabled)}
      label={updateNode?.label ?? "Edit"}
      onClick={() => toggleEdit(true)}
      icon={icons.update}
      className={classNames?.updateBtn}
    />
    <ActionButton
      disabled={isDisabled(deleteNode?.disabled)}
      label={deleteNode?.label ?? "Delete"}
      onClick={handleDelete}
      icon={icons.delete}
      className={cn("hover:text-red-500", classNames?.deleteBtn)}
    />
  </div>
);
