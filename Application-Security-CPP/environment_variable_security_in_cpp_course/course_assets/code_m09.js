window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Record approved deployment identifiers and policy outcomes without allowing log-control characters or secret values into the audit schema.",
  "codeExamples": [
    {
      "title": "Emit an audit event with a validated deployment label",
      "language": "cpp",
      "blurb": "The deployment grammar is bounded ASCII lowercase, digits, and hyphens; newline and other control injection cannot enter the event.",
      "code": "\n#include <optional>\n#include <string>\n#include <utility>\n\nbool valid_deployment_label(const std::string& value) {\n    if (value.empty() || value.size() > 32 ||\n        value.front() == '-' || value.back() == '-') {\n        return false;\n    }\n    for (const char raw : value) {\n        const auto ch = static_cast<unsigned char>(raw);\n        const bool accepted =\n            (ch >= static_cast<unsigned char>('a') &&\n             ch <= static_cast<unsigned char>('z')) ||\n            (ch >= static_cast<unsigned char>('0') &&\n             ch <= static_cast<unsigned char>('9')) ||\n            ch == static_cast<unsigned char>('-');\n        if (!accepted) return false;\n    }\n    return true;\n}\n\nstruct ConfigurationAudit {\n    std::string deployment;\n    unsigned policy_version;\n    bool accepted;\n};\n\nstd::optional<ConfigurationAudit> configuration_audit(\n    std::string deployment,\n    unsigned policy_version,\n    bool accepted\n) {\n    if (!valid_deployment_label(deployment) ||\n        policy_version == 0 || policy_version > 1000) {\n        return std::nullopt;\n    }\n    return ConfigurationAudit{\n        std::move(deployment), policy_version, accepted\n    };\n}"
    },
    {
      "title": "Regression: audit identifiers cannot inject log controls",
      "language": "cpp",
      "blurb": "The closed event schema and validated label preserve the same invariant at configuration and logging boundaries.",
      "code": "\nint test_configuration_audit() {\n    const auto event = configuration_audit(\"prod-east\", 17, false);\n    if (!event || event->deployment != \"prod-east\") return 1;\n    if (event->policy_version != 17 || event->accepted) return 2;\n    if (configuration_audit(\"prod\\nforged\", 17, true)) return 3;\n    if (configuration_audit(\"-prod\", 17, true)) return 4;\n    return 0;\n}"
    }
  ]
};
