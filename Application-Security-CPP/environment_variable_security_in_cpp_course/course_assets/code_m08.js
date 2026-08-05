window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use an explicit portable ASCII environment-name grammar so different platforms interpret the same deployment manifest consistently.",
  "codeExamples": [
    {
      "title": "Validate portable ASCII environment names",
      "language": "cpp",
      "blurb": "Names follow [A-Z_][A-Z0-9_]*, excluding equals signs, controls, lowercase aliases, and locale-dependent folding.",
      "code": "#include <utility>\n\n#include <map>\n#include <string>\n\nbool portable_environment_name(const std::string& name) {\n    if (name.empty() || name.size() > 64) return false;\n    const auto first = static_cast<unsigned char>(name.front());\n    if (!((first >= static_cast<unsigned char>('A') &&\n           first <= static_cast<unsigned char>('Z')) ||\n          first == static_cast<unsigned char>('_'))) {\n        return false;\n    }\n    for (const char raw : name) {\n        const auto ch = static_cast<unsigned char>(raw);\n        const bool accepted =\n            (ch >= static_cast<unsigned char>('A') &&\n             ch <= static_cast<unsigned char>('Z')) ||\n            (ch >= static_cast<unsigned char>('0') &&\n             ch <= static_cast<unsigned char>('9')) ||\n            ch == static_cast<unsigned char>('_');\n        if (!accepted) return false;\n    }\n    return true;\n}\n\nbool portable_environment_names(\n    const std::map<std::string, std::string>& values\n) {\n    for (const auto& [name, value] : values) {\n        if (!portable_environment_name(name) || value.size() > 4096) {\n            return false;\n        }\n    }\n    return true;\n}"
    },
    {
      "title": "Regression: invalid and case-ambiguous names are rejected",
      "language": "cpp",
      "blurb": "The same manifest is accepted or rejected consistently without consulting the active C locale.",
      "code": "\nint test_portable_environment_names() {\n    if (!portable_environment_names({{\"ORDERS_MODE\", \"production\"}})) return 1;\n    if (portable_environment_names({{\"BAD=NAME\", \"value\"}})) return 2;\n    if (portable_environment_names({{\"orders_mode\", \"production\"}})) return 3;\n    if (portable_environment_names({{\"9ORDERS\", \"production\"}})) return 4;\n    return 0;\n}"
    }
  ]
};
