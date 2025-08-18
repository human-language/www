import globals from 'globals'
import path from 'node:path'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import astroParser from 'astro-eslint-parser'
import astroPlugin from 'eslint-plugin-astro'

import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      '.vercel',
      '.github',
      'scripts',
      'test',
      'eslint.config.mjs',
      'rollup.config.ts',
      '.astro/content.d.ts',
    ],
  },

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        project: null,
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },

  {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      'components/**/*.ts',
      'components/**/*.tsx',
      'pages/**/*.ts',
      'pages/**/*.tsx',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        process: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      semi: [2, 'never'],
      'one-var': 'off',
      'return-await': 'off',
      indent: 'off',
      'no-multi-spaces': 'off',
      'operator-linebreak': 'off',
      'array-bracket-spacing': ['error', 'always'],
      'key-spacing': [
        'error',
        {
          multiLine: {
            beforeColon: true,
            afterColon: true,
          },
          align: {
            beforeColon: true,
            afterColon: true,
          },
        },
      ],

      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/return-await': [1, 'in-try-catch'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/key-spacing': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/require-array-sort-compare': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/no-invalid-void-type': [
        'error',
        {
          allowInGenericTypeArguments: true,
        },
      ],
    },
  },
]
