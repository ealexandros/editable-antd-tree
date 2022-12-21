import { EditableAntdTreeNode } from "../src/EditableAntdTree";
import { deleteTreeNode, loadTreeChildren } from "../src/utils";

let tree: EditableAntdTreeNode[] = [];

describe("DeleteTreeNode", () => {
  beforeEach(() => {
    tree = [
      {
        title: "parent 1",
        key: "0-0",
        children: [
          {
            title: "parent 1-0",
            key: "0-0-0",
            parent: "0-0",
            children: [
              {
                title: "leaf",
                key: "0-0-0-0",
                parent: "0-0-0",
              },
            ],
          },
        ],
      },
    ];
  });

  it("delete nested node", () => {
    deleteTreeNode(tree, "0-0-0");

    const expected: EditableAntdTreeNode[] = [
      {
        title: "parent 1",
        key: "0-0",
        children: [],
      },
    ];

    expect(tree).toEqual(expected);
  });

  it("delete root node", () => {
    deleteTreeNode(tree, "0-0");

    const expected: EditableAntdTreeNode[] = [];

    expect(tree).toEqual(expected);
  });

  it("delete non-existing tree node", () => {
    const expected = [...tree];

    deleteTreeNode(tree, "test");

    expect(tree).toEqual(expected);
  });
});

describe("LoadTreeChildren", () => {
  beforeEach(() => {
    tree = [
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
  });

  it("load nodes to a parent with empty children", () => {
    const actual = loadTreeChildren(tree, "0-0-0", [
      {
        title: "leaf",
        key: "0-0-0-0",
        parent: "0-0-0",
      },
    ]);

    const expected: EditableAntdTreeNode[] = [
      {
        title: "parent 1",
        key: "0-0",
        children: [
          {
            title: "parent 1-0",
            key: "0-0-0",
            parent: "0-0",
            children: [
              {
                title: "leaf",
                key: "0-0-0-0",
                parent: "0-0-0",
              },
            ],
          },
        ],
      },
    ];

    expect(actual).toEqual(expected);
  });

  it("load nodes to a parent with existing children", () => {
    const actual = loadTreeChildren(tree, "0-0", [
      {
        title: "leaf",
        key: "0-0-0-0",
        parent: "0-0",
      },
    ]);

    const expected: EditableAntdTreeNode[] = [
      {
        title: "parent 1",
        key: "0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            parent: "0-0",
          },
        ],
      },
    ];

    expect(actual).toEqual(expected);
  });

  it("load nodes to a parent with existing children", () => {
    const actual = loadTreeChildren(
      [
        {
          title: "parent 1",
          key: "0-0",
        },
      ],
      "0-0",
      [
        {
          title: "leaf",
          key: "0-0-0-0",
          parent: "0-0",
        },
      ]
    );

    const expected: EditableAntdTreeNode[] = [
      {
        title: "parent 1",
        key: "0-0",
      },
    ];

    expect(actual).toEqual(expected);
  });
});
