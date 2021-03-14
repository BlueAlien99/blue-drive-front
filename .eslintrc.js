module.exports = {
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'wesbos',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
  ignorePatterns: ['.eslintrc.js', 'gatsby-config.js']
};
