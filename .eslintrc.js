module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "prettier/prettier": 2,
    "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        }
      ],
    // "react/jsx-filename-extension": 0,
    "import/prefer-default-export": 0,
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    "eol-last": 0,
    "linebreak-style": 0,
    "no-console": "off",
    quotes: ["error", "double"],
    "class-methods-use-this": 0,
    indent: ["error", 4, {ignoredNodes: ["SwitchCase"]}],
    "object-curly-spacing": ["error", "never"],
    "keyword-spacing": [
        "error",
        {
            overrides: {
                if: {after: true},
                for: {after: false},
                while: {after: false},
                static: {after: false},
                as: {after: false},
            },
        },
    ],
    "template-curly-spacing": ["error", "never"],
    "import/no-extraneous-dependencies": 0,
    "no-unused-vars": 1,
    camelcase: 0,
    "no-useless-return": 0,
  },
};
