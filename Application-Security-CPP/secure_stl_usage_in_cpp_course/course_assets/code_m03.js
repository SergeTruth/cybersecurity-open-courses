window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Container mutation uses indexes and reacquires references after potential reallocation.",
  "codeExamples": [
    {
      "title": "Append while preserving the selected element by index",
      "language": "cpp",
      "blurb": "The function records a validated index, mutates the vector, and then reacquires access from the current storage.",
      "code": "#include <cstddef>\n#include <optional>\n#include <string>\n#include <utility>\n#include <vector>\n\nstd::optional<std::string> append_and_select(\n    std::vector<std::string>& values,\n    std::size_t selected,\n    std::string appended\n) {\n    if (selected >= values.size() || values.size() >= 1024 || appended.size() > 64) return std::nullopt;\n    values.push_back(std::move(appended));\n    return values[selected];\n}\n"
    },
    {
      "title": "Force reallocation without retaining a stale iterator",
      "language": "cpp",
      "blurb": "The regression reserves one element, appends another, and checks the reacquired value explicitly.",
      "code": "int main() {\n    std::vector<std::string> values;\n    values.reserve(1);\n    values.push_back(\"first\");\n    auto selected = append_and_select(values, 0, \"second\");\n    if (!selected || *selected != \"first\" || values.size() != 2) return 1;\n    if (append_and_select(values, 3, \"third\")) return 2;\n    return 0;\n}\n"
    }
  ]
};
