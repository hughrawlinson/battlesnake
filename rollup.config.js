import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    file: "out/main.ts",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    typescript(),
    nodeResolve()
  ],
};
