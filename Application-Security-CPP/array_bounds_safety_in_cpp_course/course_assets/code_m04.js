window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Indexing, Iteration, and Range-Based Access to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Prefer range iteration when indexes are unnecessary",
      "language": "cpp",
      "blurb": "The loop cannot accidentally use an inclusive upper bound or a mismatched container size.",
      "code": "#include <string>\n#include <vector>\n\nvoid normalize(std::vector<std::string>& names) {\n    for (std::string& name : names) {\n        if (name.size() > 64) name.resize(64);\n    }\n}\n"
    },
    {
      "title": "Use checked indexing at a trust boundary",
      "language": "cpp",
      "blurb": "External positions are range-checked before access and the optional result makes rejection explicit.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n\nstd::optional<int> selected_value(\n    std::span<const int> values, std::size_t external_index) {\n    if (external_index >= values.size()) return std::nullopt;\n    return values[external_index];\n}\n"
    }
  ]
};
