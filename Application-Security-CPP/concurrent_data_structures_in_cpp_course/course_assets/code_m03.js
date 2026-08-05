window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Mutex-Protected Containers and RAII Wrappers to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Encapsulate a vector and its mutex",
      "language": "cpp",
      "blurb": "Callers can append, erase, and copy snapshots, but cannot retain iterators into storage after the lock is released.",
      "code": "#include <algorithm>\n#include <mutex>\n#include <string>\n#include <vector>\n#include <string_view>\n#include <utility>\n\nclass LockedNames {\n    mutable std::mutex mutex_;\n    std::vector<std::string> names_;\npublic:\n    void add(std::string name) {\n        std::lock_guard lock(mutex_);\n        names_.push_back(std::move(name));\n    }\n    bool erase(std::string_view name) {\n        std::lock_guard lock(mutex_);\n        const auto it = std::find(names_.begin(), names_.end(), name);\n        if (it == names_.end()) return false;\n        names_.erase(it);\n        return true;\n    }\n    std::vector<std::string> snapshot() const {\n        std::lock_guard lock(mutex_);\n        return names_;\n    }\n};\n"
    },
    {
      "title": "Make compound account updates one locked operation",
      "language": "cpp",
      "blurb": "The API protects the cross-field invariant inside one critical section rather than exposing separate get and set calls.",
      "code": "#include <cstdint>\n#include <mutex>\n\nclass Quota {\n    std::mutex mutex_;\n    std::uint64_t used_ = 0;\n    std::uint64_t limit_ = 1024;\npublic:\n    bool reserve(std::uint64_t amount) {\n        std::lock_guard lock(mutex_);\n        if (amount > limit_ - used_) return false;\n        used_ += amount;\n        return true;\n    }\n};\n"
    }
  ]
};
