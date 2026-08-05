window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Treat the process environment as optional, untrusted text. Inject the lookup seam for deterministic tests and keep direct getenv access in a small adapter.",
  "codeExamples": [
    {
      "title": "Read one optional value through an injected lookup",
      "language": "cpp",
      "blurb": "The parser owns the returned string and can be tested without mutating global process state.",
      "code": "\n#include <cctype>\n#include <cstdlib>\n#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nstd::optional<std::string> process_environment_lookup(\n    std::string_view name\n) {\n    const std::string key{name};\n    if (const char* value = std::getenv(key.c_str())) {\n        return std::string{value};\n    }\n    return std::nullopt;\n}\n\ntemplate<class Lookup>\nstd::optional<std::string> deployment_name(Lookup&& lookup) {\n    auto value = std::forward<Lookup>(lookup)(\"ORDERS_DEPLOYMENT\");\n    if (!value || value->empty() || value->size() > 32 ||\n        value->front() == '-' || value->back() == '-') {\n        return std::nullopt;\n    }\n    for (const char raw : *value) {\n        const auto ch = static_cast<unsigned char>(raw);\n        const bool accepted =\n            (ch >= static_cast<unsigned char>('a') &&\n             ch <= static_cast<unsigned char>('z')) ||\n            (ch >= static_cast<unsigned char>('0') &&\n             ch <= static_cast<unsigned char>('9')) ||\n            ch == static_cast<unsigned char>('-');\n        if (!accepted) return std::nullopt;\n    }\n    return value;\n}"
    },
    {
      "title": "Regression: deterministic lookup tests do not alter the process environment",
      "language": "cpp",
      "blurb": "The fake lookup covers absence, malformed text, and valid owned state without setenv or unsetenv.",
      "code": "\n#include <map>\n\nint test_deployment_name() {\n    std::map<std::string, std::string> values;\n    auto lookup = [&](std::string_view key) -> std::optional<std::string> {\n        if (const auto it = values.find(std::string{key});\n            it != values.end()) {\n            return it->second;\n        }\n        return std::nullopt;\n    };\n    if (deployment_name(lookup)) return 1;\n    values[\"ORDERS_DEPLOYMENT\"] = \"prod/east\";\n    if (deployment_name(lookup)) return 2;\n    values[\"ORDERS_DEPLOYMENT\"] = \"prod-east\";\n    const auto accepted = deployment_name(lookup);\n    if (!accepted || *accepted != \"prod-east\") return 3;\n    return 0;\n}"
    }
  ]
};
