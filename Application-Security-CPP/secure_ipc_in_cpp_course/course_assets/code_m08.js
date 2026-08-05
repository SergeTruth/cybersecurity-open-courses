window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "IPC audit events record bounded operational metadata without message payloads.",
  "codeExamples": [
    {
      "title": "Create a low-cardinality IPC audit event",
      "language": "cpp",
      "blurb": "Private state and an allowlisted factory keep injected identifiers and attacker-selected categories out of telemetry.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nclass IpcAuditEvent {\npublic:\n    std::string peer() const { return peer_; }\n    std::string action() const { return action_; }\n    std::string outcome() const { return outcome_; }\nprivate:\n    IpcAuditEvent(\n        std::string peer,\n        std::string action,\n        std::string outcome\n    ) : peer_(std::move(peer)),\n        action_(std::move(action)),\n        outcome_(std::move(outcome)) {}\n    friend std::optional<IpcAuditEvent> make_ipc_event(\n        std::string_view,\n        std::string_view,\n        std::string_view\n    );\n    std::string peer_;\n    std::string action_;\n    std::string outcome_;\n};\n\nstd::optional<IpcAuditEvent> make_ipc_event(\n    std::string_view peer,\n    std::string_view action,\n    std::string_view outcome\n) {\n    if (peer.empty() || peer.size() > 32) return std::nullopt;\n    for (unsigned char ch : peer) {\n        const bool letter = (ch >= 'A' && ch <= 'Z') ||\n                            (ch >= 'a' && ch <= 'z');\n        const bool digit = ch >= '0' && ch <= '9';\n        if (!letter && !digit && ch != '-') return std::nullopt;\n    }\n    if (action != \"connect\" && action != \"request\" &&\n        action != \"disconnect\") return std::nullopt;\n    if (outcome != \"accepted\" && outcome != \"rejected\" &&\n        outcome != \"error\") return std::nullopt;\n    return IpcAuditEvent(\n        std::string(peer),\n        std::string(action),\n        std::string(outcome)\n    );\n}\n"
    },
    {
      "title": "Keep payloads and attacker-selected categories out of telemetry",
      "language": "cpp",
      "blurb": "The regression proves direct construction is unavailable and checks injected identifiers and unknown outcomes.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_aggregate_v<IpcAuditEvent>);\nstatic_assert(!std::is_constructible_v<\n    IpcAuditEvent,\n    std::string,\n    std::string,\n    std::string\n>);\n\nint main() {\n    auto event = make_ipc_event(\"uid-1001\", \"request\", \"accepted\");\n    if (!event || event->peer() != \"uid-1001\") return 1;\n    if (make_ipc_event(\n        \"uid-1\\npayload=secret\",\n        \"request\",\n        \"rejected\")) return 2;\n    if (make_ipc_event(\n        \"uid-1001\",\n        \"request\",\n        \"timeout-734\")) return 3;\n    return 0;\n}\n"
    }
  ]
};
