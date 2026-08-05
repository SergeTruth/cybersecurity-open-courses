window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Iterators, References, and Snapshot Semantics to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Make snapshot lifetime independent of the lock",
      "language": "cpp",
      "blurb": "The returned vector owns its elements, so later mutation cannot invalidate the caller's iteration.",
      "code": "#include <mutex>\n#include <vector>\n\nclass ConcurrentValues {\n    mutable std::mutex mutex_;\n    std::vector<int> values_;\npublic:\n    std::vector<int> snapshot() const {\n        std::lock_guard lock(mutex_);\n        return values_;\n    }\n    void append(int value) {\n        std::lock_guard lock(mutex_);\n        values_.push_back(value);\n    }\n};\n"
    },
    {
      "title": "Invoke visitors only after releasing the map lock",
      "language": "cpp",
      "blurb": "The map supports insertion, copies the selected value under lock, and runs caller-controlled code afterward to avoid reentrant deadlock.",
      "code": "#include <functional>\n#include <mutex>\n#include <optional>\n#include <string>\n#include <unordered_map>\n#include <utility>\n\nclass VisitableMap {\n    std::mutex mutex_;\n    std::unordered_map<int, std::string> values_;\npublic:\n    void put(int key, std::string value) {\n        std::lock_guard lock(mutex_);\n        values_.insert_or_assign(key, std::move(value));\n    }\n\n    bool with_value(\n        int key,\n        const std::function<void(const std::string&)>& visit) {\n        std::optional<std::string> snapshot;\n        {\n            std::lock_guard lock(mutex_);\n            const auto it = values_.find(key);\n            if (it == values_.end()) return false;\n            snapshot = it->second;\n        }\n        visit(*snapshot);\n        return true;\n    }\n};\n"
    }
  ]
};
