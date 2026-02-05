import { defineConfig } from "tsdown";

const config = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  clean: true,
  minify: true,
  dts: true,
  banner: {
    js: '"use client";',
  },
  checks: {
    pluginTimings: false,
  },
  external: ["react", "react-dom", "antd", "lucide-react"],
});

export default config;
