module.exports = {
  extends: ["git-commit-emoji"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "🎉 init",
        "✨ feat",
        "🐛 bugfix",
        "📝 docs",
        "♻️ refactor",
      ],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-case": [2, "always", "lower-case"],
    "body-max-line-length": [0],
    "header-max-length": [2, "always", 100],
  },
};
