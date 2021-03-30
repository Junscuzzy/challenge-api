module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn'
  }
}
