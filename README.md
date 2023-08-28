<p align="center" style="border-bottom: none">
  <picture >
    <source media="(prefers-color-scheme: dark)" srcset="./docs/editable-antd-tree-logo-light.png">
    <img width="500" alt="editable-antd-tree-logo-light" src="./docs/editable-antd-tree-logo-dark.png">
  </picture>
</p>
<p align="center">This is an editable tree based on antd components.</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-blue" alt="node version" />
  <img src="https://img.shields.io/badge/pnpm-^7.0.0-blue?logo=pnpm" alt="pnpm version" />
  <img src="https://img.shields.io/badge/react->%3D16.9.0-lighgreen?logo=react" alt="react version" />
  <img src="https://img.shields.io/badge/antd-^5.0.0-lighgreen" alt="antd version" />
</p>

<br/>

### 📖 Preview

![preview](./docs/editable-antd-tree-preview.png)

## 📦 Install

```bash
$ npm editable-antd-tree
```

_The package can be found [here](https://www.npmjs.com/package/editable-antd-tree)._

## 🔨 Usage

Below there is a demonstration of the input data.

```js
const tree = [
  {
    key: "1",
    title: "Technology",
    isLeaf: false,
    children: [
      {
        key: "2",
        parent: "1",
        title: "Phones",
        isLeaf: false,
        children: [
          // ...
        ],
      },
      {
        key: "3",
        parent: "1",
        title: "Laptops",
        isLeaf: true,
      },
    ],
    // ...
  },
  // ...
];
```

A simple example of this package can be seen below.

```js
import { EditableAntdTree } from "editable-antd-tree";

import "editable-antd-tree/dist/esm/output.css"; // load style

const initTree = []; // 👀 example above

const App = () => (
  <>
    <EditableAntdTree treeData={initTree} />
  </>
);
```

### Typescipt

By downloading this package, there is a direct compatability with `typescript`.

## 🔀️ Properties

### Tree

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>treeData</code></td>
      <td>Initial tree data. See section below for all fields of TreeData.</td>
      <td><code>EditableTreeNode[]</code></td>
      <td align="center">Yes</td>
    </tr>
    <tr>
      <td><code>onTreeChange</code></td>
      <td>Executes uppon any tree data change.</td>
      <td><code>Function</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>switcherIcon</code></td>
      <td>Controls the switcher icon, used to expand or collapse parent nodes.</td>
      <td><code>React.ReactNode</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>size</code></td>
      <td>Controls the size of the tree.</td>
      <td><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>loadData</code></td>
      <td>Function triggered when a non-leaf TreeNode lacks children. Loads data asynchronously and replaces TreeNode's children.</td>
      <td><code>Function</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>createRootLeaf</code></td>
      <td>Contains properties explained in the sections below.</td>
      <td><code>Object</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>createRootParent</code></td>
      <td>Contains properties explained in the sections below.</td>
      <td><code>Object</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>deleteNode</code></td>
      <td>Contains properties explained in the sections below.</td>
      <td><code>Object</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>updateNode</code></td>
      <td>Contains properties explained in the sections below.</td>
      <td><code>Object</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>createLeaf</code></td>
      <td>Contains properties explained in the sections below.</td>
      <td><code>Object</code></td>
      <td align="center">No</td>
    </tr>
    <tr>
      <td><code>createParent</code></td>
      <td>Contains properties explained in the sections below.</td>
      <td><code>Object</code></td>
      <td align="center">No</td>
    </tr>
  </tbody>
</table>

### Create Root Leaf

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>caption</code></td>
      <td>This property shows what should be displayed when a user hovers over the action.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>disable</code></td>
      <td>This property indicates if the action should be disabled.</td>
      <td style="text-align: center"><code>boolean</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>event</code></td>
      <td>This property is a Function that runs after the action has been pressed.</td>
      <td style="text-align: center"><code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
  </tbody>
</table>

### Create Root Parent

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>caption</code></td>
      <td>This property shows what should be displayed when a user hovers over the action.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>disable</code></td>
      <td>This property indicates if the action should be disabled.</td>
      <td style="text-align: center"><code>boolean</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>event</code></td>
      <td>This property is a Function that runs after the action has been pressed.</td>
      <td style="text-align: center"><code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
  </tbody>
</table>

### Delete Node

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>caption</code></td>
      <td>This property shows what should be displayed when a user hovers over the action.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>disable</code></td>
      <td>This property indicates if the action should be disabled.</td>
      <td style="text-align: center"><code>boolean</code> | <code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>event</code></td>
      <td>This property is a Function that runs after the action has been pressed.</td>
      <td style="text-align: center"><code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
  </tbody>
</table>

### Update Node

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>caption</code></td>
      <td>This property shows what should be displayed when a user hovers over the action.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>disable</code></td>
      <td>This property indicates if the action should be disabled.</td>
      <td style="text-align: center"><code>boolean</code> | <code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>event</code></td>
      <td>This property is a Function that runs after the action has been pressed.</td>
      <td style="text-align: center"><code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
  </tbody>
</table>

### Create Leaf Node

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>caption</code></td>
      <td>This property shows what should be displayed when a user hovers over the action.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>disable</code></td>
      <td>This property indicates if the action should be disabled.</td>
      <td style="text-align: center"><code>boolean</code> | <code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>event</code></td>
      <td>This property is a Function that runs after the action has been pressed.</td>
      <td style="text-align: center"><code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
  </tbody>
</table>

### Create Parent Node

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>caption</code></td>
      <td>This property shows what should be displayed when a user hovers over the action.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>disable</code></td>
      <td>This property indicates if the action should be disabled.</td>
      <td style="text-align: center"><code>boolean</code> | <code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
    <tr>
      <td><code>event</code></td>
      <td>This property is a Function that runs after the action has been pressed.</td>
      <td style="text-align: center"><code>Function</code></td>
      <td style="text-align: center">No</td>
    </tr>
  </tbody>
</table>

> \+ All [Tree](https://ant.design/components/tree#tree-props) properties of antd tree component.

### Tree Data

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th style="text-align: center">Type</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>This field is used as a unique identifier.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">Yes</td>
    </tr> 
    <tr>
      <td><code>title</code></td>
      <td>This field is displayed in the tree.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr> 
    <tr>
      <td><code>parent</code></td>
      <td>This field points to the parent key.</td>
      <td style="text-align: center"><code>string</code></td>
      <td style="text-align: center">No</td>
    </tr> 
    <tr>
      <td><code>children</code></td>
      <td>This field contains more nested tree nodes.</td>
      <td style="text-align: center"><code>EditableTreeNode[]</code></td>
      <td style="text-align: center">No</td>
    </tr> 
  </tbody>
</table>

> \+ All [TreeNode](https://ant.design/components/tree#tree-props) properties of antd tree component.

## ✨ Acknowledgements

Special acknowledgements to the following packages:

- https://www.npmjs.com/package/antd
- https://www.npmjs.com/package/editable-tree-antd

## 🎙 Conclusion

After experimenting with various npm packages, none of them quite met my specific requirements. However, drawing inspiration from the packages mentioned earlier, I took it upon myself to develop a solution tailored to my needs, resulting in the creation of the editable-antd-tree package.
