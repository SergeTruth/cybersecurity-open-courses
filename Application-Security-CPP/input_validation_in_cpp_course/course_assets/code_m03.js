window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Decode one complete frame into typed fields and reject both truncation and unconsumed trailing bytes.",
  "codeExamples": [
    {
      "title": "Parse exactly one length-prefixed command",
      "language": "cpp",
      "blurb": "The declared length must equal the remaining input, not merely fit inside it.",
      "code": "#include <utility>\n#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n#include <string>\n#include <vector>\n\nstruct CommandFrame {\n    std::uint8_t version;\n    std::string command;\n};\n\nstd::optional<CommandFrame> parse_command_frame(\n    std::span<const std::byte> input\n) {\n    if (input.size() < 3) return std::nullopt;\n    const auto version = std::to_integer<std::uint8_t>(input[0]);\n    const std::size_t length =\n        (std::to_integer<std::size_t>(input[1]) << 8U) |\n        std::to_integer<std::size_t>(input[2]);\n    if (version != 1 || length == 0 || length > 256 ||\n        input.size() != 3 + length) {\n        return std::nullopt;\n    }\n    const char* first = reinterpret_cast<const char*>(input.data() + 3);\n    std::string command{first, length};\n    if (command.find('\\0') != std::string::npos) return std::nullopt;\n    return CommandFrame{version, std::move(command)};\n}"
    },
    {
      "title": "Regression: valid prefixes with trailing data are rejected",
      "language": "cpp",
      "blurb": "The parser cannot accept one message while silently ignoring a second payload.",
      "code": "int test_command_frame() {\n    std::vector<std::byte> valid{\n        std::byte{1}, std::byte{0}, std::byte{2},\n        std::byte{'o'}, std::byte{'k'}\n    };\n    if (!parse_command_frame(valid)) return 1;\n    valid.push_back(std::byte{'x'});\n    if (parse_command_frame(valid)) return 2;\n    return 0;\n}"
    }
  ]
};
