window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Operational policy records which approved source and artifact purpose a release uses.",
  "codeExamples": [
    {
      "title": "Validate an RNG policy declaration",
      "language": "cpp",
      "blurb": "The policy accepts known platform sources and security purposes while rejecting fallback language.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nstruct RandomPolicy {\n    std::string source;\n    std::string purpose;\n    bool failure_is_fatal;\n};\n\nstd::optional<RandomPolicy> validate_random_policy(\n    std::string_view source,\n    std::string_view purpose,\n    bool failure_is_fatal\n) {\n    const bool approved_source = source == \"windows-bcrypt\" || source == \"linux-getrandom\";\n    const bool approved_purpose = purpose == \"session-token\" || purpose == \"encryption-key\" ||\n                                  purpose == \"nonce\" || purpose == \"password-salt\";\n    if (!approved_source || !approved_purpose || !failure_is_fatal) return std::nullopt;\n    return RandomPolicy{std::string(source), std::string(purpose), true};\n}\n"
    },
    {
      "title": "Reject unapproved sources and nonfatal entropy failure",
      "language": "cpp",
      "blurb": "The regression proves policy evidence cannot bless a standard-library PRNG or weak fallback.",
      "code": "int main() {\n    if (!validate_random_policy(\"windows-bcrypt\", \"session-token\", true)) return 1;\n    if (validate_random_policy(\"mt19937\", \"session-token\", true)) return 2;\n    if (validate_random_policy(\"linux-getrandom\", \"session-token\", false)) return 3;\n    if (validate_random_policy(\"linux-getrandom\", \"simulation\", true)) return 4;\n    return 0;\n}\n"
    }
  ]
};
