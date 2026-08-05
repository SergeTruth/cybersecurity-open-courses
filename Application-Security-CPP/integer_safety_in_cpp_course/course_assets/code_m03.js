window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Check that a value is representable before crossing a signedness or width boundary.",
  "codeExamples": [
    {
      "title": "Convert a wire count without narrowing or wraparound",
      "language": "cpp",
      "blurb": "std::in_range states the representation requirement directly before the cast.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <utility>\n\nstd::optional<std::uint16_t> checked_wire_count(std::int64_t value) {\n    if (!std::in_range<std::uint16_t>(value) || value == 0) {\n        return std::nullopt;\n    }\n    return static_cast<std::uint16_t>(value);\n}\n\nstd::optional<std::size_t> checked_index(std::int64_t value, std::size_t size) {\n    if (!std::in_range<std::size_t>(value)) return std::nullopt;\n    const auto index = static_cast<std::size_t>(value);\n    if (index >= size) return std::nullopt;\n    return index;\n}"
    },
    {
      "title": "Regression: negative and too-wide values never wrap",
      "language": "cpp",
      "blurb": "The explicit checks stay active regardless of the assertion configuration.",
      "code": "int test_checked_conversions() {\n    if (checked_wire_count(7) != 7) return 1;\n    if (checked_wire_count(-1)) return 2;\n    if (checked_wire_count(70000)) return 3;\n    if (checked_index(-1, 8)) return 4;\n    if (checked_index(8, 8)) return 5;\n    return 0;\n}"
    }
  ]
};
