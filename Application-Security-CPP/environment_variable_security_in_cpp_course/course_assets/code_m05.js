window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Keep secret-bearing names out of general configuration diagnostics and recurse through nested structures when producing an approved view.",
  "codeExamples": [
    {
      "title": "Build diagnostics from an allowlist instead of guessing secret names",
      "language": "cpp",
      "blurb": "Only explicitly public scalar fields are copied; nested credentials never enter the diagnostic object.",
      "code": "#include <map>\n#include <optional>\n#include <string>\n#include <variant>\n\nstruct RuntimeConfig {\n    std::string region;\n    std::string mode;\n    std::string database_password;\n    std::map<std::string, std::string> provider_credentials;\n};\n\nstd::map<std::string, std::string> public_diagnostics(\n    const RuntimeConfig& config\n) {\n    return {\n        {\"region\", config.region},\n        {\"mode\", config.mode}\n    };\n}"
    },
    {
      "title": "Regression: the diagnostic contract cannot expose nested credentials",
      "language": "cpp",
      "blurb": "Adding a new secret field does not make it printable because the output schema is positive and closed.",
      "code": "int test_public_diagnostics() {\n    RuntimeConfig config{\n        \"us-east-1\", \"production\", \"database-secret\",\n        {{\"api_key\", \"provider-secret\"}}\n    };\n    const auto shown = public_diagnostics(config);\n    if (shown.size() != 2) return 1;\n    if (shown.contains(\"database_password\")) return 2;\n    if (shown.contains(\"provider_credentials\")) return 3;\n    return 0;\n}"
    }
  ]
};
