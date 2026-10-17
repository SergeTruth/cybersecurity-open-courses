window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The queue returns an index and resolves it after growth, avoiding vector-reallocation dangling pointers.",
  "codeExamples": [
    {
      "title": "Use stable indexes instead of retained element pointers",
      "language": "cpp",
      "blurb": "The queue returns an index and resolves it after growth, avoiding vector-reallocation dangling pointers.",
      "code": "#include <utility>\n#include <cstddef>\n#include <optional>\n#include <string>\n#include <vector>\n\nclass MessageStore {\npublic:\n    std::size_t add(std::string message) { messages_.push_back(std::move(message)); return messages_.size() - 1; }\n    std::optional<std::string> copy_at(std::size_t index) const {\n        if (index >= messages_.size()) return std::nullopt;\n        return messages_[index];\n    }\nprivate:\n    std::vector<std::string> messages_;\n};\n\nint main() {\n    MessageStore store;\n    const auto first = store.add(\"first\");\n    for (int i = 0; i < 1000; ++i) store.add(\"growth\");\n    const auto value = store.copy_at(first);\n    if (!value || *value != \"first\") return 1;\n    return store.copy_at(1001) ? 2 : 0;\n}\n"
    }
  ]
};
