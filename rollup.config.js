import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import cleaner from "rollup-plugin-cleaner";
import generatePackageJson from "rollup-plugin-generate-package-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import packageJson from "./package.json";

const externalPackages = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];
// Creating regexes of the packages to make sure subpaths of the
// packages are also treated as external
const regexesOfPackages = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(\/.*)?`)
);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
      //   {
      //     dir: "build",
      //     format: "esm", // imperative
      //     chunkFileNames: "[name].js",
      //     entryFileNames: "[name].js",
      //     preserveModules: true, // imperative
      //     preserveModulesRoot: "src", // imperative
      //     sourcemap: false,
      //     exports: "named",
      //   },
    ],
    external: regexesOfPackages,
    plugins: [
      cleaner({
        targets: ["./build", "./dist"],
      }),
      peerDepsExternal(),
      // resolve(),
      commonjs(),
      nodeResolve(),
      typescript({
        tsconfigOverride: {
          exclude: ["cli/**/*", "**/*.stories.tsx", "**/*.test.tsx"],
        },
      }),
      generatePackageJson({
        baseContents: (pkg) => {
          delete pkg.scripts;
          return pkg;
        },
      }),
    ],
  },
];

