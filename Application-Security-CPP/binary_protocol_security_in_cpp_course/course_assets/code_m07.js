window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Resource Limits and Malformed Input Handling to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Apply frame and item limits before allocation",
      "language": "cpp",
      "blurb": "The frame byte count and item count are both checked against application-owned limits before consistency checks or allocation.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n\nstruct Limits {\n    std::size_t maximum_frame = 65'536;\n    std::size_t maximum_items = 256;\n};\n\nstd::optional<std::size_t> checked_items(\n    std::uint32_t wire_count,\n    std::size_t frame_bytes,\n    const Limits& limits) {\n    constexpr std::size_t bytes_per_item = 8;\n    if (frame_bytes > limits.maximum_frame) return std::nullopt;\n    if (wire_count > limits.maximum_items) return std::nullopt;\n    if (wire_count > frame_bytes / bytes_per_item) return std::nullopt;\n    return static_cast<std::size_t>(wire_count);\n}\n"
    },
    {
      "title": "Bound cumulative TLV parsing work",
      "language": "cpp",
      "blurb": "The parser caps field count and verifies each declared value before advancing, so tiny fields cannot create unbounded loops.",
      "code": "#include <cstddef>\n#include <span>\n\nbool validate_tlvs(std::span<const std::byte> bytes) {\n    constexpr std::size_t maximum_fields = 128;\n    std::size_t fields = 0;\n    while (!bytes.empty()) {\n        if (++fields > maximum_fields || bytes.size() < 2) return false;\n        const std::size_t length = std::to_integer<unsigned>(bytes[1]);\n        bytes = bytes.subspan(2);\n        if (length > bytes.size()) return false;\n        bytes = bytes.subspan(length);\n    }\n    return true;\n}\n"
    }
  ]
};
