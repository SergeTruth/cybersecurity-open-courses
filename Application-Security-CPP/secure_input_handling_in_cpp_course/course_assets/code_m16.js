window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Return a Visible Validation Status",
      "language": "cpp",
      "blurb": "",
      "code": "#include <charconv>\n#include <optional>\n#include <string_view>\n#include <system_error>\n\nenum class ParseError {\n    none,\n    empty,\n    malformed,\n    out_of_range\n};\n\nstruct ParseResult {\n    std::optional<int> value;\n    ParseError error;\n};\n\nParseResult parse_retry_count(std::string_view text) {\n    if (text.empty()) {\n        return {std::nullopt, ParseError::empty};\n    }\n\n    int value = 0;\n    auto [ptr, ec] = std::from_chars(text.data(), text.data() + text.size(), value);\n    if (ec != std::errc{} || ptr != text.data() + text.size()) {\n        return {std::nullopt, ParseError::malformed};\n    }\n    if (value < 0 || value > 10) {\n        return {std::nullopt, ParseError::out_of_range};\n    }\n\n    return {value, ParseError::none};\n}"
    },
    {
      "title": "Test Boundaries and Malformed Input",
      "language": "cpp",
      "blurb": "",
      "code": "// Return-code checks remain active with NDEBUG and in optimized builds.\n// A test driver must call this function and propagate its nonzero result.\nint test_parse_retry_count() {\n    if (parse_retry_count(\"\").error != ParseError::empty) return 1;\n    if (parse_retry_count(\"x\").error != ParseError::malformed) return 2;\n    if (parse_retry_count(\"1x\").error != ParseError::malformed) return 3;\n    if (parse_retry_count(\"-1\").error != ParseError::out_of_range) return 4;\n    if (parse_retry_count(\"11\").error != ParseError::out_of_range) return 5;\n    const auto zero = parse_retry_count(\"0\");\n    const auto ten = parse_retry_count(\"10\");\n    if (!zero.value || *zero.value != 0) return 6;\n    if (!ten.value || *ten.value != 10) return 7;\n    return 0;\n}"
    }
  ]
};
