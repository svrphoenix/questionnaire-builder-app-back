import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'module', ecmaVersion: 2021 },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 2021,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, import: importPlugin },
    extends: [
      'js/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
    ],
  },
  {
    rules: {
      'import/extensions': ['error', 'always', { js: 'never', jsx: 'never' }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^next$' }],
    },
  },
]);
