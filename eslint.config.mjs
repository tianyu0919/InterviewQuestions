/*
 * @Author: 卢天宇
 * @Date: 2024-04-29 22:53:54
 * @Description: 
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
