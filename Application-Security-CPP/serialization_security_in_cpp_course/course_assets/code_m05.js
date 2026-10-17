window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The decoder validates the declared count before reserving storage and proves the complete input is consumed.",
  "codeExamples": [
    {
      "title": "Enforce count and byte ceilings together",
      "language": "cpp",
      "blurb": "The decoder validates the declared count before reserving storage and proves the complete input is consumed.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n#include <vector>\n\nstd::optional<std::vector<std::uint16_t>> decode_scores(std::span<const std::byte> bytes) {\n    if (bytes.empty()) return std::nullopt;\n    const auto count = std::to_integer<std::uint8_t>(bytes.front());\n    if (count > 8 || bytes.size() != 1 + static_cast<std::size_t>(count) * 2) return std::nullopt;\n    std::vector<std::uint16_t> scores;\n    scores.reserve(count);\n    for (std::size_t i = 0; i < count; ++i) {\n        const auto high = std::to_integer<std::uint16_t>(bytes[1 + i * 2]);\n        const auto low = std::to_integer<std::uint16_t>(bytes[2 + i * 2]);\n        scores.push_back(static_cast<std::uint16_t>((high << 8) | low));\n    }\n    return scores;\n}\n\nint main() {\n    const std::byte valid[]{std::byte{2}, std::byte{0}, std::byte{7}, std::byte{0}, std::byte{9}};\n    const std::byte truncated[]{std::byte{2}, std::byte{0}, std::byte{7}};\n    const auto scores = decode_scores(valid);\n    if (!scores || scores->size() != 2 || scores->back() != 9) return 1;\n    return decode_scores(truncated) ? 2 : 0;\n}\n"
    }
  ]
};
