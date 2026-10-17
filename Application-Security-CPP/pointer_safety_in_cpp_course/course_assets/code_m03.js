window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Preserve a validated caller-side extent in a span, then enforce the operation's byte ceiling at the API boundary.",
  "codeExamples": [
    {
      "title": "Accept an extent-preserving byte view",
      "language": "cpp",
      "blurb": "The span keeps the caller-established range attached to the data, and the function rejects ranges above its supported byte ceiling.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n\nstd::optional<std::uint32_t> checked_byte_sum(\n    std::span<const std::byte> bytes\n) noexcept {\n    constexpr std::size_t maximum_size = 4096;\n    if (bytes.size() > maximum_size) {\n        return std::nullopt;\n    }\n    std::uint32_t sum = 0;\n    for (const std::byte value : bytes) {\n        sum += std::to_integer<std::uint32_t>(value);\n    }\n    return sum;\n}"
    },
    {
      "title": "Exercise empty, valid, and oversized spans",
      "language": "cpp",
      "blurb": "The regression forms spans from real arrays, verifies the valid range, and proves that the declared ceiling rejects an actual oversized array.",
      "code": "#include <array>\n\nint test_pointer_length_contract() {\n    if (checked_byte_sum(std::span<const std::byte>{}) != 0) {\n        return 1;\n    }\n\n    const std::array<std::byte, 3> bytes{\n        std::byte{1}, std::byte{2}, std::byte{3}\n    };\n    if (checked_byte_sum(std::span{bytes}) != 6) {\n        return 2;\n    }\n\n    const std::array<std::byte, 4097> oversized{};\n    if (checked_byte_sum(std::span{oversized})) return 3;\n    return 0;\n}"
    }
  ]
};
