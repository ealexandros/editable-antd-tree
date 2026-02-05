import type { EditableTreeTitleProps } from "@/components/tree-title";
import type { DataNode } from "antd/lib/tree";
import type React from "react";

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type TreeSize = "xs" | "sm" | "md" | "lg" | "xl";

export const sizeVariants: Record<TreeSize, string> = {
  xs: "!text-xs",
  sm: "!text-sm",
  md: "!text-md",
  lg: "!text-lg",
  xl: "!text-xl",
} as const;

export type EditableAntdTreeNode = Omit<DataNode, "title" | "children" | "key"> & {
  key: string;
  title?: string | null;
  parent?: string;
  children?: EditableAntdTreeNode[];
};

export type NodeActionDisabled = boolean | ((node: EditableAntdTreeNode) => boolean);

export type NodeAction = {
  label?: string;
  disabled?: NodeActionDisabled;
  onAction?: (node: EditableAntdTreeNode) => void;
};

export type IconConfig = {
  createParent: React.ReactNode;
  createLeaf: React.ReactNode;
  update: React.ReactNode;
  delete: React.ReactNode;
  confirm: React.ReactNode;
  cancel: React.ReactNode;
};

export type EditableTreeClassNames = {
  nodeTitle?: string;
  nodeActions?: string;
  input?: string;
  confirmBtn?: string;
  cancelBtn?: string;
  updateBtn?: string;
  deleteBtn?: string;
  createParentBtn?: string;
  createLeafBtn?: string;
};

export type EditableTreeTitleActions = Omit<
  EditableTreeTitleProps,
  "treeData" | "node" | "expandKey" | "icons" | "showActionsOnHover" | "classNames"
>;
