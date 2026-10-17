window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Carry buffer extent in a span and check offset arithmetic before reading a fixed-width field.",
  "codeExamples": [
    {
      "title": "Decode a bounded big-endian field",
      "language": "cpp",
      "blurb": "The parser checks the remaining extent without overflow-prone offset addition and returns no value for a short view.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n\nstd::optional<std::uint32_t> read_u32_be(\n    std::span<const std::byte> bytes,\n    std::size_t offset\n) noexcept {\n    constexpr std::size_t width = 4;\n    if (offset > bytes.size() ||\n        bytes.size() - offset < width) {\n        return std::nullopt;\n    }\n    const auto field = bytes.subspan(offset, width);\n    std::uint32_t value = 0;\n    for (const auto byte : field) {\n        value = (value << 8U) |\n            std::to_integer<std::uint32_t>(byte);\n    }\n    return value;\n}"
    },
    {
      "title": "Test valid and out-of-range buffer views",
      "language": "cpp",
      "blurb": "A complete field decodes while an offset near the end and the largest possible offset both fail safely.",
      "code": "#include <array>\n#include <limits>\n\nint test_bounded_u32_read() {\n    const std::array<std::byte, 5> bytes{\n        std::byte{0}, std::byte{0x12}, std::byte{0x34},\n        std::byte{0x56}, std::byte{0x78}\n    };\n    if (read_u32_be(bytes, 1) != 0x12345678U) return 1;\n    if (read_u32_be(bytes, 2)) return 2;\n    if (read_u32_be(\n        bytes, std::numeric_limits<std::size_t>::max()\n    )) return 3;\n    return 0;\n}"
    }
  ]
};
