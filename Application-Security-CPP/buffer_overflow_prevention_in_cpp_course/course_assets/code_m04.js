window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe String and Byte Handling to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Treat counted text as a bounded string view",
      "language": "cpp",
      "blurb": "The caller supplies the known extent; embedded nulls are rejected by policy instead of silently terminating an unbounded scan.",
      "code": "#include <algorithm>\n#include <string>\n#include <string_view>\n\nstd::string validated_name(std::string_view input) {\n    if (input.empty() || input.size() > 64 ||\n        input.find('\\0') != std::string_view::npos) {\n        return {};\n    }\n    return std::string(input);\n}\n"
    },
    {
      "title": "Keep arbitrary bytes separate from C-string APIs",
      "language": "cpp",
      "blurb": "The checksum handles embedded zero bytes as data and never searches beyond the provided range for a terminator.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <span>\n\nstd::uint32_t byte_checksum(std::span<const std::byte> bytes) {\n    std::uint32_t result = 2166136261u;\n    for (std::byte byte : bytes) {\n        result = (result ^ std::to_integer<std::uint8_t>(byte)) * 16777619u;\n    }\n    return result;\n}\n"
    }
  ]
};
