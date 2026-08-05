window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Atomic Loads, Stores, and Read-Modify-Write to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Use fetch_add for an independent counter",
      "language": "cpp",
      "blurb": "The counter has no associated payload invariant, so a relaxed read-modify-write is sufficient and documented.",
      "code": "#include <atomic>\n#include <cstdint>\n\nclass Metrics {\n    std::atomic<std::uint64_t> accepted_{0};\npublic:\n    void record_accept() noexcept {\n        accepted_.fetch_add(1, std::memory_order_relaxed);\n    }\n    std::uint64_t accepted() const noexcept {\n        return accepted_.load(std::memory_order_relaxed);\n    }\n};\n"
    },
    {
      "title": "Use exchange to claim one-time work",
      "language": "cpp",
      "blurb": "Only the first thread observes false and performs the refresh; later callers return without duplicating it.",
      "code": "#include <atomic>\n\nclass RefreshGate {\n    std::atomic<bool> claimed_{false};\npublic:\n    bool try_claim() noexcept {\n        return !claimed_.exchange(true, std::memory_order_acq_rel);\n    }\n};\n"
    }
  ]
};
