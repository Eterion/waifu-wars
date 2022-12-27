/* eslint-disable prettier/prettier */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  ignorePatterns: ['src/composables/useGraphQL.ts'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['@typescript-eslint', 'tsdoc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: 1,
    yoda: 1,
    'guard-for-in': 1,
    'no-inner-declarations': 0,
    'no-template-curly-in-string': 1,
    'no-undef': 0,
    'no-useless-concat': 1,
    'no-useless-rename': 1,
    'object-shorthand': 1,
    'prefer-rest-params': 1,
    'prefer-template': 1,
    '@typescript-eslint/array-type': [1, { default: 'array-simple' }],
    '@typescript-eslint/member-ordering': 1,
    '@typescript-eslint/naming-convention': [1, { selector: 'typeParameter', format: ['PascalCase'], prefix: ['T'] }],
    '@typescript-eslint/no-explicit-any': 0,
    'tsdoc/syntax': 1,
    'prettier/prettier': 1,
    'vue/component-tags-order': [1, { order: ['script:not([setup])', 'script[setup]', 'template', 'style'] }],
    'vue/define-macros-order': 1,
    'vue/eqeqeq': 1,
    'vue/html-button-has-type': 1,
    'vue/html-self-closing': [1, { html: { void: 'any' } }],
    'vue/no-boolean-default': 1,
    'vue/no-duplicate-attr-inheritance': 1,
    'vue/no-unused-components': [1, { ignoreWhenBindingPresent: true }],
    'vue/no-v-html': 0,
    'vue/space-infix-ops': 1,
    'vue/v-on-event-hyphenation': [1, 'always', { autofix: true }],
  },
  overrides: [
    {
      files: '**/*.vue',
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
  ],
};
