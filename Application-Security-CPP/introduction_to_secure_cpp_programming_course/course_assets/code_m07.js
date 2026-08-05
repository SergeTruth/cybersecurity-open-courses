window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Protect one nonnegative-balance invariant with construction validation and a single synchronization boundary.",
  "codeExamples": [
    {
      "title": "Construct and synchronize a nonnegative account balance",
      "language": "cpp",
      "blurb": "The constructor rejects invalid initial state; debit and snapshot then preserve the same invariant under one mutex.",
      "code": "\n#include <cstdint>\n#include <mutex>\n#include <stdexcept>\n\nclass AccountBalance {\npublic:\n    explicit AccountBalance(std::int64_t cents) : cents_(cents) {\n        if (cents < 0) {\n            throw std::invalid_argument(\"negative initial balance\");\n        }\n    }\n    bool debit(std::int64_t cents) {\n        if (cents <= 0) return false;\n        std::scoped_lock lock{mutex_};\n        if (cents > cents_) return false;\n        cents_ -= cents;\n        return true;\n    }\n    std::int64_t snapshot() const {\n        std::scoped_lock lock{mutex_};\n        return cents_;\n    }\nprivate:\n    mutable std::mutex mutex_;\n    std::int64_t cents_;\n};"
    },
    {
      "title": "Regression: invalid construction and overdraft preserve the invariant",
      "language": "cpp",
      "blurb": "Negative initial state is impossible, and a failed debit leaves the synchronized snapshot unchanged.",
      "code": "\nint test_account_balance() {\n    try {\n        AccountBalance invalid{-1};\n        return 1;\n    } catch (const std::invalid_argument&) {\n    }\n    AccountBalance balance{100};\n    if (!balance.debit(40)) return 2;\n    if (balance.snapshot() != 60) return 3;\n    if (balance.debit(70)) return 4;\n    if (balance.snapshot() != 60) return 5;\n    return 0;\n}"
    }
  ]
};
