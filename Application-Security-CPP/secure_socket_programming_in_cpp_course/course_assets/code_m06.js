window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Protocol decoding validates exact framing and returns owned payload bytes.",
  "codeExamples": [
    {
      "title": "Decode an exact-length socket message",
      "language": "cpp",
      "blurb": "The decoder rejects unsupported versions, unknown message types, oversized lengths, truncation, and trailing bytes.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <span>\n#include <vector>\n\nstruct SocketMessage {\n    std::uint8_t type;\n    std::vector<std::byte> payload;\n};\n\nstd::optional<SocketMessage> decode_socket_message(std::span<const std::byte> bytes) {\n    if (bytes.size() < 4) return std::nullopt;\n    const auto version = std::to_integer<unsigned>(bytes[0]);\n    const auto type = std::to_integer<unsigned>(bytes[1]);\n    const std::size_t size = (std::to_integer<unsigned>(bytes[2]) << 8) |\n                             std::to_integer<unsigned>(bytes[3]);\n    if (version != 1 || (type != 1 && type != 2) || size > 4096 || bytes.size() != 4 + size) return std::nullopt;\n    return SocketMessage{static_cast<std::uint8_t>(type),\n                         std::vector<std::byte>(bytes.begin() + 4, bytes.end())};\n}\n"
    },
    {
      "title": "Prove decoded payload ownership survives caller destruction",
      "language": "cpp",
      "blurb": "The regression returns a message from a local packet and checks exact-length rejection.",
      "code": "#include <array>\n\nSocketMessage make_owned_message() {\n    std::array<std::byte, 6> packet{std::byte{1}, std::byte{2}, std::byte{0}, std::byte{2},\n                                    std::byte{0x41}, std::byte{0x42}};\n    return *decode_socket_message(packet);\n}\nint main() {\n    auto message = make_owned_message();\n    if (message.payload.size() != 2 || message.payload[0] != std::byte{0x41}) return 1;\n    std::array<std::byte, 7> trailing{std::byte{1}, std::byte{1}, std::byte{0}, std::byte{2},\n                                      std::byte{1}, std::byte{2}, std::byte{3}};\n    if (decode_socket_message(trailing)) return 2;\n    return 0;\n}\n"
    }
  ]
};
