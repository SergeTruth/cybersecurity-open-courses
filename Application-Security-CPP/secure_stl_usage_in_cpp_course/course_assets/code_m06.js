window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "An algorithm receives a valid range and a pure predicate with a documented threshold.",
  "codeExamples": [
    {
      "title": "Select bounded records with a stable predicate",
      "language": "cpp",
      "blurb": "The function validates the output ceiling before using copy_if and does not mutate the source range.",
      "code": "#include <algorithm>\n#include <cstddef>\n#include <optional>\n#include <string>\n#include <vector>\n\nstruct QueueRecord { std::string id; unsigned priority; };\n\nstd::optional<std::vector<QueueRecord>> select_priority_records(\n    const std::vector<QueueRecord>& input,\n    unsigned minimum_priority,\n    std::size_t output_limit\n) {\n    if (minimum_priority > 9 || output_limit > 1024) return std::nullopt;\n    std::vector<QueueRecord> output;\n    output.reserve(std::min(input.size(), output_limit));\n    for (const auto& record : input) {\n        if (record.priority >= minimum_priority) {\n            if (output.size() == output_limit) return std::nullopt;\n            output.push_back(record);\n        }\n    }\n    return output;\n}\n"
    },
    {
      "title": "Reject output growth beyond the reviewed limit",
      "language": "cpp",
      "blurb": "The regression checks a stable selection and a capacity failure without assertion-only behavior.",
      "code": "int main() {\n    std::vector<QueueRecord> records{{\"a\", 2}, {\"b\", 8}, {\"c\", 9}};\n    auto selected = select_priority_records(records, 8, 2);\n    if (!selected || selected->size() != 2 || (*selected)[0].id != \"b\") return 1;\n    if (select_priority_records(records, 8, 1)) return 2;\n    if (select_priority_records(records, 10, 3)) return 3;\n    return 0;\n}\n"
    }
  ]
};
