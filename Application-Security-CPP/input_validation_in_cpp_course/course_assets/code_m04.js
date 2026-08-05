window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Parse full numeric fields and perform checked arithmetic before converting counts into byte sizes.",
  "codeExamples": [
    {
      "title": "Convert an item count into a bounded allocation size",
      "language": "cpp",
      "blurb": "from_chars rejects suffixes and the division check prevents multiplication overflow.",
      "code": "#include <charconv>\n#include <cstddef>\n#include <limits>\n#include <optional>\n#include <string_view>\n\nstd::optional<std::size_t> checked_item_bytes(\n    std::string_view count_text,\n    std::size_t element_size\n) {\n    std::size_t count = 0;\n    const auto [end, error] = std::from_chars(\n        count_text.data(), count_text.data() + count_text.size(), count\n    );\n    if (error != std::errc{} || end != count_text.data() + count_text.size() ||\n        count == 0 || count > 100000 || element_size == 0 ||\n        count > std::numeric_limits<std::size_t>::max() / element_size) {\n        return std::nullopt;\n    }\n    return count * element_size;\n}"
    },
    {
      "title": "Regression: prefix parses, zero, and overflow fail closed",
      "language": "cpp",
      "blurb": "The accepted result is already safe to pass to an allocator.",
      "code": "int test_checked_item_bytes() {\n    if (checked_item_bytes(\"12\", 8) != 96) return 1;\n    if (checked_item_bytes(\"12items\", 8)) return 2;\n    if (checked_item_bytes(\"0\", 8)) return 3;\n    if (checked_item_bytes(\"2\", std::numeric_limits<std::size_t>::max())) return 4;\n    return 0;\n}"
    }
  ]
};
