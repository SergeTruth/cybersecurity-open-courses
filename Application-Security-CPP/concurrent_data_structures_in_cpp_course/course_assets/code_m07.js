window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Atomics and Lock-Free Structures at a Safe Level to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Use a single-producer single-consumer ring with explicit ordering",
      "language": "cpp",
      "blurb": "Release publishes a written slot, acquire observes it, and one reserved position distinguishes full from empty.",
      "code": "#include <array>\n#include <atomic>\n#include <cstddef>\n#include <optional>\n#include <utility>\n\ntemplate<class T, std::size_t N>\nclass SpscQueue {\n    static_assert(N > 1);\n    std::array<T, N> values_{};\n    std::atomic<std::size_t> head_{0};\n    std::atomic<std::size_t> tail_{0};\npublic:\n    bool push(T value) {\n        const auto head = head_.load(std::memory_order_relaxed);\n        const auto next = (head + 1) % N;\n        if (next == tail_.load(std::memory_order_acquire)) return false;\n        values_[head] = std::move(value);\n        head_.store(next, std::memory_order_release);\n        return true;\n    }\n    std::optional<T> pop() {\n        const auto tail = tail_.load(std::memory_order_relaxed);\n        if (tail == head_.load(std::memory_order_acquire)) return std::nullopt;\n        T value = std::move(values_[tail]);\n        tail_.store((tail + 1) % N, std::memory_order_release);\n        return value;\n    }\n};\n"
    },
    {
      "title": "Prefer a mutex when lock-free assumptions are absent",
      "language": "cpp",
      "blurb": "The stack documents blocking behavior and avoids a custom reclamation algorithm for a compound container invariant.",
      "code": "#include <mutex>\n#include <optional>\n#include <vector>\n#include <utility>\n\ntemplate<class T>\nclass SafeStack {\n    std::mutex mutex_;\n    std::vector<T> values_;\npublic:\n    void push(T value) {\n        std::lock_guard lock(mutex_);\n        values_.push_back(std::move(value));\n    }\n    std::optional<T> pop() {\n        std::lock_guard lock(mutex_);\n        if (values_.empty()) return std::nullopt;\n        T value = std::move(values_.back());\n        values_.pop_back();\n        return value;\n    }\n};\n"
    }
  ]
};
