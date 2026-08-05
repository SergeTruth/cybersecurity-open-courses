window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A transformation builds a complete replacement before committing it to shared application state.",
  "codeExamples": [
    {
      "title": "Apply an exception-safe record transformation",
      "language": "cpp",
      "blurb": "The function validates every transformed record in temporary storage and swaps only after the full operation succeeds.",
      "code": "#include <cstddef>\n#include <optional>\n#include <string>\n#include <vector>\n#include <utility>\n\nbool normalize_records(std::vector<std::string>& records, std::size_t byte_limit) {\n    std::vector<std::string> replacement;\n    replacement.reserve(records.size());\n    std::size_t total = 0;\n    for (const auto& record : records) {\n        if (record.empty() || record.size() > 64 || total > byte_limit || record.size() > byte_limit - total) return false;\n        std::string normalized = record;\n        for (char& ch : normalized) if (ch >= 'A' && ch <= 'Z') ch = static_cast<char>(ch - 'A' + 'a');\n        total += normalized.size();\n        replacement.push_back(std::move(normalized));\n    }\n    records.swap(replacement);\n    return true;\n}\n"
    },
    {
      "title": "Preserve the original vector when validation fails",
      "language": "cpp",
      "blurb": "The regression checks both successful commit and failure before commit.",
      "code": "int main() {\n    std::vector<std::string> accepted{\"Order-A\", \"Order-B\"};\n    if (!normalize_records(accepted, 20) || accepted[0] != \"order-a\") return 1;\n    std::vector<std::string> rejected{\"KEEP\", std::string(65, 'x')};\n    if (normalize_records(rejected, 100)) return 2;\n    if (rejected[0] != \"KEEP\" || rejected[1].size() != 65) return 3;\n    return 0;\n}\n"
    }
  ]
};
