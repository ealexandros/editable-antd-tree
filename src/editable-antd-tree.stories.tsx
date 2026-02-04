/* eslint-disable no-console */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfigProvider } from "antd";
import { Folder, Paperclip } from "lucide-react";
import { EditableAntdTree } from ".";
import type { EditableAntdTreeProps } from "./editable-antd-tree";
import type { EditableAntdTreeNode } from "./types";

const logAction = (action: string) => (node: EditableAntdTreeNode) => {
  console.log(`${action}:`, node);
};

const defaultNodeActions = {
  deleteNode: { onAction: logAction("Deleted") },
  updateNode: { onAction: logAction("Updated") },
  createLeaf: { onAction: logAction("Leaf created") },
  createParent: { onAction: logAction("Parent created") },
};

const treeData: EditableAntdTreeNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        parent: "0-0",
        isLeaf: false,
        children: Array.from({ length: 3 }, (_, i) => ({
          title: `leaf ${i}`,
          key: `0-0-0-${i}`,
          parent: "0-0-0",
          isLeaf: true,
        })),
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        parent: "0-0",
        children: [{ title: "leaf", key: "0-0-1-0", parent: "0-0-1", isLeaf: true }],
      },
    ],
  },
];

export const Preview: StoryObj<EditableAntdTreeProps> = {
  args: {
    treeData,
    defaultExpandedKeys: ["0-0-0"],
    ...defaultNodeActions,
  },
};

export const CustomIcons: StoryObj<EditableAntdTreeProps> = {
  args: {
    treeData,
    icons: {
      createParent: <Folder className="size-4" />,
      update: <Paperclip className="size-4" />,
    },
    ...defaultNodeActions,
  },
};

export const CustomStyling: StoryObj<EditableAntdTreeProps> = {
  args: {
    treeData,
    showActionsOnHover: false,
    classNames: {
      root: "bg-white p-4 rounded-xl border border-gray-100 shadow-sm",
      nodeTitle: "font-medium text-slate-700",
      updateBtn: "text-blue-500 hover:bg-blue-50",
      deleteBtn: "text-rose-500 hover:bg-rose-50",
    },
    ...defaultNodeActions,
  },
};

export const Large: StoryObj<EditableAntdTreeProps> = {
  args: {
    treeData,
    size: "xl",
    ...defaultNodeActions,
  },
};

export default {
  title: "EditableAntdTree",
  component: EditableAntdTree,
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    Story => (
      <ConfigProvider>
        <div className="mx-auto min-h-100 max-w-2xl p-10">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
} satisfies Meta;
