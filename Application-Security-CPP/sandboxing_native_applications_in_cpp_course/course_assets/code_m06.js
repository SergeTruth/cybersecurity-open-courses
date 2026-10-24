window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Parse IPC into owned data with exact framing so accepted payloads cannot dangle after the receive buffer is reused.",
  codeExamples: [
    {
      title: "Parse an exact owned IPC frame",
      language: "cpp",
      blurb: "The parser validates type and exact declared length, applies a payload ceiling, and copies accepted bytes into owned storage.",
      code: String.raw`#include <cstddef>
#include <cstdint>
#include <optional>
#include <span>
#include <vector>

struct IpcFrame {
    std::uint16_t type;
    std::vector<std::byte> payload;
};

std::optional<IpcFrame> parse_ipc_frame(
    std::span<const std::byte> bytes
) {
    constexpr std::size_t header_size = 4;
    constexpr std::size_t maximum_payload = 4096;
    if (bytes.size() < header_size) return std::nullopt;
    const auto type = static_cast<std::uint16_t>(
        (std::to_integer<unsigned>(bytes[0]) << 8) |
         std::to_integer<unsigned>(bytes[1])
    );
    const auto declared = static_cast<std::size_t>(
        (std::to_integer<unsigned>(bytes[2]) << 8) |
         std::to_integer<unsigned>(bytes[3])
    );
    if (type != 5 || declared > maximum_payload ||
        declared != bytes.size() - header_size) return std::nullopt;
    const auto payload = bytes.subspan(header_size);
    return IpcFrame{type, {payload.begin(), payload.end()}};
}`
    },
    {
      title: "Verify exact framing and owned lifetime",
      language: "cpp",
      blurb: "A complete frame survives destruction of its source buffer, while truncated and trailing-byte frames are rejected.",
      code: String.raw`#include <array>

int test_owned_ipc_frame() {
    std::optional<IpcFrame> parsed;
    {
        const std::array packet{
            std::byte{0}, std::byte{5}, std::byte{0}, std::byte{2},
            std::byte{1}, std::byte{2}
        };
        parsed = parse_ipc_frame(packet);
    }
    if (!parsed || parsed->payload.size() != 2 ||
        parsed->payload[1] != std::byte{2}) return 1;
    const std::array truncated{
        std::byte{0}, std::byte{5}, std::byte{0}, std::byte{2}, std::byte{1}
    };
    if (parse_ipc_frame(truncated)) return 2;
    const std::array trailing{
        std::byte{0}, std::byte{5}, std::byte{0}, std::byte{1},
        std::byte{1}, std::byte{2}
    };
    return parse_ipc_frame(trailing) ? 3 : 0;
}`
    }
  ]
};
