window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). A privileged boundary should construct the child environment from reviewed values rather than subtracting a few known-dangerous variables.",
  "codeExamples": [
    {
      "title": "Construct a minimal privileged child environment",
      "language": "cpp",
      "blurb": "The allowlist excludes loader, interpreter, proxy, and inherited credential variables by construction.",
      "code": "#include <map>\n#include <optional>\n#include <string>\n\nusing Environment = std::map<std::string, std::string>;\n\nstd::optional<Environment> privileged_child_environment(\n    const Environment& source\n) {\n    Environment clean{\n        {\"PATH\", \"/usr/bin:/bin\"},\n        {\"LANG\", \"C.UTF-8\"}\n    };\n    if (const auto it = source.find(\"ORDERS_REGION\"); it != source.end()) {\n        if (it->second != \"us-east-1\" && it->second != \"us-west-2\") {\n            return std::nullopt;\n        }\n        clean.emplace(\"ORDERS_REGION\", it->second);\n    }\n    return clean;\n}"
    },
    {
      "title": "Regression: loader influence and tokens are not inherited",
      "language": "cpp",
      "blurb": "Even unexpected future variables stay outside the deliberately constructed environment.",
      "code": "int test_privileged_environment() {\n    Environment source{\n        {\"ORDERS_REGION\", \"us-east-1\"},\n        {\"LD_PRELOAD\", \"/tmp/injected.so\"},\n        {\"PYTHONPATH\", \"/tmp/modules\"},\n        {\"API_TOKEN\", \"secret\"}\n    };\n    const auto clean = privileged_child_environment(source);\n    if (!clean) return 1;\n    if (clean->contains(\"LD_PRELOAD\") || clean->contains(\"API_TOKEN\")) return 2;\n    if (clean->at(\"PATH\") != \"/usr/bin:/bin\") return 3;\n    return 0;\n}"
    }
  ]
};
