module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false },
    ],

    "vue/v-on-event-hyphenation": [
      "error",
      "never",
      {
        autofix: true,
        ignore: [],
      },
    ],

    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],

    "vue/block-tag-newline": [
      "error",
      { singleline: "always", multiline: "always", maxEmptyLines: 1 },
    ],
    "vue/singleline-html-element-content-newline": "off",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    "vue/component-options-name-casing": ["error", "PascalCase"],
    "vue/custom-event-name-casing": [
      "error",
      "camelCase",
      {
        ignores: [],
      },
    ],
    "vue/define-emits-declaration": ["error", "runtime"],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineProps", "defineEmits"],
      },
    ],
    "vue/html-button-has-type": [
      "error",
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],
    "vue/new-line-between-multi-line-property": [
      "error",
      {
        minLineOfMultilineProperty: 2,
      },
    ],
    "vue/next-tick-style": ["error", "callback"],
    "vue/no-deprecated-model-definition": [
      "error",
      {
        allowVue3Compat: true,
      },
    ],
    "vue/no-unused-refs": ["error"],
    "vue/no-use-v-else-with-v-for": ["error"],
    "vue/no-useless-v-bind": [
      "error",
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false,
      },
    ],
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/padding-line-between-tags": [
      "error",
      [{ blankLine: "consistent", prev: "*", next: "*" }],
    ],
    "vue/padding-lines-in-component-definition": [
      "error",
      {
        betweenOptions: "always",

        withinOption: "always",

        groupSingleLineProperties: true,
      },
    ],
    "vue/prefer-define-options": ["error"],
    "vue/prefer-separate-static-class": ["error"],
    "vue/prefer-true-attribute-shorthand": ["error", "always"],
    "vue/require-direct-export": [
      "error",
      {
        disallowFunctionalComponentFunction: false,
      },
    ],
    "vue/require-typed-ref": ["error"],
    "vue/v-for-delimiter-style": ["error", "in"],
    "vue/valid-define-options": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
