import { EditableTreeTitle } from "@/components/tree-title";
import { cn } from "@/utilities/cn";
import type { TreeProps } from "antd";
import { Tree } from "antd";
import { TreeFooter } from "./components/tree-footer";
import type {
  EditableAntdTreeNode,
  EditableTreeClassNames,
  EditableTreeTitleActions,
  IconConfig,
  NodeAction,
  TreeSize,
} from "./types";
import { sizeVariants } from "./types";
import { useEditableAntdTree } from "./use-editable-antd-tree";

export type EditableAntdTreeProps = {
  treeData: EditableAntdTreeNode[];
  onTreeChange?: (tree: EditableAntdTreeNode[]) => void;
  size?: TreeSize;
  createRootLeaf?: NodeAction;
  createRootParent?: NodeAction;
  loadData?: (node: EditableAntdTreeNode) => Promise<EditableAntdTreeNode[] | void>;
  icons?: Partial<IconConfig>;
  showActionsOnHover?: boolean;
  hideRootControls?: boolean;
  classNames?: EditableTreeClassNames & {
    root?: string;
    tree?: string;
    footer?: string;
    rootInput?: string;
  };
} & Omit<TreeProps, "treeData" | "loadData" | "titleRender"> &
  EditableTreeTitleActions;

export const EditableAntdTree = (props: EditableAntdTreeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { treeData: _, ...rest } = props;

  const {
    size = "sm",
    deleteNode,
    updateNode,
    createLeaf,
    createParent,
    createRootLeaf,
    createRootParent,
    className,
    showActionsOnHover = true,
    hideRootControls = false,
    classNames,
    ...restProps
  } = rest;

  const {
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
  } = useEditableAntdTree(props);

  const titleProps = {
    expandKey,
    treeData,
    updateTreeData: updateTree,
    deleteNode,
    updateNode,
    createLeaf,
    createParent,
    icons,
    showActionsOnHover,
    classNames,
  };

  return (
    <div
      className={cn(
        "flex flex-col space-y-3",
        sizeVariants[size],
        classNames?.root,
        className,
      )}>
      <Tree
        treeData={treeData}
        loadData={handleLoadData}
        titleRender={node => <EditableTreeTitle node={node} {...titleProps} />}
        onExpand={setExpandedKeys}
        expandedKeys={expandedKeys}
        className={cn("bg-transparent", sizeVariants[size], classNames?.tree)}
        showLine={restProps.showLine ?? { showLeafIcon: false }}
        {...restProps}
      />

      {!hideRootControls && (
        <TreeFooter
          rootNodeTitle={rootNodeTitle}
          setRootNodeTitle={setRootNodeTitle}
          handleCreateRootNode={handleCreateRootNode}
          createRootLeaf={createRootLeaf}
          createRootParent={createRootParent}
          icons={icons}
          classNames={classNames}
        />
      )}
    </div>
  );
};
