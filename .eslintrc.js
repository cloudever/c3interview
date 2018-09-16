const OFF = 0
const MAYBE = 1
const ON = 2

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'prettier'
  ],
  plugins: [
    'graphql',
    'prettier'
  ],
  parser: "babel-eslint",
  rules: {
    "react/prefer-stateless-function": OFF,
    "import/prefer-default-export": MAYBE,
    "import/no-extraneous-dependencies": OFF,
    "prettier/prettier": ON
  },
  env: {
    browser: true,
    node: true
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./src', 'node_modules'],
      },
      alias: {
        map: [
          ['@app', './src']
        ],
        extensions: ['.js', '.jsx', '.json']
      }
    }
  }
};