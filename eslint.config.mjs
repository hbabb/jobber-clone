import antfu from "@antfu/eslint-config";

// TODO: add tailwindcss plugin

export default antfu({
  // Your custom configs here
  type: "app",
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
    objectCurlySpacing: "always",
    arrowParens: "always",
    linebreaks: "unix",
  },
  ignores: ["README.md", ".pnpm-store/**", "node_modules/**", "**/migrations/*", "docs/**"],
}, {
  rules: {
    "vue/max-attributes-per-line": ["error", {
      singleline: {
        max: 2,
      },
      multiline: {
        max: 1,
      },
    }],
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
    "unicorn/filename-case": ["error", {
      cases: {
        camelCase: true,
        kebabCase: true,
      },
      ignore: ["README.md"],
    }],
  },
});
