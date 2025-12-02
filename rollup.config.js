import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";
import { resolve } from "path";

const name = "dist/silentium_validation";

const bundle = (config) => {
  const isDts = config.plugins && config.plugins.some((p) => p.name === "dts");
  return {
    ...config,
    input: "src/index.ts",
    external: isDts
      ? () => false
      : (id) => !/^[./]/.test(id) && !id.startsWith("@/"),
    plugins: [
      alias({
        entries: [{ find: /^@\/(.*)$/, replacement: resolve("src/$1.ts") }],
      }),
      ...(config.plugins || []),
    ],
  };
};

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${name}.cjs`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `${name}.js`,
        format: "es",
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true,
      },
      {
        file: `${name}.min.mjs`,
        format: "es",
        plugins: [terser()],
        sourcemap: true,
      },
      {
        file: `${name}.min.js`,
        format: "iife",
        name: "silentium_validation",
        plugins: [terser()],
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
