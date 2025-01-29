import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**./*.js"],
    languageOptions: { globals: globals.browser },
    rules: {
      "indent": [
          "error",
          2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
          "error",
          "always"
        ]
    }
  },
  pluginJs.configs.recommended
];