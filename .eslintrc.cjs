module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022, // Use the latest ecmascript standard
    sourceType: "module", // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
    {
      files: ["./src/core/dtos/*.dto.ts"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: ["interface", "enum", "typeAlias"],
            format: ["PascalCase"],
            suffix: ["Dto"],
          },
          {
            selector: ["classProperty", "enumMember"],
            format: ["PascalCase"],
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // Make this the last element so prettier config overrides other formatting rules,
  ],
  rules: {
    "prettier/prettier": ["error", { usePrettierrc: true }], // Use our .prettierrc file as source,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "func-names": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will", "_"],
      },
      {
        selector: ["function", "typeProperty"],
        format: ["camelCase"],
      },
      {
        selector: ["interface", "enum", "typeAlias", "enumMember"],
        format: ["PascalCase"],
      },
    ],
  },
};
