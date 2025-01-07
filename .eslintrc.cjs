module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  plugins: ['react-refresh', '@typescript-eslint', "prettier"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"]
      }
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],

    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],

    "quotes": "off",
    "@typescript-eslint/quotes": ["error", "single", { "avoidEscape": true }],

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],

    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",

    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
    "comma-dangle": ["error", "never"],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "max-len": [
      "error",
      {
        "code": 140,
        "ignoreUrls": true,
        "ignorePattern": "^import\\s.+\\sfrom\\s.+;$"
      }
    ],
    "react/destructuring-assignment": ["error", "always", { "ignoreClassFields": true }],
    "spaced-comment": ["error", "always", { "markers": ["/"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-useless-constructor": "off",
    "import/prefer-default-export": "off",
    "no-case-declarations": "off",
    "object-curly-newline": "off",
    "class-methods-use-this": "off",
    "import/order": 2,
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function"
      }
    ],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
