module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2020": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
    "react-app",
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  root: true
};