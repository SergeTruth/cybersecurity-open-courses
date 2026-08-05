window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Associative-container growth is bounded by an application-owned registry policy.",
  "codeExamples": [
    {
      "title": "Insert session metadata under a hard capacity",
      "language": "cpp",
      "blurb": "The registry rejects invalid capacity before allocation, then rejects duplicate identifiers, oversized keys, and entries beyond its limit.",
      "code": "#include <cstddef>\n#include <string>\n#include <stdexcept>\n#include <string_view>\n#include <unordered_map>\n#include <utility>\n\nclass SessionRegistry {\npublic:\n    explicit SessionRegistry(std::size_t capacity)\n        : capacity_(capacity) {\n        if (capacity == 0 || capacity > 1024) {\n            throw std::invalid_argument(\"session registry capacity rejected\");\n        }\n        entries_.reserve(capacity);\n    }\n    bool insert(std::string id, unsigned generation) {\n        if (id.empty() || id.size() > 48 || generation == 0 || entries_.size() >= capacity_) return false;\n        return entries_.emplace(std::move(id), generation).second;\n    }\n    bool erase(std::string_view id) { return entries_.erase(std::string(id)) == 1; }\n    std::size_t size() const noexcept { return entries_.size(); }\nprivate:\n    std::size_t capacity_;\n    std::unordered_map<std::string, unsigned> entries_;\n};\n"
    },
    {
      "title": "Verify duplicate and capacity behavior",
      "language": "cpp",
      "blurb": "The regression proves invalid capacity is rejected before reserve while duplicates and full-capacity insertion remain rejected.",
      "code": "#include <limits>\n\nint main() {\n    try {\n        SessionRegistry invalid(0);\n        return 1;\n    } catch (const std::invalid_argument&) {\n    }\n    try {\n        SessionRegistry excessive(\n            std::numeric_limits<std::size_t>::max()\n        );\n        return 2;\n    } catch (const std::invalid_argument&) {\n    }\n\n    SessionRegistry registry(2);\n    if (!registry.insert(\"session-a\", 1) ||\n        !registry.insert(\"session-b\", 1)) return 3;\n    if (registry.insert(\"session-c\", 1)) return 4;\n    if (!registry.erase(\"session-a\") ||\n        !registry.insert(\"session-c\", 2)) return 5;\n    if (registry.insert(\"session-c\", 3) ||\n        registry.size() != 2) return 6;\n    return 0;\n}\n"
    }
  ]
};
