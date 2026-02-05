/* eslint-disable no-console */

import { $ } from "bun";

await $`bun run build:js`;
await $`bun run build:css`;

console.log("Build Complete! 🎉");
