import { Meta, Story } from "@storybook/react";
import React from "react";
import {
  EditableAntdTree,
  EditableAntdTreeNode,
  EditableAntdTreeProps,
} from "./EditableAntdTree";

const meta: Meta = {
  title: "EditableAntdTree",
  component: EditableAntdTree,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

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
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            parent: "0-0-0",
            isLeaf: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
            parent: "0-0-0",
            isLeaf: true,
          },
          {
            title: "leaf",
            key: "0-0-0-2",
            parent: "0-0-0",
            isLeaf: true,
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        parent: "0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-1-0",
            parent: "0-0-1",
            isLeaf: true,
          },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        parent: "0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-2-0",
            parent: "0-0-2",
            isLeaf: true,
          },
          {
            title: "leaf",
            key: "0-0-2-1",
            parent: "0-0-2",
            isLeaf: true,
          },
        ],
      },
    ],
  },
];

const Template: Story<EditableAntdTreeProps> = (props) => (
  <EditableAntdTree {...props} />
);

export const Preview = Template.bind({});
Preview.args = {
  treeData: treeData,
  defaultExpandedKeys: ["0-0-0"],
  className: "text-md",
  deleteNode: {
    event: (node) => {
      console.log("node deleted", node);
    },
  },
  updateNode: {
    event: (node) => {
      console.log("node updated", node);
    },
  },
  createLeaf: {
    event: (node) => {
      console.log("leaf created", node);
    },
  },
  createParent: {
    event: (node) => {
      console.log("parent created", node);
    },
  },
};

export const Large = Template.bind({});
Large.args = {
  treeData: treeData,
  defaultExpandedKeys: ["0-0-0"],
  size: "xl",
};

export const Empty = Template.bind({});
Empty.args = {
  treeData: [],
  className: "text-md",
  deleteNode: {
    event: (node) => {
      console.log("node deleted", node);
    },
  },
  updateNode: {
    event: (node) => {
      console.log("node updated", node);
    },
  },
  createLeaf: {
    event: (node) => {
      console.log("leaf created", node);
    },
  },
  createParent: {
    event: (node) => {
      console.log("parent created", node);
    },
  },
};
