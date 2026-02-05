import type { EditableAntdTreeNode } from "@/types";

type TreeOperationArgs = {
  tree: EditableAntdTreeNode[];
  targetKey: EditableAntdTreeNode["key"];
};

export const deleteTreeNode = ({ tree, targetKey }: TreeOperationArgs) => {
  const index = tree.findIndex(node => node.key === targetKey);

  if (index !== -1) {
    tree.splice(index, 1);
    return;
  }

  for (const node of tree) {
    if (!node.children) continue;

    const beforeLength = node.children.length;
    deleteTreeNode({ tree: node.children, targetKey });

    if (node.children.length !== beforeLength) {
      return;
    }
  }
};

type LoadChildrenArgs = TreeOperationArgs & {
  newChildren: EditableAntdTreeNode[];
};

export const loadTreeChildren = ({
  tree,
  targetKey,
  newChildren,
}: LoadChildrenArgs): EditableAntdTreeNode[] => {
  return tree.map(node => {
    if (node.key === targetKey && node.children) {
      return { ...node, children: newChildren };
    }

    if (!node.children) {
      return node;
    }

    return {
      ...node,
      children: loadTreeChildren({ tree: node.children, targetKey, newChildren }),
    };
  });
};
