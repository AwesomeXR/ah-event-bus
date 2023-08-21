module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'default-case': 'error',
    'no-else-return': 'error',
    'no-return-await': 'error',
    'no-shadow': 'error',
  },
  plugins: ['prettier'],
}
