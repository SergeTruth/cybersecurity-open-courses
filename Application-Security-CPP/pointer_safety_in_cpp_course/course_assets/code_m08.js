window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Stored callbacks recheck weak lifetime at invocation, while jthread makes partial worker construction and scope exit safe.",
  "codeExamples": [
    {
      "title": "Capture a weak target in a stored callback",
      "language": "cpp",
      "blurb": "The weak pointer protects lifetime, and the atomic counter permits concurrent callback invocation without shared non-atomic mutation.",
      "code": "#include <atomic>\n#include <functional>\n#include <memory>\n\nclass StoredTarget {\npublic:\n    void record() noexcept {\n        calls_.fetch_add(1, std::memory_order_relaxed);\n    }\n\n    int calls() const noexcept {\n        return calls_.load(std::memory_order_relaxed);\n    }\n\nprivate:\n    std::atomic<int> calls_{0};\n};\n\nstd::function<bool()> make_stored_callback(\n    const std::shared_ptr<StoredTarget>& target\n) {\n    const std::weak_ptr<StoredTarget> weak = target;\n    return [weak] {\n        auto locked = weak.lock();\n        if (!locked) return false;\n        locked->record();\n        return true;\n    };\n}"
    },
    {
      "title": "Use jthread for exception-safe worker startup",
      "language": "cpp",
      "blurb": "Every successfully created worker is automatically joined if a later construction throws, and deferred invocation still rejects an expired target.",
      "code": "#include <thread>\n#include <vector>\n\nint test_stored_callback_lifetime() {\n    auto target = std::make_shared<StoredTarget>();\n    auto callback = make_stored_callback(target);\n    {\n        std::vector<std::jthread> workers;\n        for (int index = 0; index < 4; ++index) {\n            workers.emplace_back([&callback] {\n                (void)callback();\n            });\n        }\n    }\n    if (target->calls() != 4) return 1;\n    target.reset();\n    if (callback()) return 2;\n    return 0;\n}"
    }
  ]
};
