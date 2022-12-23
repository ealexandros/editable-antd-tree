import { Tooltip, Tree } from "antd";
import { DataNode, EventDataNode, TreeProps } from "antd/lib/tree";
import React, { useState } from "react";
import { AiOutlineSisternode, AiOutlineSubnode } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { EditableTreeTitle, TEditableTreeTitle } from "./EditableAntdTreeTitle";
import { TextInput } from "./TextInput";
import { loadTreeChildren } from "./utils";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

export type EditableAntdTreeNode = Omit<
  DataNode,
  "title" | "children" | "key"
> & {
  key: string;
  title?: string | null;
  parent?: string;
  children?: EditableAntdTreeNode[];
};

export type EditableAntdTreeProps = {
  treeData: EditableAntdTreeNode[];
  switcherIcon?: React.ReactNode;
  size?: keyof typeof sizes;
  createRootLeaf?: {
    caption?: string;
    disable?: boolean;
    action?: (node: EditableAntdTreeNode) => void;
  };
  createRootParent?: {
    caption?: string;
    disable?: boolean;
    action?: (node: EditableAntdTreeNode) => void;
  };
  loadData?: (
    treeData: EditableAntdTreeNode
  ) => Promise<EditableAntdTreeNode[] | void>;
} & Omit<TreeProps, "switcherIcon" | "treeData" | "loadData"> &
  TEditableTreeTitle;

export const EditableAntdTree = ({
  treeData: initTreeData,
  size = "sm",
  switcherIcon = (
    <TiArrowSortedDown size="2.75em" className="text-gray-600 -mt-[0.2em]" />
  ),
  deleteNode,
  updateNode,
  createLeaf,
  createParent,
  createRootLeaf,
  createRootParent,
  loadData,
  ...props
}: EditableAntdTreeProps) => {
  const [treeData, setTreeData] = useState<EditableAntdTreeNode[]>(
    initTreeData || []
  );
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [rootNodeTitleInput, setRootNodeTitleInput] = useState("");

  const titleParams = {
    treeData,
    setTreeData,
    deleteNode,
    updateNode,
    createLeaf,
    createParent,
  };

  const handleCreateRootNode = (isLeaf: boolean) => {
    if (!rootNodeTitleInput) {
      return;
    }

    const newTreeData = [
      ...treeData,
      {
        key: uuidv4(),
        title: rootNodeTitleInput,
        isLeaf,
        ...(!isLeaf ? { children: [] } : {}),
      },
    ];

    setTreeData(newTreeData);
    setRootNodeTitleInput("");

    if (isLeaf && createRootLeaf?.action) {
      createRootLeaf.action(newTreeData[newTreeData.length - 1]);
    }

    if (!isLeaf && createRootParent?.action) {
      createRootParent.action(newTreeData[newTreeData.length - 1]);
    }
  };

  const handleLoadData = async (node: EventDataNode<DataNode>) => {
    if (node.children?.length || node.isLeaf) {
      return;
    }

    let newChildren: EditableAntdTreeNode[] = [];

    if (loadData) {
      newChildren = (await loadData(node as EditableAntdTreeNode)) || [];
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

      <div
        className={twMerge(
          "flex items-center w-max space-x-2 pl-1",
          sizes[size]
        )}
      >
        <TextInput
          value={rootNodeTitleInput}
          onChange={(value) => setRootNodeTitleInput(value)}
          className={twMerge(
            "outline-none p-1 border-none opacity-70 hover:bg-gray-100 focus::bg-gray-50 rounded-sm duration-150 transition-all",
            sizes[size]
          )}
        />

        <div className="space-x-2">
          {!createRootParent?.disable && (
            <button onClick={() => handleCreateRootNode(false)}>
              <Tooltip title={createRootParent?.caption || "Create Parent"}>
                <AiOutlineSisternode />
              </Tooltip>
            </button>
          )}

          {!createRootLeaf?.disable && (
            <button>
              <Tooltip title={createRootLeaf?.caption || "Create Leaf"}>
                <AiOutlineSubnode onClick={() => handleCreateRootNode(true)} />
              </Tooltip>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
