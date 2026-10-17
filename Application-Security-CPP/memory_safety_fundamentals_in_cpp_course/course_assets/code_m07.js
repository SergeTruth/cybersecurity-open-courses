window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Parse untrusted text into a non-aggregate value whose private constructor makes invalid enabled combinations unrepresentable outside the validator.",
  "codeExamples": [
    {
      "title": "Construct a fully initialized record from checked input",
      "language": "cpp",
      "blurb": "The parser is the construction boundary: failure is represented by an empty optional, while a successful record owns a checked identifier and enumerated access level behind read-only accessors.",
      "code": "#include <charconv>\n#include <optional>\n#include <string_view>\n\nenum class AccessLevel {\n    reader,\n    writer\n};\n\nclass AccessRecord {\npublic:\n    unsigned identifier() const noexcept {\n        return identifier_;\n    }\n\n    AccessLevel level() const noexcept {\n        return level_;\n    }\n\n    bool enabled() const noexcept {\n        return true;\n    }\n\nprivate:\n    AccessRecord(\n        unsigned identifier,\n        AccessLevel level\n    ) noexcept : identifier_(identifier), level_(level) {}\n\n    friend std::optional<AccessRecord> parse_access_record(\n        std::string_view\n    );\n\n    unsigned identifier_;\n    AccessLevel level_;\n};\n\nstd::optional<AccessRecord> parse_access_record(\n    std::string_view text\n) {\n    const auto separator = text.find(':');\n    if (separator == std::string_view::npos) {\n        return std::nullopt;\n    }\n    unsigned identifier = 0;\n    const auto number = text.substr(0, separator);\n    const auto [end, error] = std::from_chars(\n        number.data(), number.data() + number.size(), identifier\n    );\n    if (error != std::errc{} ||\n        end != number.data() + number.size() ||\n        identifier == 0) {\n        return std::nullopt;\n    }\n    const auto role = text.substr(separator + 1);\n    if (role == \"reader\") {\n        return AccessRecord{\n            identifier, AccessLevel::reader\n        };\n    }\n    if (role == \"writer\") {\n        return AccessRecord{\n            identifier, AccessLevel::writer\n        };\n    }\n    return std::nullopt;\n}"
    },
    {
      "title": "Reject incomplete and unknown states",
      "language": "cpp",
      "blurb": "Compile-time checks prove aggregate and direct construction are unavailable; only complete numeric identifiers and known access levels produce enabled records.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_aggregate_v<AccessRecord>);\nstatic_assert(\n    !std::is_constructible_v<\n        AccessRecord, unsigned, AccessLevel\n    >\n);\n\nint test_initialized_access_record() {\n    const auto record = parse_access_record(\"17:writer\");\n    if (!record || !record->enabled() ||\n        record->identifier() != 17 ||\n        record->level() != AccessLevel::writer) return 1;\n    if (parse_access_record(\"17:admin\")) return 2;\n    if (parse_access_record(\":reader\")) return 3;\n    return 0;\n}"
    }
  ]
};
