import { DataNode } from "antd/lib/tree";
import React from "react";
import { EditableTreeNode } from "./EditableTree";

export const deleteTreeNode = (
  tree: EditableTreeNode[],
  key: DataNode["key"]
) => {
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i];

    if (!node.children) {
      continue;
    }

    if (node.children.some((item) => item.key === key)) {
      node.children = node.children.filter((el) => el.key !== key);
      return;
    }

    deleteTreeNode(node.children, key);
  }
};

export const appendTreeChildren = (
  tree: EditableTreeNode[],
  key: React.Key,
  children: EditableTreeNode[]
): EditableTreeNode[] =>
  tree.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: appendTreeChildren(node.children, key, children),
      };
    }

    return node;
  });
