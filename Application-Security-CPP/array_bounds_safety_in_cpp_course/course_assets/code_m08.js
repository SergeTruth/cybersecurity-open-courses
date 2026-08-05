window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Refactoring Legacy Array Code to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Wrap a legacy pointer-count function with a bounded adapter",
      "language": "cpp",
      "blurb": "The legacy call is isolated behind a span and checked conversion instead of spreading raw pairs through new code.",
      "code": "#include <climits>\n#include <cstddef>\n#include <span>\n#include <stdexcept>\n\nextern \"C\" int legacy_sum(const int*, int);\n\nint checked_legacy_sum(std::span<const int> values) {\n    if (values.size() > static_cast<std::size_t>(INT_MAX)) {\n        throw std::length_error(\"legacy count overflow\");\n    }\n    return legacy_sum(values.data(), static_cast<int>(values.size()));\n}\n"
    },
    {
      "title": "Replace sentinel traversal with an explicit range",
      "language": "cpp",
      "blurb": "The new function accepts arbitrary byte values, including zero, because termination comes from the supplied extent.",
      "code": "#include <cstddef>\n#include <span>\n\nstd::size_t count_zero_bytes(std::span<const std::byte> bytes) {\n    std::size_t count = 0;\n    for (std::byte value : bytes) {\n        if (value == std::byte{0}) ++count;\n    }\n    return count;\n}\n"
    }
  ]
};
