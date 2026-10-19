window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "C++20. A single-owner audit buffer uses fixed storage, reports overflow, and returns bounded owned batches. It is not durable storage or a background logging service; the application must drain it and handle failed admission explicitly.",
  "codeExamples": [
    {
      "title": "Bound structured privilege-boundary audit records",
      "language": "cpp",
      "blurb": "At most 64 records are retained without heap growth. A full buffer rejects the new record and counts loss with saturation; draining returns one fixed-size batch and resets the buffer.",
      "code": "#include <array>\n#include <cstddef>\n#include <cstdint>\n#include <limits>\n\nenum class Decision { allowed, denied };\nenum class Reason { policy_match, peer_rejected, operation_rejected };\n\nstruct BrokerAuditEvent {\n    std::uint32_t peer_user;\n    std::uint16_t operation;\n    Decision decision;\n    Reason reason;\n};\n\n// Single-owner/event-loop buffer, not a durable audit repository.\n// Drain periodically into protected storage outside the request handler.\n// false means loss: the service must apply its explicit overflow policy,\n// e.g. deny audit-required privileged work rather than silently proceeding.\nclass BrokerAuditLog {\npublic:\n    static constexpr std::size_t capacity = 64;\n    struct Batch {\n        std::array<BrokerAuditEvent, capacity> events{};\n        std::size_t size = 0;\n        std::uint64_t dropped = 0;\n    };\n\n    bool record(BrokerAuditEvent event) noexcept {\n        if (pending_.size == capacity) {\n            if (pending_.dropped != std::numeric_limits<std::uint64_t>::max()) {\n                ++pending_.dropped;\n            }\n            return false;\n        }\n        pending_.events[pending_.size++] = event;\n        return true;\n    }\n\n    Batch drain() noexcept {\n        const Batch result = pending_;\n        pending_ = {};\n        return result;\n    }\n\nprivate:\n    Batch pending_;\n};\n"
    },
    {
      "title": "Test capacity, overflow reporting, and reuse",
      "language": "cpp",
      "blurb": "Fill the buffer, verify the next record is rejected and counted, drain it, and confirm reuse does not mutate a previously returned batch.",
      "code": "int test_broker_audit_event() {\n    BrokerAuditLog log;\n    const BrokerAuditEvent denied{2002, 6, Decision::denied, Reason::peer_rejected};\n    for (std::size_t i = 0; i < BrokerAuditLog::capacity; ++i) {\n        if (!log.record(denied)) return 1;\n    }\n    if (log.record(denied)) return 2;\n    const auto batch = log.drain();\n    if (batch.size != BrokerAuditLog::capacity || batch.dropped != 1) return 3;\n    for (std::size_t i = 0; i < batch.size; ++i) {\n        if (batch.events[i].decision != Decision::denied ||\n            batch.events[i].reason != Reason::peer_rejected) return 4;\n    }\n    if (log.drain().size != 0 || !log.record(denied)) return 5;\n    const auto next = log.drain();\n    if (next.size != 1 || next.dropped != 0) return 6;\n    return batch.size == BrokerAuditLog::capacity ? 0 : 7;\n}\n"
    }
  ]
};
