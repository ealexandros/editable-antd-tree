import type { EditableAntdTreeNode } from "@/types";
import { deleteTreeNode } from "@/utilities/tree-operations";
import { beforeEach, describe, expect, it } from "bun:test";
import { nestedTree } from "../../helpers";

describe("deleteTreeNode", () => {
  let tree: EditableAntdTreeNode[];

  beforeEach(() => {
    tree = nestedTree();
  });

  it("removes a nested node", () => {
    deleteTreeNode({ tree, targetKey: "0-0-0" });

    expect(tree).toEqual([
      {
        title: "parent 1",
        key: "0-0",
        children: [],
      },
    ]);
  });

  it("removes a root node", () => {
    deleteTreeNode({ tree, targetKey: "0-0" });
    expect(tree).toEqual([]);
  });

  it("does nothing when node does not exist", () => {
    const snapshot = structuredClone(tree);

    deleteTreeNode({ tree, targetKey: "missing" });
    expect(tree).toEqual(snapshot);
  });
});
