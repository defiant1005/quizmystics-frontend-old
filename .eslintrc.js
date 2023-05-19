module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
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
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
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
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",

    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-this-alias": 0,
  },
};
