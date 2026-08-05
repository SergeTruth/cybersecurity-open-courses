window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Bind both executable selection and inherited variables before a child crosses the process boundary.",
  "codeExamples": [
    {
      "title": "Prepare an absolute program and exact environment",
      "language": "cpp",
      "blurb": "The launch plan rejects relative executables and represents argv and env as separate structured values.",
      "code": "#include <utility>\n#include <filesystem>\n#include <cctype>\n#include <map>\n#include <optional>\n#include <string>\n#include <vector>\n\nstruct LaunchPlan {\n    std::filesystem::path executable;\n    std::vector<std::string> arguments;\n    std::map<std::string, std::string> environment;\n};\n\nstd::optional<LaunchPlan> payment_worker_plan(std::string job_id) {\n    if (job_id.empty() || job_id.size() > 40) return std::nullopt;\n    for (const char raw : job_id) {\n        const auto ch = static_cast<unsigned char>(raw);\n        const bool accepted =\n            (ch >= static_cast<unsigned char>('A') &&\n             ch <= static_cast<unsigned char>('Z')) ||\n            (ch >= static_cast<unsigned char>('a') &&\n             ch <= static_cast<unsigned char>('z')) ||\n            (ch >= static_cast<unsigned char>('0') &&\n             ch <= static_cast<unsigned char>('9')) ||\n            ch == static_cast<unsigned char>('-');\n        if (!accepted) return std::nullopt;\n    }\n    return LaunchPlan{\n        \"/opt/orders/bin/payment-worker\",\n        {\"payment-worker\", \"--job-id\", std::move(job_id)},\n        {{\"PATH\", \"/usr/bin:/bin\"}, {\"LANG\", \"C.UTF-8\"}}\n    };\n}"
    },
    {
      "title": "Regression: working-directory executables and shell syntax are impossible",
      "language": "cpp",
      "blurb": "The result is ready for an execve-style API and never contains a command string.",
      "code": "int test_payment_worker_plan() {\n    const auto plan = payment_worker_plan(\"job-104\");\n    if (!plan) return 1;\n    if (!plan->executable.is_absolute()) return 2;\n    if (plan->arguments.size() != 3) return 3;\n    if (payment_worker_plan(\"job;touch-pwned\")) return 4;\n    return 0;\n}"
    }
  ]
};
