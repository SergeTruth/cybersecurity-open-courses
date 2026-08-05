window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Authorization consumes a peer identity created only after a platform query authenticates a connected transport handle.",
  "codeExamples": [
    {
      "title": "Derive IPC identity from authenticated transport evidence",
      "language": "cpp",
      "blurb": "Production callers provide a connected native handle, while the application-linked platform query supplies UID and tenant evidence.",
      "code": "#include <cstdint>\n#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nusing NativeTransportHandle = std::uintptr_t;\n\nstruct PlatformPeerEvidence {\n    std::uint32_t uid;\n    std::string tenant;\n};\n\nstd::optional<PlatformPeerEvidence> query_authenticated_peer(\n    NativeTransportHandle connected_transport\n);\n\nclass TrustedPeerAdapter;\n\nclass PeerIdentity {\npublic:\n    std::uint32_t uid() const noexcept { return uid_; }\n    std::string tenant() const { return tenant_; }\n\nprivate:\n    friend class TrustedPeerAdapter;\n    PeerIdentity(std::uint32_t uid, std::string tenant)\n        : uid_(uid), tenant_(std::move(tenant)) {}\n\n    std::uint32_t uid_;\n    std::string tenant_;\n};\n\nclass TrustedPeerAdapter {\npublic:\n    static std::optional<PeerIdentity> authenticate(\n        NativeTransportHandle connected_transport\n    ) {\n        auto evidence = query_authenticated_peer(connected_transport);\n        if (!evidence || evidence->uid == 0 ||\n            (evidence->tenant != \"orders\" &&\n             evidence->tenant != \"analytics\")) {\n            return std::nullopt;\n        }\n        return PeerIdentity(evidence->uid, std::move(evidence->tenant));\n    }\n};\n\nbool authorize_ipc(\n    const PeerIdentity& peer,\n    std::string_view operation\n) {\n    if (peer.tenant() != \"orders\") return false;\n    if (operation == \"status.read\") {\n        return peer.uid() == 1001 || peer.uid() == 1002;\n    }\n    if (operation == \"orders.cancel\") return peer.uid() == 1001;\n    return false;\n}\n"
    },
    {
      "title": "Test the adapter through transport handles, not identity values",
      "language": "cpp",
      "blurb": "The test-only platform-query definition maps connected handles to evidence; production links an OS socket or named-pipe credential query instead.",
      "code": "std::optional<PlatformPeerEvidence> query_authenticated_peer(\n    NativeTransportHandle connected_transport\n) {\n    if (connected_transport == 41) {\n        return PlatformPeerEvidence{1001, \"orders\"};\n    }\n    if (connected_transport == 42) {\n        return PlatformPeerEvidence{1002, \"orders\"};\n    }\n    if (connected_transport == 90) {\n        return PlatformPeerEvidence{1001, \"analytics\"};\n    }\n    return std::nullopt;\n}\n\nint main() {\n    auto operator_peer = TrustedPeerAdapter::authenticate(41);\n    auto reader_peer = TrustedPeerAdapter::authenticate(42);\n    auto outsider = TrustedPeerAdapter::authenticate(90);\n    if (!operator_peer || !reader_peer || !outsider) return 1;\n    if (!authorize_ipc(*operator_peer, \"orders.cancel\")) return 2;\n    if (authorize_ipc(*reader_peer, \"orders.cancel\")) return 3;\n    if (authorize_ipc(*outsider, \"status.read\")) return 4;\n    if (TrustedPeerAdapter::authenticate(999)) return 5;\n    return 0;\n}\n"
    }
  ]
};
