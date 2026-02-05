import type { DataNode, EventDataNode } from "antd/lib/tree";
import { Check, FilePlusCorner, LayersPlus, Pencil, Trash, X } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import type { EditableAntdTreeProps } from "./editable-antd-tree";
import type { EditableAntdTreeNode, IconConfig } from "./types";
import { loadTreeChildren } from "./utilities/tree-operations";

const defaultIcons: IconConfig = {
  createParent: <LayersPlus className="size-4" />,
  createLeaf: <FilePlusCorner className="size-4" />,
  update: <Pencil className="size-4" />,
  delete: <Trash className="size-4" />,
  confirm: <Check className="size-4" />,
  cancel: <X className="size-4" />,
};

export const useEditableAntdTree = ({
  treeData: initTreeData,
  onTreeChange,
  loadData,
  icons: customIcons,
}: EditableAntdTreeProps) => {
  const [treeData, setTreeData] = useState<EditableAntdTreeNode[]>(initTreeData);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [rootNodeTitle, setRootNodeTitle] = useState("");

  const icons = useMemo(() => ({ ...defaultIcons, ...customIcons }), [customIcons]);

  const updateTree = (
    newData:
      | EditableAntdTreeNode[]
      | ((prev: EditableAntdTreeNode[]) => EditableAntdTreeNode[]),
  ) => {
    setTreeData(prev => {
      const updated = typeof newData === "function" ? newData(prev) : newData;
      onTreeChange?.(updated);
      return updated;
    });
  };

  const handleCreateRootNode = (
    isLeaf: boolean,
    createRootLeaf?: EditableAntdTreeProps["createRootLeaf"],
    createRootParent?: EditableAntdTreeProps["createRootParent"],
  ) => {
    if (!rootNodeTitle) return;

    const newNode: EditableAntdTreeNode = {
      key: crypto.randomUUID(),
      title: rootNodeTitle,
      isLeaf,
      ...(isLeaf ? {} : { children: [] }),
    };

    updateTree([...treeData, newNode]);
    setRootNodeTitle("");

    if (isLeaf) createRootLeaf?.onAction?.(newNode);
    if (!isLeaf) createRootParent?.onAction?.(newNode);
  };

  const handleLoadData = async (node: EventDataNode<DataNode>) => {
    if (node.children != null || node.isLeaf === true) return;

    const newChildren: EditableAntdTreeNode[] = [];

    if (loadData) {
      const result = await loadData(node as EditableAntdTreeNode);
      if (result instanceof Object) newChildren.push(...result);
    }

    if (newChildren.length) {
      updateTree(tree => loadTreeChildren({ tree, targetKey: String(node.key), newChildren }));
    }
  };

  const expandKey = (key: React.Key) => {
    return setExpandedKeys(prev => (prev.includes(key) ? prev : [...prev, key]));
  };

  return {
    treeData,
    expandedKeys,
    setExpandedKeys,
    rootNodeTitle,
    setRootNodeTitle,
    icons,
    updateTree,
    handleCreateRootNode,
    handleLoadData,
    expandKey,
  };
};
