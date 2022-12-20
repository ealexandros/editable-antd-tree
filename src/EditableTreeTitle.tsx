import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSisternode, AiOutlineSubnode } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
import { EditableTreeNode } from "./EditableTree";
import { TextInput } from "./TextInput";
import { deleteTreeNode } from "./utils";

type EditableTreeTitleProps = {
  treeData: EditableTreeNode[];
  setTreeData: React.Dispatch<React.SetStateAction<EditableTreeNode[]>>;
  expandKey: Function;
  node: EditableTreeNode;
  deleteNode?: {
    caption?: string;
    disable?: boolean | ((node: EditableTreeNode) => boolean | undefined);
    event?: (node: EditableTreeNode) => void;
  };
  updateNode?: {
    caption?: string;
    disable?: boolean | ((node: EditableTreeNode) => boolean | undefined);
    event?: (node: EditableTreeNode) => void;
  };
  createLeaf?: {
    caption?: string;
    disable?: boolean | ((node: EditableTreeNode) => boolean | undefined);
    event?: (node: EditableTreeNode) => void;
  };
  createParent?: {
    caption?: string;
    disable?: boolean | ((node: EditableTreeNode) => boolean | undefined);
    event?: (node: EditableTreeNode) => void;
  };
};

export type TEditableTreeTitle = Omit<
  EditableTreeTitleProps,
  "treeData" | "setTreeData" | "node" | "expandKey"
>;

export const EditableTreeTitle = ({
  treeData,
  setTreeData,
  expandKey,
  node,
  deleteNode,
  updateNode,
  createLeaf,
  createParent,
}: EditableTreeTitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState((node.title as string) || "");
  const [edit, setEdit] = useState(treeData && !node.title);

  const handleCreateLeafClick = () => {
    if (!node.children) {
      return;
    }

    deleteTreeNode(treeData, "");
    expandKey(node.key);

    node.children?.push({
      key: "",
      title: null,
      isLeaf: true,
      parent: node.id,
    });
    setTreeData([...treeData]);
  };

  const handleCreateParentClick = () => {
    if (!node.children) {
      return;
    }

    deleteTreeNode(treeData, "");
    expandKey(node.key);

    node.children?.push({
      key: "",
      title: null,
      isLeaf: false,
      parent: node.id,
      children: [],
    });
    setTreeData([...treeData]);
  };

  const handleDeleteClick = () => {
    const isParent = treeData.some((el) => el.key === node.key);

    if (isParent) {
      setTreeData((prev) => [...prev.filter((el) => el.key !== node.key)]);
    }

    if (!isParent) {
      deleteTreeNode(treeData, node.key);
      setTreeData([...treeData]);
    }

    if (deleteNode?.event) {
      deleteNode.event(node);
    }
  };

  const handleEditToggle = (onOpen: boolean) => {
    if (!node.title) {
      handleDeleteClick();
      return;
    }

    if (!onOpen) {
      setInputValue(node.title as string);
    }

    setEdit((prev) => !prev);
  };

  const handleUpdateClick = () => {
    const initValue = node.title;

    if (inputValue === node.title) {
      handleEditToggle(true);
      return;
    }

    node.title = inputValue;
    node.key = v4();

    if (!initValue && !node.children && createLeaf?.event) {
      createLeaf?.event(node);
    }

    if (!initValue && node.children && createParent?.event) {
      createParent?.event(node);
    }

    if (initValue && updateNode?.event) {
      updateNode?.event(node);
    }

    handleEditToggle(true);
    setTreeData([...treeData]);
  };

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  return (
    <div className="flex items-center space-x-4">
      {edit ? (
        <div className="flex items-center space-x-1">
          <TextInput
            ref={inputRef}
            value={inputValue}
            className="outline-none px-2 border-none py-0"
            onChange={(value) => setInputValue(value)}
            onEnter={handleUpdateClick}
          />
          <div className="flex space-x-0.5">
            <button onClick={handleUpdateClick}>
              <BiCheck />
            </button>
            <button onClick={() => handleEditToggle(false)}>
              <GrFormClose />
            </button>
          </div>
        </div>
      ) : (
        <span>{node.title as string}</span>
      )}

      <div
        className={twMerge(
          "space-x-1 flex items-center text-gray-600",
          edit && "hidden"
        )}
      >
        {(typeof createParent?.disable === "function"
          ? !createParent?.disable(node)
          : !createParent?.disable) &&
          node.children && (
            <Tooltip title={createParent?.caption || "Create Parent"}>
              <button onClick={handleCreateParentClick}>
                <AiOutlineSisternode />
              </button>
            </Tooltip>
          )}

        {(typeof createLeaf?.disable === "function"
          ? !createLeaf?.disable(node)
          : !createLeaf?.disable) &&
          node.children && (
            <Tooltip title={createLeaf?.caption || "Create Leaf"}>
              <button onClick={handleCreateLeafClick}>
                <AiOutlineSubnode />
              </button>
            </Tooltip>
          )}

        {(typeof updateNode?.disable === "function"
          ? !updateNode?.disable(node)
          : !updateNode?.disable) && (
          <Tooltip title={updateNode?.caption || "Update Node"}>
            <button onClick={() => handleEditToggle(true)}>
              <RiPencilFill />
            </button>
          </Tooltip>
        )}

        {(typeof deleteNode?.disable === "function"
          ? !deleteNode?.disable(node)
          : !deleteNode?.disable) && (
          <Tooltip title={deleteNode?.caption || "Delete Node"}>
            <button onClick={handleDeleteClick}>
              <MdDelete />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
