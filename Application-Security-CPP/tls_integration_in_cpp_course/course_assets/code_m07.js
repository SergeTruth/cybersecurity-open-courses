window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "Configuration accepts one bounded canonical vault reference and returns it by value so temporary parse results cannot expose dangling state.",
  "codeExamples": [
    {
      "title": "Carry bounded secret references as owned values",
      "language": "cpp",
      "blurb": "Configuration accepts one bounded canonical vault reference and returns it by value so temporary parse results cannot expose dangling state.",
      "code": "#include <utility>\n#include <optional>\n#include <string>\n#include <string_view>\n\nclass SecretReference {\npublic:\n    static std::optional<SecretReference> parse(std::string_view value) {\n        constexpr std::string_view prefix = \"vault://orders/\";\n        if (value.size() > 96 || !value.starts_with(prefix) ||\n            value.size() <= prefix.size() || value.back() == '/') return std::nullopt;\n        const auto tail = value.substr(prefix.size());\n        if (tail.find('/') != std::string_view::npos || tail == \".\" || tail == \"..\") return std::nullopt;\n        for (char ch : tail) {\n            if (!((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || ch == '-')) return std::nullopt;\n        }\n        return SecretReference{std::string{value}};\n    }\n\n    std::string value() const { return value_; }\n\nprivate:\n    explicit SecretReference(std::string value) : value_(std::move(value)) {}\n    std::string value_;\n};\n\nint main() {\n    if (!SecretReference::parse(\"vault://orders/client-key\")) return 1;\n    if (SecretReference::parse(\"vault://orders/../key\")) return 2;\n    if (SecretReference::parse(\"embedded-secret\")) return 3;\n    const std::string owned = SecretReference::parse(\"vault://orders/temporary-key\")->value();\n    const std::string oversized = \"vault://orders/\" + std::string(90, 'a');\n    return owned == \"vault://orders/temporary-key\" && !SecretReference::parse(oversized) ? 0 : 4;\n}\n"
    }
  ]
};
