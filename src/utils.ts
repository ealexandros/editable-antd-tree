import { DataNode } from "antd/lib/tree";
import React from "react";
import { EditableAntdTree } from "./EditableAntdTree";

export const deleteTreeNode = (
  tree: EditableAntdTree[],
  key: DataNode["key"]
) => {
  const parentIndex = tree.findIndex((el) => el.key === key);

  if (parentIndex !== -1) {
    tree.splice(parentIndex, 1);
    return;
  }

  deleteNestedNode(tree, key);
};

const deleteNestedNode = (tree: EditableAntdTree[], key: DataNode["key"]) => {
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i];

    if (!node.children) {
      continue;
    }

    if (node.children.some((item) => item.key === key)) {
      node.children = node.children.filter((el) => el.key !== key);
      return;
    }

    deleteNestedNode(node.children, key);
  }
};

export const loadTreeChildren = (
  tree: EditableAntdTree[],
  key: React.Key,
  children: EditableAntdTree[]
): EditableAntdTree[] =>
  tree.map((node) => {
    if (node.key === key && node.children) {
      return {
        ...node,
        children,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: loadTreeChildren(node.children, key, children),
      };
    }

    return node;
  });
