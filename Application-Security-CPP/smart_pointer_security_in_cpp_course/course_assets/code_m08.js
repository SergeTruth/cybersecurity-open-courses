window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "Shared ownership protects lifetime while the object’s mutex separately protects its mutable value.",
  "codeExamples": [
    {
      "title": "Synchronize state shared through shared_ptr",
      "language": "cpp",
      "blurb": "Shared ownership protects lifetime while the object’s mutex separately protects its mutable value.",
      "code": "#include <limits>\n#include <memory>\n#include <mutex>\n#include <thread>\n#include <vector>\n\nclass SharedLedger {\npublic:\n    bool credit(int amount) {\n        const std::lock_guard<std::mutex> lock(mutex_);\n        if ((amount > 0 && cents_ > std::numeric_limits<int>::max() - amount) ||\n            (amount < 0 && cents_ < std::numeric_limits<int>::min() - amount)) return false;\n        cents_ += amount;\n        return true;\n    }\n    int balance() const { const std::lock_guard<std::mutex> lock(mutex_); return cents_; }\nprivate:\n    mutable std::mutex mutex_;\n    int cents_ = 0;\n};\n\nint main() {\n    auto ledger = std::make_shared<SharedLedger>();\n    std::vector<std::jthread> workers;\n    for (int n = 0; n < 5; ++n) workers.emplace_back([ledger] {\n        for (int i = 0; i < 500; ++i) if (!ledger->credit(1)) std::terminate();\n    });\n    workers.clear();\n    if (ledger->balance() != 2500) return 1;\n    if (!ledger->credit(std::numeric_limits<int>::max() - 2500)) return 2;\n    return ledger->credit(1) ? 3 : 0;\n}\n"
    }
  ]
};
