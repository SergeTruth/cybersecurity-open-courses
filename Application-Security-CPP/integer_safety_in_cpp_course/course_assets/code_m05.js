window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Validate each component and every intermediate operation before allocating a protocol buffer.",
  "codeExamples": [
    {
      "title": "Compute header-plus-elements without overflow",
      "language": "cpp",
      "blurb": "The helper validates count, element width, multiplication, addition, and the application allocation ceiling.",
      "code": "#include <cstddef>\n#include <limits>\n#include <optional>\n\nstd::optional<std::size_t> packet_allocation_size(\n    std::size_t header,\n    std::size_t count,\n    std::size_t element\n) {\n    constexpr std::size_t allocation_limit = 8 * 1024 * 1024;\n    if (header == 0 || count == 0 || element == 0) return std::nullopt;\n    if (count > std::numeric_limits<std::size_t>::max() / element) {\n        return std::nullopt;\n    }\n    const std::size_t payload = count * element;\n    if (payload > allocation_limit ||\n        header > allocation_limit - payload) {\n        return std::nullopt;\n    }\n    return header + payload;\n}"
    },
    {
      "title": "Regression: large counts cannot wrap to a small allocation",
      "language": "cpp",
      "blurb": "The returned value is safe to use as the allocation extent.",
      "code": "int test_packet_allocation_size() {\n    if (packet_allocation_size(16, 10, 8) != 96) return 1;\n    if (packet_allocation_size(\n        16, std::numeric_limits<std::size_t>::max(), 8\n    )) return 2;\n    if (packet_allocation_size(16, 1024 * 1024, 9)) return 3;\n    return 0;\n}"
    }
  ]
};
