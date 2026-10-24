window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Thread Safety and Concurrency Contracts to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Return owned cache values after releasing a shared lock",
      "language": "cpp",
      "blurb": "Readers may run together, writers remain exclusive, and no reference escapes to mutable protected storage.",
      "code": "#include <optional>\n#include <shared_mutex>\n#include <mutex>\n#include <string>\n#include <unordered_map>\n#include <utility>\n\nclass LibraryCache {\n    mutable std::shared_mutex mutex_;\n    std::unordered_map<int, std::string> values_;\npublic:\n    std::optional<std::string> get(int key) const {\n        std::shared_lock lock(mutex_);\n        const auto it = values_.find(key);\n        return it == values_.end() ? std::nullopt\n                                   : std::optional<std::string>(it->second);\n    }\n    void put(int key, std::string value) {\n        std::unique_lock lock(mutex_);\n        values_.insert_or_assign(key, std::move(value));\n    }\n};\n"
    },
    {
      "title": "Keep callbacks outside the library lock",
      "language": "cpp",
      "blurb": "The library copies the callback under synchronization and invokes it afterward, avoiding reentrant deadlock and long critical sections.",
      "code": "#include <functional>\n#include <mutex>\n#include <utility>\n\nclass Notifier {\n    std::mutex mutex_;\n    std::function<void(int)> callback_;\npublic:\n    void set(std::function<void(int)> callback) {\n        std::lock_guard lock(mutex_);\n        callback_ = std::move(callback);\n    }\n    void notify(int value) {\n        std::function<void(int)> copy;\n        { std::lock_guard lock(mutex_); copy = callback_; }\n        if (copy) copy(value);\n    }\n};\n"
    }
  ]
};
