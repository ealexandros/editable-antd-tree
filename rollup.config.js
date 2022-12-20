import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" assert { type: "json" };

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    input: "./src/index.tsx",
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      cleaner({
        targets: ["./dist/"],
      }),
      resolve(),
      commonjs(),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        inject: false,
        extract: "output.css",
      }),
    ],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: !isProd,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: !isProd,
      },
    ],
  },
  {
    input: "./dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];