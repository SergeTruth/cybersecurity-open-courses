window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Concurrent Queues and Producer-Consumer Patterns to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Implement a bounded blocking queue with close state",
      "language": "cpp",
      "blurb": "Capacity bounds memory, predicates handle wakeups, and closing wakes both producers and consumers for deterministic shutdown.",
      "code": "#include <condition_variable>\n#include <cstddef>\n#include <mutex>\n#include <optional>\n#include <queue>\n#include <stdexcept>\n#include <utility>\n\ntemplate<class T>\nclass BoundedQueue {\n    const std::size_t capacity_;\n    std::mutex mutex_;\n    std::condition_variable changed_;\n    std::queue<T> items_;\n    bool closed_ = false;\npublic:\n    explicit BoundedQueue(std::size_t capacity) : capacity_(capacity) {\n        if (capacity == 0) throw std::invalid_argument(\"queue capacity is zero\");\n    }\n    bool push(T value) {\n        std::unique_lock lock(mutex_);\n        changed_.wait(lock, [&] { return closed_ || items_.size() < capacity_; });\n        if (closed_) return false;\n        items_.push(std::move(value));\n        changed_.notify_all();\n        return true;\n    }\n    std::optional<T> pop() {\n        std::unique_lock lock(mutex_);\n        changed_.wait(lock, [&] { return closed_ || !items_.empty(); });\n        if (items_.empty()) return std::nullopt;\n        T value = std::move(items_.front());\n        items_.pop();\n        changed_.notify_all();\n        return value;\n    }\n    void close() {\n        std::lock_guard lock(mutex_);\n        closed_ = true;\n        changed_.notify_all();\n    }\n};\n"
    },
    {
      "title": "Return one atomic result from nonblocking submission",
      "language": "cpp",
      "blurb": "The queue checks close state and capacity under one mutex, so a failed submission cannot be misreported by a separate check/use sequence.",
      "code": "#include <cstddef>\n#include <mutex>\n#include <queue>\n#include <stdexcept>\n#include <utility>\n\nenum class PushResult { accepted, full, closed };\n\ntemplate<class T>\nclass TryQueue {\n    const std::size_t capacity_;\n    std::mutex mutex_;\n    std::queue<T> items_;\n    bool closed_ = false;\npublic:\n    explicit TryQueue(std::size_t capacity) : capacity_(capacity) {\n        if (capacity == 0) throw std::invalid_argument(\"queue capacity is zero\");\n    }\n    PushResult try_push(T value) {\n        std::lock_guard lock(mutex_);\n        if (closed_) return PushResult::closed;\n        if (items_.size() == capacity_) return PushResult::full;\n        items_.push(std::move(value));\n        return PushResult::accepted;\n    }\n    void close() {\n        std::lock_guard lock(mutex_);\n        closed_ = true;\n    }\n};\n"
    }
  ]
};
