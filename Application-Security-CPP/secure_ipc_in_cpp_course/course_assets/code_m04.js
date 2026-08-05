window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "An IPC decoder copies validated message bytes into an owned command object.",
  "codeExamples": [
    {
      "title": "Decode an exact-length IPC command",
      "language": "cpp",
      "blurb": "The parser requires the complete frame, a supported version and opcode, and a bounded printable identifier.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <string>\n#include <utility>\n\nconstexpr bool ascii_ipc_id_char(unsigned char ch) noexcept {\n    return (ch >= 'A' && ch <= 'Z') ||\n           (ch >= 'a' && ch <= 'z') ||\n           (ch >= '0' && ch <= '9') || ch == '-';\n}\n\nstatic_assert(!ascii_ipc_id_char(0xe9));\n\nstruct IpcCommand {\n    unsigned opcode;\n    std::string object_id;\n};\n\nstd::optional<IpcCommand> decode_ipc_command(std::span<const std::byte> bytes) {\n    if (bytes.size() < 4) return std::nullopt;\n    const unsigned version = std::to_integer<unsigned>(bytes[0]);\n    const unsigned opcode = std::to_integer<unsigned>(bytes[1]);\n    const std::size_t length = (std::to_integer<unsigned>(bytes[2]) << 8) |\n                               std::to_integer<unsigned>(bytes[3]);\n    if (version != 1 || (opcode != 1 && opcode != 2) || length == 0 || length > 32) return std::nullopt;\n    if (bytes.size() != 4 + length) return std::nullopt;\n    std::string id;\n    id.reserve(length);\n    for (std::byte value : bytes.subspan(4)) {\n        const auto ch = static_cast<unsigned char>(std::to_integer<unsigned>(value));\n        if (!ascii_ipc_id_char(ch)) return std::nullopt;\n        id.push_back(static_cast<char>(ch));\n    }\n    return IpcCommand{opcode, std::move(id)};\n}\n"
    },
    {
      "title": "Reject truncation, trailing bytes, and unsupported opcodes",
      "language": "cpp",
      "blurb": "The owned result remains valid independently of the caller buffer.",
      "code": "#include <array>\n\nint main() {\n    std::array<std::byte, 7> valid{std::byte{1}, std::byte{2}, std::byte{0}, std::byte{3},\n                                   std::byte{'A'}, std::byte{'-'}, std::byte{'7'}};\n    auto command = decode_ipc_command(valid);\n    if (!command || command->object_id != \"A-7\") return 1;\n    valid[1] = std::byte{9};\n    if (decode_ipc_command(valid)) return 2;\n    std::array<std::byte, 8> trailing{std::byte{1}, std::byte{1}, std::byte{0}, std::byte{3},\n                                      std::byte{'A'}, std::byte{'-'}, std::byte{'7'}, std::byte{0}};\n    if (decode_ipc_command(trailing)) return 3;\n    std::array<std::byte, 5> high_byte{\n        std::byte{1}, std::byte{1}, std::byte{0},\n        std::byte{1}, std::byte{0xe9}\n    };\n    if (decode_ipc_command(high_byte)) return 4;\n    return 0;\n}\n"
    }
  ]
};
