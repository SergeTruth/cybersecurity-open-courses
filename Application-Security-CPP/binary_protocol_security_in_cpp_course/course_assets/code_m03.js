window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Parsing Without Unsafe Assumptions to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Parse exactly one length-prefixed frame",
      "language": "cpp",
      "blurb": "The one-frame contract rejects truncation and trailing bytes by requiring the declared payload to equal all bytes remaining after the header.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n\nstd::optional<std::span<const std::byte>> parse_one_frame(\n    std::span<const std::byte> bytes) {\n    constexpr std::size_t header = 4;\n    if (bytes.size() < header) return std::nullopt;\n    const std::uint32_t length =\n        (std::to_integer<std::uint32_t>(bytes[0]) << 24) |\n        (std::to_integer<std::uint32_t>(bytes[1]) << 16) |\n        (std::to_integer<std::uint32_t>(bytes[2]) << 8) |\n         std::to_integer<std::uint32_t>(bytes[3]);\n    if (length != bytes.size() - header) return std::nullopt;\n    return bytes.subspan(header);\n}\n"
    },
    {
      "title": "Advance a checked cursor instead of casting structures",
      "language": "cpp",
      "blurb": "Every read proves that enough bytes remain and returns a bounded view with no alignment or object-lifetime assumptions.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n\nclass Cursor {\n    std::span<const std::byte> remaining_;\npublic:\n    explicit Cursor(std::span<const std::byte> bytes) : remaining_(bytes) {}\n    std::optional<std::span<const std::byte>> take(std::size_t count) {\n        if (count > remaining_.size()) return std::nullopt;\n        auto result = remaining_.first(count);\n        remaining_ = remaining_.subspan(count);\n        return result;\n    }\n    bool empty() const noexcept { return remaining_.empty(); }\n};\n"
    }
  ]
};
