window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A bounded queue validates its capacity before any producer can wait on an impossible predicate.",
  "codeExamples": [
    {
      "title": "Coordinate a closeable bounded work queue",
      "language": "cpp",
      "blurb": "The constructor rejects zero or excessive capacity, items have a byte ceiling, and condition predicates handle shutdown without polling.",
      "code": "#include <condition_variable>\n#include <cstddef>\n#include <deque>\n#include <mutex>\n#include <optional>\n#include <stdexcept>\n#include <string>\n#include <utility>\n\nclass WorkQueue {\npublic:\n    explicit WorkQueue(std::size_t capacity) : capacity_(capacity) {\n        if (capacity == 0 || capacity > 1024) {\n            throw std::invalid_argument(\"work queue capacity rejected\");\n        }\n    }\n\n    bool push(std::string item) {\n        if (item.empty() || item.size() > 4096) return false;\n        std::unique_lock lock(mutex_);\n        space_.wait(lock, [&] {\n            return closed_ || queue_.size() < capacity_;\n        });\n        if (closed_) return false;\n        queue_.push_back(std::move(item));\n        data_.notify_one();\n        return true;\n    }\n\n    std::optional<std::string> pop() {\n        std::unique_lock lock(mutex_);\n        data_.wait(lock, [&] { return closed_ || !queue_.empty(); });\n        if (queue_.empty()) return std::nullopt;\n        auto item = std::move(queue_.front());\n        queue_.pop_front();\n        space_.notify_one();\n        return item;\n    }\n\n    void close() {\n        std::lock_guard lock(mutex_);\n        closed_ = true;\n        data_.notify_all();\n        space_.notify_all();\n    }\n\nprivate:\n    std::size_t capacity_;\n    bool closed_ = false;\n    std::deque<std::string> queue_;\n    std::mutex mutex_;\n    std::condition_variable data_;\n    std::condition_variable space_;\n};\n"
    },
    {
      "title": "Verify capacity validation, work conservation, and closure",
      "language": "cpp",
      "blurb": "The regression proves zero capacity fails immediately instead of blocking a producer forever.",
      "code": "#include <thread>\n\nint main() {\n    try {\n        WorkQueue invalid(0);\n        return 1;\n    } catch (const std::invalid_argument&) {\n    }\n\n    WorkQueue queue(1);\n    std::string received;\n    std::jthread consumer([&] {\n        auto item = queue.pop();\n        if (item) received = *item;\n    });\n    if (!queue.push(\"job-1\")) return 2;\n    consumer.join();\n    if (received != \"job-1\") return 3;\n    if (queue.push(std::string(4097, 'x'))) return 4;\n    queue.close();\n    if (queue.push(\"late\") || queue.pop()) return 5;\n    return 0;\n}\n"
    }
  ]
};
