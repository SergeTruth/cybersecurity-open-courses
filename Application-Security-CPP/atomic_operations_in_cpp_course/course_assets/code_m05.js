window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Atomics Versus Mutexes to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Protect a multi-field transfer with one mutex",
      "language": "cpp",
      "blurb": "The invariant spans two balances, making a critical section clearer than several independently atomic values.",
      "code": "#include <cstdint>\n#include <mutex>\n\nstruct Ledger {\n    std::mutex mutex;\n    std::int64_t primary = 1000;\n    std::int64_t reserve = 500;\n\n    bool transfer(std::int64_t amount) {\n        std::lock_guard lock(mutex);\n        if (amount < 0 || amount > primary) return false;\n        primary -= amount;\n        reserve += amount;\n        return true;\n    }\n};\n"
    },
    {
      "title": "Use an atomic only for a single independent flag",
      "language": "cpp",
      "blurb": "The cancellation flag carries no compound payload; worker-owned state remains outside the atomic contract.",
      "code": "#include <atomic>\n\nclass Cancellation {\n    std::atomic<bool> requested_{false};\npublic:\n    void request() noexcept {\n        requested_.store(true, std::memory_order_release);\n    }\n    bool requested() const noexcept {\n        return requested_.load(std::memory_order_acquire);\n    }\n};\n"
    }
  ]
};
