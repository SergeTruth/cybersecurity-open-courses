window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "A bounded binary decoder rejects unsupported versions and inconsistent payload lengths.",
  "codeExamples": [
    {
      "title": "Decode an explicit schema version",
      "language": "cpp",
      "blurb": "A bounded binary decoder rejects unsupported versions and inconsistent payload lengths.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n#include <vector>\n\nstruct Message { std::uint8_t version; std::vector<std::byte> payload; };\n\nstd::optional<Message> decode_message(std::span<const std::byte> bytes) {\n    if (bytes.size() < 2) return std::nullopt;\n    const auto version = std::to_integer<std::uint8_t>(bytes[0]);\n    const auto length = std::to_integer<std::uint8_t>(bytes[1]);\n    if (version != 1 || length > 32 || bytes.size() != static_cast<std::size_t>(length) + 2) return std::nullopt;\n    return Message{version, {bytes.begin() + 2, bytes.end()}};\n}\n\nint main() {\n    auto decoded = decode_message(std::vector<std::byte>{\n        std::byte{1}, std::byte{2}, std::byte{9}, std::byte{8}\n    });\n    const std::byte wrong[]{std::byte{2}, std::byte{0}};\n    if (!decoded || decoded->payload.size() != 2 || decoded->payload[0] != std::byte{9}) return 1;\n    return decode_message(wrong) ? 2 : 0;\n}\n"
    }
  ]
};
