/**
 * eslint配置
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:vue/vue3-recommend", "plugin:@typescript-eslint/recommended"],
  rules: {
    "vue/multi-word-component-names": "off",
    semi: [2],
  },
};
