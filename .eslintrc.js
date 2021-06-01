const errorType = process.env.NODE_ENV === 'production' ? 2 : 1;
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    requireConfigFile: false, // 是否需要 babel 配置文件
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    GLOBAL_API: true,
    Promise: false,
    process: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue'],
  rules: {
    'space-before-blocks': [errorType, 'always'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    curly: [errorType, 'all'],
    semi: [errorType, 'always'],
    'block-scoped-var': 'error',
    'consistent-return': 0,
    'no-extra-semi': errorType,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/attributes-order': 0,
    'no-useless-escape': 0,
    'no-unused-vars': errorType,
    'vue/no-v-for-template-key': 0,
    'vue/no-multiple-template-root': 0,
    'vue/no-v-model-argument': 0,
  },
};
