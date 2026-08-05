window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply External Input, Parsed Lengths, and Dynamic Sizes to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Convert an external count only after applying a policy limit",
      "language": "cpp",
      "blurb": "The unsigned wire value is bounded before it becomes an allocation size.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n\nstd::optional<std::size_t> item_count(std::uint64_t wire_count) {\n    constexpr std::uint64_t maximum_items = 10'000;\n    if (wire_count > maximum_items) return std::nullopt;\n    return static_cast<std::size_t>(wire_count);\n}\n"
    },
    {
      "title": "Check multiplication before calculating byte capacity",
      "language": "cpp",
      "blurb": "The helper rejects impossible element counts instead of allowing size_t multiplication to wrap.",
      "code": "#include <cstddef>\n#include <limits>\n#include <optional>\n\nstd::optional<std::size_t> bytes_for(\n    std::size_t count, std::size_t element_size) {\n    if (element_size != 0 &&\n        count > std::numeric_limits<std::size_t>::max() / element_size) {\n        return std::nullopt;\n    }\n    return count * element_size;\n}\n"
    }
  ]
};
