window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A per-connection sequence tracker rejects replayed, skipped, and post-close commands.",
  "codeExamples": [
    {
      "title": "Enforce IPC ordering with an explicit connection state",
      "language": "cpp",
      "blurb": "The tracker accepts the next sequence number only, closes at numeric exhaustion, and records terminal protocol closure.",
      "code": "#include <cstdint>\n#include <limits>\n#include <optional>\n\nstd::optional<std::uint64_t> following_sequence(\n    std::uint64_t current\n) noexcept {\n    if (current == std::numeric_limits<std::uint64_t>::max()) {\n        return std::nullopt;\n    }\n    return current + 1;\n}\n\nclass IpcSequence {\npublic:\n    bool accept(std::uint64_t sequence) noexcept {\n        if (closed_ || sequence != next_) return false;\n        auto following = following_sequence(sequence);\n        if (!following) {\n            closed_ = true;\n            return true;\n        }\n        next_ = *following;\n        return true;\n    }\n    bool close(std::uint64_t final_sequence) noexcept {\n        if (!accept(final_sequence)) return false;\n        closed_ = true;\n        return true;\n    }\nprivate:\n    std::uint64_t next_ = 1;\n    bool closed_ = false;\n};\n"
    },
    {
      "title": "Reject replay, gaps, and work after close",
      "language": "cpp",
      "blurb": "The regression covers replay, skipped input, post-close input, and the nonwrapping maximum-sequence boundary.",
      "code": "int main() {\n    IpcSequence sequence;\n    if (!sequence.accept(1)) return 1;\n    if (sequence.accept(1)) return 2;\n    if (sequence.accept(3)) return 3;\n    if (!sequence.close(2)) return 4;\n    if (sequence.accept(3)) return 5;\n    const auto maximum = std::numeric_limits<std::uint64_t>::max();\n    if (following_sequence(maximum)) return 6;\n    auto before_maximum = following_sequence(maximum - 1);\n    if (!before_maximum || *before_maximum != maximum) return 7;\n    return 0;\n}\n"
    }
  ]
};
