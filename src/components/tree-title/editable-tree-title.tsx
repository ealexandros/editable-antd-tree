import type {
  EditableAntdTreeNode,
  EditableTreeClassNames,
  IconConfig,
  NodeAction,
  ReactSetState,
} from "@/types";
import { cn } from "@/utilities/cn";
import { NodeActions } from "./node-actions";
import { NodeEdit } from "./node-edit";
import { useEditableTreeTitle } from "./use-editable-tree-title";

export type EditableTreeTitleProps = {
  treeData: EditableAntdTreeNode[];
  updateTreeData: ReactSetState<EditableAntdTreeNode[]>;
  expandKey: (key: React.Key) => void;
  node: EditableAntdTreeNode;
  deleteNode?: NodeAction;
  updateNode?: NodeAction;
  createLeaf?: NodeAction;
  createParent?: NodeAction;
  icons: IconConfig;
  showActionsOnHover?: boolean;
  classNames?: EditableTreeClassNames;
};

export const EditableTreeTitle = (props: EditableTreeTitleProps) => {
  const {
    node,
    icons,
    showActionsOnHover = true,
    classNames,
    createLeaf,
    createParent,
    updateNode,
    deleteNode,
  } = props;

  const {
    inputRef,
    inputValue,
    setInputValue,
    editing,
    isHovered,
    setIsHovered,
    isDisabled,
    handleDelete,
    toggleEdit,
    handleUpdate,
    handleCreateNode,
  } = useEditableTreeTitle(props);

  const showActions = editing ? false : !showActionsOnHover || isHovered;

  return (
    <div
      className={cn("group flex items-center justify-between", classNames?.nodeTitle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {editing ? (
        <NodeEdit
          inputRef={inputRef}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleUpdate={handleUpdate}
          toggleEdit={toggleEdit}
          icons={icons}
          classNames={classNames}
        />
      ) : (
        <span className="flex-1 truncate">{node.title}</span>
      )}

      <NodeActions
        node={node}
        icons={icons}
        classNames={classNames}
        showActions={showActions}
        isDisabled={isDisabled}
        handleCreateNode={handleCreateNode}
        toggleEdit={toggleEdit}
        handleDelete={handleDelete}
        createParent={createParent}
        createLeaf={createLeaf}
        updateNode={updateNode}
        deleteNode={deleteNode}
      />
    </div>
  );
};
