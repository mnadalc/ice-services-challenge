/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  jsxSingleQuote: false,
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  exclude: ["dist", "node_modules", "pnpm-lock.yaml"],
};

export default config;
