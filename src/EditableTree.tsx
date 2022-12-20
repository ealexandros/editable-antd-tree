import { Tree } from "antd";
import { DataNode, EventDataNode, TreeProps } from "antd/lib/tree";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
import { EditableTreeTitle, TEditableTreeTitle } from "./EditableTreeTitle";
import { TextInput } from "./TextInput";
import { loadTreeChildren } from "./utils";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

export type EditableTreeNode = {
  id?: string;
  key: DataNode["key"];
  title?: string | null;
  parent?: DataNode["key"];
  isLeaf?: DataNode["isLeaf"];
  children?: EditableTreeNode[];
  disabled?: boolean;
  selectable?: boolean;
};

export type EditableTreeProps = {
  treeData: EditableTreeNode[];
  switcherIcon?: React.ReactNode;
  isLoading?: boolean;
  size?: keyof typeof sizes;
  createRootParent?: (node: EditableTreeNode) => void;
  loadData?: (treeData: EditableTreeNode) => Promise<EditableTreeNode[] | void>;
} & Omit<TreeProps, "switcherIcon" | "treeData" | "loadData"> &
  TEditableTreeTitle;

export const EditableTree = ({
  treeData: initTreeData,
  size = "sm",
  switcherIcon = (
    <TiArrowSortedDown size="2.75em" className="text-gray-600 -mt-[0.2em]" />
  ),
  isLoading,
  deleteNode,
  updateNode,
  createLeaf,
  createParent,
  createRootParent,
  loadData,
  ...props
}: EditableTreeProps) => {
  const [treeData, setTreeData] = useState<EditableTreeNode[]>(
    initTreeData || []
  );
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [parentTitleInput, setParentTitleInput] = useState("");

  const titleParams = {
    treeData,
    setTreeData,
    deleteNode,
    updateNode,
    createLeaf,
    createParent,
  };

  const handleCreateParentEnter = async () => {
    const newTreeData = [
      ...treeData,
      {
        key: v4(),
        id: "",
        title: parentTitleInput,
        isLeaf: false,
        children: [],
      },
    ];

    setTreeData(newTreeData);
    setParentTitleInput("");

    if (createRootParent) {
      createRootParent(newTreeData[newTreeData.length - 1]);
    }
  };

  const handleLoadData = async (node: EventDataNode<DataNode>) => {
    if (node.children?.length) {
      return;
    }

    let newChildren: EditableTreeNode[] = [];

    if (loadData) {
      newChildren = (await loadData(node as EditableTreeNode)) || [];
    }

    if (newChildren.length) {
      setTreeData((prev) => loadTreeChildren(prev, node.key, newChildren));
    }
  };

  const handleTreeExpand = (keys: React.Key[]) => {
    setExpandedKeys(keys);
  };

  const expandKey = (key: React.Key) => {
    setExpandedKeys((prev) => [...prev, key]);
  };

  return (
    <>
      <Tree
        treeData={treeData}
        loadData={handleLoadData}
        titleRender={(node: any) => (
          <EditableTreeTitle
            node={node}
            expandKey={expandKey}
            {...titleParams}
          />
        )}
        onExpand={handleTreeExpand}
        expandedKeys={expandedKeys}
        showLine={true}
        className={twMerge(props.className, sizes[size])}
        switcherIcon={<div>{switcherIcon}</div>}
        {...props}
      />

      <TextInput
        value={parentTitleInput}
        onChange={(value) => setParentTitleInput(value)}
        className={twMerge(
          "outline-none p-1 border-none opacity-70 hover:bg-gray-100 focus::bg-gray-50 rounded-sm duration-150 transition-all",
          sizes[size]
        )}
        onEnter={handleCreateParentEnter}
      />
    </>
  );
};
