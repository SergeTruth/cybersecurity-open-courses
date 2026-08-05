window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A write loop tracks partial progress through a transport contract whose native implementation must suppress SIGPIPE where required.",
  "codeExamples": [
    {
      "title": "Send a complete buffer through a bounded transport contract",
      "language": "cpp",
      "blurb": "The loop handles partial writes, interruption, peer closure, and zero progress without pointer arithmetic overflow.",
      "code": "#include <cstddef>\n#include <span>\n\nenum class SendStatus { progress, interrupted, peer_closed, failed };\nstruct SendResult { SendStatus status; std::size_t bytes; };\n\nclass SocketSender {\npublic:\n    virtual ~SocketSender() = default;\n    virtual SendResult send_some(std::span<const std::byte> bytes) noexcept = 0;\n};\n\nbool send_all(SocketSender& sender, std::span<const std::byte> bytes) noexcept {\n    std::size_t offset = 0;\n    unsigned interruptions = 0;\n    while (offset < bytes.size()) {\n        auto result = sender.send_some(bytes.subspan(offset));\n        if (result.status == SendStatus::interrupted && ++interruptions <= 16) continue;\n        if (result.status != SendStatus::progress || result.bytes == 0 || result.bytes > bytes.size() - offset) return false;\n        offset += result.bytes;\n    }\n    return true;\n}\n"
    },
    {
      "title": "Exercise partial progress and closed-peer failure",
      "language": "cpp",
      "blurb": "The scripted adapter proves the loop does not assume one send transfers the whole application buffer.",
      "code": "#include <array>\n#include <deque>\n#include <utility>\n\nclass ScriptedSender final : public SocketSender {\npublic:\n    explicit ScriptedSender(std::deque<SendResult> results) : results_(std::move(results)) {}\n    SendResult send_some(std::span<const std::byte>) noexcept override {\n        if (results_.empty()) return {SendStatus::failed, 0};\n        auto result = results_.front(); results_.pop_front(); return result;\n    }\nprivate: std::deque<SendResult> results_;\n};\nint main() {\n    std::array<std::byte, 5> bytes{};\n    ScriptedSender partial({{SendStatus::progress, 2}, {SendStatus::interrupted, 0}, {SendStatus::progress, 3}});\n    if (!send_all(partial, bytes)) return 1;\n    ScriptedSender closed({{SendStatus::progress, 2}, {SendStatus::peer_closed, 0}});\n    if (send_all(closed, bytes)) return 2;\n    return 0;\n}\n"
    }
  ]
};
