
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    '../../node_modules/gts/',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',
  ],

  globals: {
    process: 'readonly',
    chrome: 'readonly',
  },

  // add your custom rules here
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'warn',
      { version: '>=16', ignores: ['modules'] },
    ],

    'node/no-missing-import': 'off',

    'prefer-promise-reject-errors': 'off',

    quotes: ['warn', 'single', { avoidEscape: true }],

    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-spacing': ['error', 'always'],
  },
};
