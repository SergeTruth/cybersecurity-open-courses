window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Bounds-aware access validates offset and length with subtraction before producing a view.",
  "codeExamples": [
    {
      "title": "Create a checked subspan without overflow",
      "language": "cpp",
      "blurb": "The offset is proven first, then length is compared with the remaining extent.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n\ntemplate<class T>\nstd::optional<std::span<T>> checked_subspan(\n    std::span<T> values,\n    std::size_t offset,\n    std::size_t length\n) noexcept {\n    if (offset > values.size()) return std::nullopt;\n    if (length > values.size() - offset) return std::nullopt;\n    return values.subspan(offset, length);\n}\n"
    },
    {
      "title": "Check boundary and overflow-shaped requests",
      "language": "cpp",
      "blurb": "The regression covers an exact suffix, a past-end offset, and a maximum length.",
      "code": "#include <array>\n#include <limits>\n\nint main() {\n    std::array<int, 4> values{1, 2, 3, 4};\n    auto suffix = checked_subspan<int>(values, 2, 2);\n    if (!suffix || (*suffix)[0] != 3) return 1;\n    if (checked_subspan<int>(values, 5, 0)) return 2;\n    if (checked_subspan<int>(values, 1, std::numeric_limits<std::size_t>::max())) return 3;\n    return 0;\n}\n"
    }
  ]
};
