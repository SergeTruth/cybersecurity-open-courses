window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Numeric Fields, Endianness, and Type Conversion to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Decode a big-endian integer from individual bytes",
      "language": "cpp",
      "blurb": "Fixed-width shifts avoid alignment, padding, and host-endian assumptions.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <span>\n#include <stdexcept>\n\nstd::uint32_t read_be_u32(std::span<const std::byte> bytes) {\n    if (bytes.size() != 4) throw std::invalid_argument(\"u32 requires four bytes\");\n    return (std::to_integer<std::uint32_t>(bytes[0]) << 24) |\n           (std::to_integer<std::uint32_t>(bytes[1]) << 16) |\n           (std::to_integer<std::uint32_t>(bytes[2]) << 8) |\n            std::to_integer<std::uint32_t>(bytes[3]);\n}\n"
    },
    {
      "title": "Convert a wire amount only within application range",
      "language": "cpp",
      "blurb": "The parser rejects values outside the signed business range before narrowing to the application type.",
      "code": "#include <cstdint>\n#include <optional>\n\nstd::optional<std::int32_t> order_amount(std::uint32_t wire_value) {\n    constexpr std::uint32_t maximum = 1'000'000;\n    if (wire_value > maximum) return std::nullopt;\n    return static_cast<std::int32_t>(wire_value);\n}\n"
    }
  ]
};
