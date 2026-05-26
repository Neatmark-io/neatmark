import { includeIgnoreFile } from "@eslint/compat";
import css from "@eslint/css";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { tailwind4 } from "tailwind-csstree";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: { js, ts },
    extends: [js.configs.recommended, ...ts.configs.recommended],
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    plugins: { svelte },
    extends: ["svelte/recommended"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {},
  },
  {
    files: ["**/*.css"],
    language: "css/css",
    plugins: { css },
    extends: ["css/recommended"],
    languageOptions: {
      customSyntax: tailwind4,
      tolerant: true,
    },
    rules: {
      "css/no-invalid-at-rules": "off",
      "css/no-invalid-properties": [
        "error",
        {
          allowUnknownVariables: true,
        },
      ],
    },
  },
);
