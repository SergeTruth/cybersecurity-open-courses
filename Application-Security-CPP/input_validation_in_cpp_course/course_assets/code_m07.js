window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Apply independent limits to item count, per-item size, and total work before building the accepted result.",
  "codeExamples": [
    {
      "title": "Validate a batch under a cumulative byte budget",
      "language": "cpp",
      "blurb": "The subtraction form avoids overflow while enforcing both local and aggregate limits.",
      "code": "#include <cstddef>\n#include <optional>\n#include <string>\n#include <vector>\n\nstd::optional<std::vector<std::string>> validate_batch(\n    const std::vector<std::string>& input\n) {\n    constexpr std::size_t item_limit = 256;\n    constexpr std::size_t total_limit = 4096;\n    if (input.empty() || input.size() > 32) return std::nullopt;\n    std::size_t total = 0;\n    std::vector<std::string> accepted;\n    accepted.reserve(input.size());\n    for (const auto& item : input) {\n        if (item.empty() || item.size() > item_limit ||\n            item.size() > total_limit - total) {\n            return std::nullopt;\n        }\n        total += item.size();\n        accepted.push_back(item);\n    }\n    return accepted;\n}"
    },
    {
      "title": "Regression: many individually valid values can still exceed the budget",
      "language": "cpp",
      "blurb": "The original input is never partially treated as accepted.",
      "code": "int test_batch_budget() {\n    if (!validate_batch({\"one\", \"two\"})) return 1;\n    std::vector<std::string> too_many(33, \"x\");\n    if (validate_batch(too_many)) return 2;\n    std::vector<std::string> too_large{std::string(257, 'x')};\n    if (validate_batch(too_large)) return 3;\n    return 0;\n}"
    }
  ]
};
