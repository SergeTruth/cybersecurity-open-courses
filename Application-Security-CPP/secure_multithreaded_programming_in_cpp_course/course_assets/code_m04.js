window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Account transfers use a deadlock-safe two-lock operation and a regression that proves balances actually move.",
  "codeExamples": [
    {
      "title": "Transfer while locking both accounts consistently",
      "language": "cpp",
      "blurb": "scoped_lock avoids lock-order inversion; identity, funds, and destination-range checks keep the mutation defined.",
      "code": "#include <cstdint>\n#include <limits>\n#include <mutex>\n\nclass TransferAccount {\npublic:\n    explicit TransferAccount(std::int64_t cents) : cents_(cents) {}\n    std::int64_t balance() const {\n        std::lock_guard lock(mutex_);\n        return cents_;\n    }\n    friend bool transfer(TransferAccount&, TransferAccount&, std::int64_t);\nprivate:\n    mutable std::mutex mutex_;\n    std::int64_t cents_;\n};\n\nbool transfer(\n    TransferAccount& source,\n    TransferAccount& destination,\n    std::int64_t cents\n) {\n    if (&source == &destination || cents <= 0) return false;\n    std::scoped_lock lock(source.mutex_, destination.mutex_);\n    if (source.cents_ < cents) return false;\n    if (destination.cents_ >\n        std::numeric_limits<std::int64_t>::max() - cents) {\n        return false;\n    }\n    source.cents_ -= cents;\n    destination.cents_ += cents;\n    return true;\n}\n"
    },
    {
      "title": "Prove opposing concurrent transfers change both balances",
      "language": "cpp",
      "blurb": "The regression exercises opposing lock orders, proves balances move, and rejects overflowing destination balances.",
      "code": "#include <atomic>\n#include <latch>\n#include <limits>\n#include <thread>\n\nint main() {\n    TransferAccount first(1000);\n    TransferAccount second(1000);\n    std::atomic_size_t successes{0};\n    std::latch start(1);\n\n    std::jthread left([&] {\n        start.wait();\n        for (int i = 0; i < 400; ++i) {\n            if (transfer(first, second, 1)) {\n                successes.fetch_add(1, std::memory_order_relaxed);\n            }\n        }\n    });\n\n    try {\n        std::jthread right([&] {\n            start.wait();\n            for (int i = 0; i < 200; ++i) {\n                if (transfer(second, first, 1)) {\n                    successes.fetch_add(1, std::memory_order_relaxed);\n                }\n            }\n        });\n        start.count_down();\n        left.join();\n        right.join();\n    } catch (...) {\n        start.count_down();\n        left.join();\n        return 1;\n    }\n\n    if (successes.load(std::memory_order_relaxed) != 600) return 2;\n    if (first.balance() != 800 || second.balance() != 1200) return 3;\n    if (first.balance() + second.balance() != 2000) return 4;\n    if (transfer(first, first, 1)) return 5;\n\n    TransferAccount one_cent(1);\n    TransferAccount full(std::numeric_limits<std::int64_t>::max());\n    if (transfer(one_cent, full, 1)) return 6;\n    if (one_cent.balance() != 1 ||\n        full.balance() != std::numeric_limits<std::int64_t>::max()) {\n        return 7;\n    }\n    return 0;\n}\n"
    }
  ]
};
