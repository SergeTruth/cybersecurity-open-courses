window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Socket diagnostics use stable categories and exclude remote payload bytes.",
  "codeExamples": [
    {
      "title": "Create a bounded network-service event",
      "language": "cpp",
      "blurb": "The event rejects invalid enum representations, maps known outcomes to stable categories, and validates an ASCII connection identifier.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nenum class SocketOutcome { accepted, timeout, peer_closed, protocol_rejected, transport_error };\n\nstd::optional<std::string> socket_event(\n    std::string_view connection_id,\n    SocketOutcome outcome\n) {\n    if (connection_id.empty() || connection_id.size() > 32) return std::nullopt;\n    for (unsigned char ch : connection_id) {\n        const bool letter = (ch >= 'A' && ch <= 'Z') ||\n                            (ch >= 'a' && ch <= 'z');\n        const bool digit = ch >= '0' && ch <= '9';\n        if (!letter && !digit && ch != '-') return std::nullopt;\n    }\n    const char* category = nullptr;\n    switch (outcome) {\n        case SocketOutcome::accepted: category = \"accepted\"; break;\n        case SocketOutcome::timeout: category = \"timeout\"; break;\n        case SocketOutcome::peer_closed: category = \"peer_closed\"; break;\n        case SocketOutcome::protocol_rejected: category = \"protocol_rejected\"; break;\n        case SocketOutcome::transport_error:\n            category = \"transport_error\";\n            break;\n        default:\n            return std::nullopt;\n    }\n    return std::string(\"connection=\") + std::string(connection_id) + \" outcome=\" + category;\n}\n"
    },
    {
      "title": "Reject identifier injection while preserving useful categories",
      "language": "cpp",
      "blurb": "The regression checks approved mapping, injected identifiers, excessive identifiers, and invalid enum representations.",
      "code": "int main() {\n    auto event = socket_event(\"conn-27\", SocketOutcome::timeout);\n    if (!event || event->find(\"outcome=timeout\") == std::string::npos) return 1;\n    if (socket_event(\"conn-27\\npayload=secret\", SocketOutcome::accepted)) return 2;\n    if (socket_event(std::string(33, 'x'), SocketOutcome::transport_error)) return 3;\n    if (socket_event(\"conn-27\", static_cast<SocketOutcome>(99))) return 4;\n    return 0;\n}\n"
    }
  ]
};
