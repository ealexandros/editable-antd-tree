import type { EditableAntdTreeNode } from "@/types";

export const leaf = (overrides = {}) => ({
  title: "leaf",
  key: "0-0-0-0",
  parent: "0-0-0",
  ...overrides,
});

export const nestedTree = (): EditableAntdTreeNode[] => [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        parent: "0-0",
        children: [leaf()],
      },
    ],
  },
];

export const emptyChildTree = (): EditableAntdTreeNode[] => [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        parent: "0-0",
        children: [],
      },
    ],
  },
];
