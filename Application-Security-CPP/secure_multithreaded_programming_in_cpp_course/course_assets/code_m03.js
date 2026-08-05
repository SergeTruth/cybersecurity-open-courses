window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A ledger protects one documented invariant with one RAII lock.",
  "codeExamples": [
    {
      "title": "Apply and observe ledger changes under the same mutex",
      "language": "cpp",
      "blurb": "Both mutation and snapshot operations lock the balance that the mutex owns.",
      "code": "#include <cstdint>\n#include <mutex>\n#include <optional>\n\nclass AccountLedger {\npublic:\n    explicit AccountLedger(std::int64_t opening) : cents_(opening) {}\n    bool debit(std::int64_t amount) {\n        if (amount <= 0) return false;\n        std::lock_guard lock(mutex_);\n        if (amount > cents_) return false;\n        cents_ -= amount;\n        return true;\n    }\n    std::int64_t balance() const {\n        std::lock_guard lock(mutex_);\n        return cents_;\n    }\nprivate:\n    mutable std::mutex mutex_;\n    std::int64_t cents_;\n};\n"
    },
    {
      "title": "Exercise concurrent debits without losing the invariant",
      "language": "cpp",
      "blurb": "Threads perform bounded operations and the final explicit check remains active in Release builds.",
      "code": "#include <thread>\n\nint main() {\n    AccountLedger ledger(1000);\n    std::jthread first([&] { for (int i = 0; i < 100; ++i) ledger.debit(3); });\n    std::jthread second([&] { for (int i = 0; i < 100; ++i) ledger.debit(2); });\n    first.join();\n    second.join();\n    if (ledger.balance() != 500) return 1;\n    if (ledger.debit(501)) return 2;\n    return 0;\n}\n"
    }
  ]
};
