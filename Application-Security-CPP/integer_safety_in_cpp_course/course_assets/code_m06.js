window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Parse the complete textual integer, enforce the protocol range, and serialize only a representable fixed-width value.",
  "codeExamples": [
    {
      "title": "Parse an exact bounded unsigned decimal field",
      "language": "cpp",
      "blurb": "Leading signs, whitespace, suffixes, and out-of-range values are rejected; leading zeroes are accepted because this is exact parsing, not a canonical representation.",
      "code": "#include <charconv>\n#include <cstdint>\n#include <optional>\n#include <string_view>\n\nstd::optional<std::uint32_t> parse_quantity(std::string_view text) {\n    if (text.empty() || text.front() == '+' || text.front() == '-') {\n        return std::nullopt;\n    }\n    std::uint32_t value = 0;\n    const auto [end, error] =\n        std::from_chars(text.data(), text.data() + text.size(), value);\n    if (error != std::errc{} || end != text.data() + text.size() ||\n        value == 0 || value > 1000000) {\n        return std::nullopt;\n    }\n    return value;\n}"
    },
    {
      "title": "Regression: partial numeric prefixes are not accepted",
      "language": "cpp",
      "blurb": "The wire boundary receives one canonical integer rather than a library-specific prefix parse.",
      "code": "int test_parse_quantity() {\n    if (parse_quantity(\"4096\") != 4096) return 1;\n    if (parse_quantity(\"4096items\")) return 2;\n    if (parse_quantity(\" 4096\")) return 3;\n    if (parse_quantity(\"+4096\")) return 4;\n    if (parse_quantity(\"1000001\")) return 5;\n    return 0;\n}"
    }
  ]
};
