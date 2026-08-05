window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authentication, Integrity, and Replay Controls to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Keep cryptographic verification outside the byte parser",
      "language": "cpp",
      "blurb": "An approved authentication component must verify the exact header and payload before the dispatcher treats fields as trusted.",
      "code": "#include <cstddef>\n#include <span>\n\nclass Authenticator {\npublic:\n    virtual ~Authenticator() = default;\n    virtual bool verify(std::span<const std::byte> authenticated_bytes,\n                        std::span<const std::byte> tag) const noexcept = 0;\n};\n\nbool authenticated_frame(\n    const Authenticator& authenticator,\n    std::span<const std::byte> header_and_payload,\n    std::span<const std::byte> tag) {\n    if (tag.size() != 32 || header_and_payload.size() > 65'536) return false;\n    return authenticator.verify(header_and_payload, tag);\n}\n"
    },
    {
      "title": "Reject replayed sequence numbers with a bounded window",
      "language": "cpp",
      "blurb": "The receiver accepts forward progress and a limited set of unseen older packets without storing an unbounded history.",
      "code": "#include <cstdint>\n\nclass ReplayWindow {\n    std::uint64_t highest_ = 0;\n    std::uint64_t seen_ = 0;\npublic:\n    bool accept(std::uint64_t sequence) noexcept {\n        if (sequence > highest_) {\n            const auto shift = sequence - highest_;\n            seen_ = shift >= 64 ? 1 : (seen_ << shift) | 1;\n            highest_ = sequence;\n            return true;\n        }\n        const auto distance = highest_ - sequence;\n        if (distance >= 64) return false;\n        const std::uint64_t bit = 1ULL << distance;\n        if ((seen_ & bit) != 0) return false;\n        seen_ |= bit;\n        return true;\n    }\n};\n"
    }
  ]
};
