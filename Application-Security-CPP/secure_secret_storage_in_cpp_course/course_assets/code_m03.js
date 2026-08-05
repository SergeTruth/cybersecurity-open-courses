window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Configuration carries an opaque secret reference instead of credential bytes.",
  "codeExamples": [
    {
      "title": "Validate an external secret reference",
      "language": "cpp",
      "blurb": "The type accepts one reviewed namespace with bounded, nonempty ASCII path segments and never embeds secret bytes.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nbool approved_secret_reference(\n    std::string_view reference\n) noexcept {\n    constexpr std::string_view prefix = \"vault://orders/\";\n    if (!reference.starts_with(prefix)) return false;\n    const auto identifier = reference.substr(prefix.size());\n    if (identifier.empty() || identifier.size() > 48 ||\n        identifier.front() == '/' || identifier.back() == '/') {\n        return false;\n    }\n    bool previous_separator = false;\n    for (unsigned char ch : identifier) {\n        if (ch == '/') {\n            if (previous_separator) return false;\n            previous_separator = true;\n            continue;\n        }\n        previous_separator = false;\n        const bool lowercase = ch >= 'a' && ch <= 'z';\n        const bool digit = ch >= '0' && ch <= '9';\n        if (!lowercase && !digit && ch != '-') return false;\n    }\n    return true;\n}\n\nclass SecretReference {\npublic:\n    static std::optional<SecretReference> parse(std::string_view text) {\n        if (!approved_secret_reference(text)) return std::nullopt;\n        return SecretReference(std::string(text));\n    }\n    std::string value() const { return value_; }\nprivate:\n    explicit SecretReference(std::string value)\n        : value_(std::move(value)) {}\n    std::string value_;\n};\n"
    },
    {
      "title": "Reject embedded values and unapproved providers",
      "language": "cpp",
      "blurb": "The regression rejects embedded values, unapproved providers, empty segments, dot syntax, and non-ASCII grammar.",
      "code": "int main() {\n    auto reference = SecretReference::parse(\n        \"vault://orders/database/password\"\n    );\n    if (!reference) return 1;\n    if (SecretReference::parse(\n        \"password=correct-horse-battery-staple\")) return 2;\n    if (SecretReference::parse(\"file:///tmp/orders-secret\")) return 3;\n    if (SecretReference::parse(\"vault://orders/Database\")) return 4;\n    if (SecretReference::parse(\"vault://orders//\")) return 5;\n    if (SecretReference::parse(\"vault://orders/../token\")) return 6;\n    if (SecretReference::parse(\"vault://orders/api//token\")) return 7;\n    return 0;\n}\n"
    }
  ]
};
