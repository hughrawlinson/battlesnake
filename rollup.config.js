import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    file: "out/main.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [typescript(), commonjs(), nodeResolve()],
};
