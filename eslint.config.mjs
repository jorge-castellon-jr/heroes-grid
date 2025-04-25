import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript',

    // 'eslint:recommended',
    // 'plugin:node/recommended',
    'prettier'
  ),
  {
    // plugins: [
    //   // "node",
    //   "prettier"
    // ],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],

      'prefer-promise-reject-errors': 'off',

      quotes: ['warn', 'single', { avoidEscape: true }],

      // this rule, if on, would require explicit return type on the `render` function
      '@typescript-eslint/explicit-function-return-type': 'off',

      // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
      '@typescript-eslint/no-var-requires': 'off',

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'object-curly-spacing': ['error', 'always'],
    },
  },
]

export default eslintConfig
// "extends": [
// ],
// "plugins": [
//   "node",
//   "prettier"
// ],
// "rules": {
//   "prettier/prettier": "error",
//   "block-scoped-var": "error",
//   "eqeqeq": "error",
//   "no-var": "error",
//   "prefer-const": "error",
//   "eol-last": "error",
//   "prefer-arrow-callback": "error",
//   "no-trailing-spaces": "error",
//   "quotes": ["warn", "single", { "avoidEscape": true }],
//   "no-restricted-properties": [
//     "error",
//     {
//       "object": "describe",
//       "property": "only"
//     },
//     {
//       "object": "it",
//       "property": "only"
//     }
//   ]
// },
// "overrides": [
//   {
//     "files": ["**/*.ts", "**/*.tsx"],
//     "parser": "@typescript-eslint/parser",
//     "extends": [
//       "plugin:@typescript-eslint/recommended"
//     ],
//     "rules": {
//       "@typescript-eslint/no-non-null-assertion": "off",
//       "@typescript-eslint/no-use-before-define": "off",
//       "@typescript-eslint/no-warning-comments": "off",
//       "@typescript-eslint/no-empty-function": "off",
//       "@typescript-eslint/no-var-requires": "off",
//       "@typescript-eslint/explicit-function-return-type": "off",
//       "@typescript-eslint/explicit-module-boundary-types": "off",
//       "@typescript-eslint/ban-types": "off",
//       "@typescript-eslint/camelcase": "off",
//       "node/no-missing-import": "off",
//       "node/no-empty-function": "off",
//       "node/no-unsupported-features/es-syntax": "off",
//       "node/no-missing-require": "off",
//       "node/shebang": "off",
//       "no-dupe-class-members": "off",
//       "require-atomic-updates": "off"
//     },
//     "parserOptions": {
//       "ecmaVersion": 2018,
//       "sourceType": "module"
//     }
//   }
// ]
