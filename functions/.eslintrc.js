// .eslintrc.js

module.exports = {
  root: true, // ensure ESLint treats this as root
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Your custom rules
    "no-unused-vars": "warn",
  },
};
