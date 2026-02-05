import type { NodeActionDisabled } from "@/types";
import { deleteTreeNode } from "@/utilities/tree-operations";
import { useEffect, useRef, useState } from "react";
import type { EditableTreeTitleProps } from "./editable-tree-title";

export const useEditableTreeTitle = ({
  treeData,
  updateTreeData,
  expandKey,
  node,
  deleteNode,
  updateNode,
  createLeaf,
  createParent,
}: EditableTreeTitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(node.title ?? "");
  const [editing, setEditing] = useState(node.title == null);
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = (action?: NodeActionDisabled) => {
    if (action == null) return false;
    if (typeof action === "function") return action(node);
    return Boolean(action);
  };

  const handleDelete = () => {
    deleteTreeNode({ tree: treeData, targetKey: node.key });
    updateTreeData([...treeData]);
    deleteNode?.onAction?.(node);
  };

  const toggleEdit = (forceClose = false) => {
    if (node.title == null) {
      handleDelete();
      return;
    }

    if (!forceClose) setInputValue(node.title);

    setEditing(prev => !prev);
  };

  const handleUpdate = () => {
    if (inputValue === node.title) return toggleEdit(true);

    const initialTitle = node.title;

    node.title = inputValue;
    node.key = crypto.randomUUID();

    if (initialTitle == null && node.children) createParent?.onAction?.(node);
    if (initialTitle == null && !node.children) createLeaf?.onAction?.(node);
    if (initialTitle != null) updateNode?.onAction?.(node);

    updateTreeData([...treeData]);
    toggleEdit(true);
  };

  const handleCreateNode = (isLeaf: boolean) => {
    if (!node.children) return;

    node.children.push({
      key: crypto.randomUUID(),
      title: null,
      isLeaf,
      parent: node.key,
      ...(isLeaf ? {} : { children: [] }),
    });

    updateTreeData([...treeData]);
    expandKey(node.key);
  };

  useEffect(() => {
    if (editing) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [editing]);

  return {
    inputRef,
    inputValue,
    setInputValue,
    editing,
    isHovered,
    setIsHovered,
    isDisabled,
    handleDelete,
    toggleEdit,
    handleUpdate,
    handleCreateNode,
  };
};
