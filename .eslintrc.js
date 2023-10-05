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
    "no-unused-vars": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "unused-imports/no-unused-imports": "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          ["UNIQUE", "SLOT"],
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
        alphabetical: false,
      },
    ],
    "vue/attribute-hyphenation": [
      "error",
      "always",
      {
        ignore: [],
      },
    ],
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [],
      },
    ],
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/require-default-prop": "off",
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "ignore",
        multiline: "below",
      },
    ],
    "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
    "vue/no-multi-spaces": [
      "error",
      {
        ignoreProperties: false,
      },
    ],
    "vue/v-bind-style": ["error", "shorthand"],
    "vue/v-on-style": ["error", "shorthand"],
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          "emits",
          ["props", "propsData"],
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "methods",
          "LIFECYCLE_HOOKS",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/v-on-event-hyphenation": [
      "error",
      "never",
      {
        autofix: true,
        ignore: [],
      },
    ],
    "vue/require-explicit-emits": [
      "error",
      {
        allowProps: false,
      },
    ],
    "vue/block-tag-newline": [
      "error",
      { singleline: "always", multiline: "always", maxEmptyLines: 1 },
    ],
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    "vue/custom-event-name-casing": [
      "error",
      "camelCase",
      {
        ignores: [],
      },
    ],
    "vue/component-options-name-casing": ["error", "PascalCase"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-this-alias": 0,
  },
};
