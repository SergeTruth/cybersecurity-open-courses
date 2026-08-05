window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation and Size Calculation to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Check a counted allocation before multiplication",
      "language": "cpp",
      "blurb": "Both the application limit and arithmetic limit are enforced before allocating the destination vector.",
      "code": "#include <cstddef>\n#include <limits>\n#include <optional>\n#include <vector>\n\nstd::optional<std::vector<std::byte>> allocate_records(\n    std::size_t count, std::size_t record_size) {\n    constexpr std::size_t maximum_bytes = 1024 * 1024;\n    if (record_size == 0 || count > maximum_bytes / record_size) {\n        return std::nullopt;\n    }\n    return std::vector<std::byte>(count * record_size);\n}\n"
    },
    {
      "title": "Validate encoded length before narrowing",
      "language": "cpp",
      "blurb": "The 64-bit external value is bounded before converting to size_t and before it controls a copy or allocation.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <limits>\n#include <optional>\n\nstd::optional<std::size_t> local_length(std::uint64_t wire_length) {\n    constexpr std::uint64_t policy_maximum = 65'536;\n    if (wire_length > policy_maximum ||\n        wire_length > std::numeric_limits<std::size_t>::max()) {\n        return std::nullopt;\n    }\n    return static_cast<std::size_t>(wire_length);\n}\n"
    }
  ]
};
