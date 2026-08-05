window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Protocol State, Versions, and Compatibility to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Negotiate only explicitly supported protocol versions",
      "language": "cpp",
      "blurb": "The server selects a reviewed common version and rejects unknown values instead of guessing their meaning.",
      "code": "#include <algorithm>\n#include <array>\n#include <cstdint>\n#include <optional>\n#include <span>\n\nstd::optional<std::uint16_t> negotiate(\n    std::span<const std::uint16_t> offered) {\n    constexpr std::array<std::uint16_t, 2> supported{3, 2};\n    for (auto version : supported) {\n        if (std::find(offered.begin(), offered.end(), version) != offered.end()) {\n            return version;\n        }\n    }\n    return std::nullopt;\n}\n"
    },
    {
      "title": "Reject messages that are invalid for session state",
      "language": "cpp",
      "blurb": "Parsing a known message type is not enough; the state machine admits it only in the expected authenticated phase.",
      "code": "enum class SessionState { negotiating, authenticated, closed };\nenum class MessageType { hello, order, goodbye };\n\nbool allowed(SessionState state, MessageType type) noexcept {\n    switch (state) {\n        case SessionState::negotiating:\n            return type == MessageType::hello;\n        case SessionState::authenticated:\n            return type == MessageType::order || type == MessageType::goodbye;\n        case SessionState::closed:\n            return false;\n    }\n    return false;\n}\n"
    }
  ]
};
