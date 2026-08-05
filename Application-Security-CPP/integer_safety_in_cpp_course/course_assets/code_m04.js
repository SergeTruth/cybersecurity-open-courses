window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Make arithmetic failure an ordinary result and test the bound before evaluating an overflowing expression.",
  "codeExamples": [
    {
      "title": "Add and multiply unsigned amounts with checked preconditions",
      "language": "cpp",
      "blurb": "The comparisons are arranged so the dangerous operation runs only after it is proven representable.",
      "code": "#include <cstdint>\n#include <limits>\n#include <optional>\n\nstd::optional<std::uint64_t> checked_add(\n    std::uint64_t left,\n    std::uint64_t right\n) {\n    if (right > std::numeric_limits<std::uint64_t>::max() - left) {\n        return std::nullopt;\n    }\n    return left + right;\n}\n\nstd::optional<std::uint64_t> checked_multiply(\n    std::uint64_t left,\n    std::uint64_t right\n) {\n    if (left != 0 &&\n        right > std::numeric_limits<std::uint64_t>::max() / left) {\n        return std::nullopt;\n    }\n    return left * right;\n}"
    },
    {
      "title": "Regression: boundary arithmetic reports failure",
      "language": "cpp",
      "blurb": "The test includes the exact maximum and the first unrepresentable result.",
      "code": "int test_checked_arithmetic() {\n    constexpr auto maximum = std::numeric_limits<std::uint64_t>::max();\n    if (checked_add(maximum - 1, 1) != maximum) return 1;\n    if (checked_add(maximum, 1)) return 2;\n    if (checked_multiply(maximum, 2)) return 3;\n    if (checked_multiply(0, maximum) != 0) return 4;\n    return 0;\n}"
    }
  ]
};
