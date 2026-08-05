window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Slicing, Subranges, and Offsets to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Validate offset and length without overflow",
      "language": "cpp",
      "blurb": "The subtraction check proves the requested half-open subrange fits before constructing it.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n\ntemplate<class T>\nstd::optional<std::span<T>> checked_subspan(\n    std::span<T> values, std::size_t offset, std::size_t length) {\n    if (offset > values.size()) return std::nullopt;\n    if (length > values.size() - offset) return std::nullopt;\n    return values.subspan(offset, length);\n}\n"
    },
    {
      "title": "Split a header only after proving both regions",
      "language": "cpp",
      "blurb": "The parser validates the fixed header and then the declared body as separate bounded views.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n\nstruct Parts { std::span<const std::byte> header; std::span<const std::byte> body; };\n\nstd::optional<Parts> split_message(\n    std::span<const std::byte> bytes, std::size_t body_size) {\n    constexpr std::size_t header_size = 8;\n    if (bytes.size() < header_size) return std::nullopt;\n    if (body_size > bytes.size() - header_size) return std::nullopt;\n    return Parts{bytes.first(header_size),\n                 bytes.subspan(header_size, body_size)};\n}\n"
    }
  ]
};
