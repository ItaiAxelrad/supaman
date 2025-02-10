import { type Config } from "prettier";

const config: Config = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: "es5",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  ignore: ["*.d.ts", ".yarn", ".next", "dist", , "node_modules"],
};

export default config;
