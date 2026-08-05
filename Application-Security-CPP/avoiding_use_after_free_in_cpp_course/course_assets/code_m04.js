window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Containers, Iterators, and Invalidation to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Return a copy instead of a vector element reference",
      "language": "cpp",
      "blurb": "Later insertion or erase cannot invalidate the caller's independent string value.",
      "code": "#include <optional>\n#include <string>\n#include <vector>\n#include <cstddef>\n\nstd::optional<std::string> name_at(\n    const std::vector<std::string>& names, std::size_t index) {\n    if (index >= names.size()) return std::nullopt;\n    return names[index];\n}\n"
    },
    {
      "title": "Use a stable key rather than retaining a cache iterator",
      "language": "cpp",
      "blurb": "The caller keeps an identifier and performs a fresh lookup after any operation that may rehash or erase entries.",
      "code": "#include <optional>\n#include <string>\n#include <unordered_map>\n#include <utility>\n\nclass Cache {\n    std::unordered_map<int, std::string> values_;\npublic:\n    std::optional<std::string> get(int key) const {\n        const auto it = values_.find(key);\n        return it == values_.end() ? std::nullopt\n                                   : std::optional<std::string>(it->second);\n    }\n    void put(int key, std::string value) { values_.insert_or_assign(key, std::move(value)); }\n};\n"
    }
  ]
};
