window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Parse one complete message, reject unknown versions, and refuse trailing bytes that would otherwise be ignored.",
  "codeExamples": [
    {
      "title": "Decode an exact length-prefixed record",
      "language": "cpp",
      "blurb": "The size relation uses equality because this API accepts exactly one record.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n#include <vector>\n\nstruct Record {\n    std::uint8_t kind;\n    std::vector<std::byte> payload;\n};\n\nstd::optional<Record> parse_record(std::span<const std::byte> input) {\n    if (input.size() < 3) return std::nullopt;\n    const auto kind = std::to_integer<std::uint8_t>(input[0]);\n    const std::size_t length =\n        (std::to_integer<std::size_t>(input[1]) << 8U) |\n        std::to_integer<std::size_t>(input[2]);\n    if ((kind != 1 && kind != 2) || length > 1024 ||\n        input.size() != length + 3) return std::nullopt;\n    return Record{\n        kind,\n        std::vector<std::byte>(input.begin() + 3, input.end())\n    };\n}"
    },
    {
      "title": "Regression: trailing input cannot hide behind a valid prefix",
      "language": "cpp",
      "blurb": "The negative case directly covers the parser weakness identified in review.",
      "code": "int test_exact_record() {\n    std::vector<std::byte> record{\n        std::byte{1}, std::byte{0}, std::byte{1}, std::byte{9}\n    };\n    if (!parse_record(record)) return 1;\n    record.push_back(std::byte{10});\n    if (parse_record(record)) return 2;\n    return 0;\n}"
    }
  ]
};
