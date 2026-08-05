window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Maps, Caches, and Reader-Writer Access to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Return owned cache values under a shared mutex",
      "language": "cpp",
      "blurb": "Concurrent readers copy values while protected, and writers replace entries exclusively without exposing internal references.",
      "code": "#include <mutex>\n#include <optional>\n#include <shared_mutex>\n#include <string>\n#include <unordered_map>\n#include <utility>\n\nclass ConcurrentCache {\n    mutable std::shared_mutex mutex_;\n    std::unordered_map<int, std::string> entries_;\npublic:\n    std::optional<std::string> get(int key) const {\n        std::shared_lock lock(mutex_);\n        const auto it = entries_.find(key);\n        return it == entries_.end() ? std::nullopt\n                                    : std::optional<std::string>(it->second);\n    }\n    void put(int key, std::string value) {\n        std::unique_lock lock(mutex_);\n        entries_.insert_or_assign(key, std::move(value));\n    }\n};\n"
    },
    {
      "title": "Bound cache growth during insertion",
      "language": "cpp",
      "blurb": "Eviction and insertion occur under one exclusive lock so the size invariant remains true for every observer.",
      "code": "#include <list>\n#include <mutex>\n#include <string>\n#include <unordered_map>\n#include <cstddef>\n#include <utility>\n\nclass BoundedCache {\n    static constexpr std::size_t capacity = 128;\n    std::mutex mutex_;\n    std::list<int> order_;\n    std::unordered_map<int, std::string> values_;\npublic:\n    void put(int key, std::string value) {\n        std::lock_guard lock(mutex_);\n        if (!values_.contains(key) && values_.size() == capacity) {\n            values_.erase(order_.front());\n            order_.pop_front();\n        }\n        if (!values_.contains(key)) order_.push_back(key);\n        values_.insert_or_assign(key, std::move(value));\n    }\n};\n"
    }
  ]
};
