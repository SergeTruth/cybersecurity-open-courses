window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Parse the complete value, enforce an allowlist or range, and make each default an explicit policy decision.",
  "codeExamples": [
    {
      "title": "Parse an exact bounded decimal port",
      "language": "cpp",
      "blurb": "std::from_chars exposes incomplete input and overflow without exceptions or locale-dependent behavior.",
      "code": "#include <charconv>\n#include <optional>\n#include <string_view>\n\nstd::optional<unsigned short> parse_port(std::string_view text) {\n    unsigned int value = 0;\n    const auto [end, error] =\n        std::from_chars(text.data(), text.data() + text.size(), value);\n    if (error != std::errc{} || end != text.data() + text.size() ||\n        value == 0 || value > 65535) {\n        return std::nullopt;\n    }\n    return static_cast<unsigned short>(value);\n}\n\nenum class RunMode { production, staging };\n\nstd::optional<RunMode> parse_mode(std::string_view text) {\n    if (text == \"production\") return RunMode::production;\n    if (text == \"staging\") return RunMode::staging;\n    return std::nullopt;\n}\n\nbool approved_api_origin(std::string_view text) {\n    return text == \"https://api.example.com\";\n}"
    },
    {
      "title": "Regression: reject numeric suffixes and unknown modes",
      "language": "cpp",
      "blurb": "The test distinguishes a clean parse from a prefix-only conversion such as 443junk.",
      "code": "int test_environment_conversions() {\n    if (parse_port(\"443\") != 443) return 1;\n    if (parse_port(\"443junk\")) return 2;\n    if (parse_port(\"0\") || parse_port(\"70000\")) return 3;\n    if (parse_mode(\"development\")) return 4;\n    if (parse_mode(\"production\") != RunMode::production) return 5;\n    if (!approved_api_origin(\"https://api.example.com\")) return 6;\n    if (approved_api_origin(\"https://api.example.com.evil.test\")) return 7;\n    return 0;\n}"
    }
  ]
};
