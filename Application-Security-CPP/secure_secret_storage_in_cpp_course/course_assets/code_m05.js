window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Deployment configuration uses a recursive allowlist that cannot contain secret-shaped extra fields.",
  "codeExamples": [
    {
      "title": "Validate the exact secret-injection configuration schema",
      "language": "cpp",
      "blurb": "Only an approved provider, a fully validated reference, and a positive rotation generation are accepted.",
      "code": "#include <charconv>\n#include <map>\n#include <optional>\n#include <string>\n#include <string_view>\n\nbool approved_secret_reference(\n    std::string_view reference\n) noexcept {\n    constexpr std::string_view prefix = \"vault://orders/\";\n    if (!reference.starts_with(prefix)) return false;\n    const auto identifier = reference.substr(prefix.size());\n    if (identifier.empty() || identifier.size() > 48 ||\n        identifier.front() == '/' || identifier.back() == '/') {\n        return false;\n    }\n    bool previous_separator = false;\n    for (unsigned char ch : identifier) {\n        if (ch == '/') {\n            if (previous_separator) return false;\n            previous_separator = true;\n            continue;\n        }\n        previous_separator = false;\n        const bool lowercase = ch >= 'a' && ch <= 'z';\n        const bool digit = ch >= '0' && ch <= '9';\n        if (!lowercase && !digit && ch != '-') return false;\n    }\n    return true;\n}\n\nstruct SecretInjectionConfig {\n    std::string provider;\n    std::string reference;\n    unsigned generation;\n};\n\nstd::optional<SecretInjectionConfig> parse_secret_injection(\n    const std::map<std::string, std::string>& values\n) {\n    if (values.size() != 3 || !values.contains(\"provider\") ||\n        !values.contains(\"reference\") ||\n        !values.contains(\"generation\")) {\n        return std::nullopt;\n    }\n    if (values.at(\"provider\") != \"orders-vault\" ||\n        !approved_secret_reference(values.at(\"reference\"))) {\n        return std::nullopt;\n    }\n    unsigned generation = 0;\n    const auto& text = values.at(\"generation\");\n    auto [end, error] = std::from_chars(\n        text.data(),\n        text.data() + text.size(),\n        generation\n    );\n    if (error != std::errc{} ||\n        end != text.data() + text.size() || generation == 0) {\n        return std::nullopt;\n    }\n    return SecretInjectionConfig{\n        values.at(\"provider\"),\n        values.at(\"reference\"),\n        generation\n    };\n}\n"
    },
    {
      "title": "Reject embedded secrets and partial generation numbers",
      "language": "cpp",
      "blurb": "The regression rejects unknown fields, partial generations, empty path segments, and traversal-shaped references.",
      "code": "int main() {\n    std::map<std::string, std::string> valid{\n        {\"provider\", \"orders-vault\"},\n        {\"reference\", \"vault://orders/api/token\"},\n        {\"generation\", \"7\"}\n    };\n    if (!parse_secret_injection(valid)) return 1;\n    valid[\"password\"] = \"embedded\";\n    if (parse_secret_injection(valid)) return 2;\n    valid.erase(\"password\");\n    valid[\"generation\"] = \"7junk\";\n    if (parse_secret_injection(valid)) return 3;\n    valid[\"generation\"] = \"7\";\n    valid[\"reference\"] = \"vault://orders/../../embedded\";\n    if (parse_secret_injection(valid)) return 4;\n    valid[\"reference\"] = \"vault://orders//token\";\n    if (parse_secret_injection(valid)) return 5;\n    return 0;\n}\n"
    }
  ]
};
