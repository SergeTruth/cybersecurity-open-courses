window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The driver distinguishes progress, retry, closure, and failure while enforcing byte and operation budgets.",
  "codeExamples": [
    {
      "title": "Bound TLS I/O retries and progress",
      "language": "cpp",
      "blurb": "The driver distinguishes progress, retry, closure, and failure while enforcing byte and operation budgets.",
      "code": "#include <cstddef>\n#include <span>\n\nenum class IoResult { progress, retry, closed, failed };\nstruct IoStep { IoResult result; std::size_t bytes; };\n\nbool consume_steps(std::span<const IoStep> steps, std::size_t expected) noexcept {\n    if (expected > 4096 || steps.size() > 32) return false;\n    std::size_t total = 0;\n    for (const auto step : steps) {\n        switch (step.result) {\n            case IoResult::progress:\n                if (step.bytes == 0 || step.bytes > expected - total) return false;\n                total += step.bytes;\n                break;\n            case IoResult::retry:\n                if (step.bytes != 0) return false;\n                break;\n            case IoResult::closed:\n            case IoResult::failed:\n                return false;\n            default:\n                return false;\n        }\n    }\n    return total == expected;\n}\n\nint main() {\n    const IoStep valid[]{{IoResult::retry, 0}, {IoResult::progress, 2}, {IoResult::progress, 3}};\n    const IoStep stalled[]{{IoResult::retry, 0}};\n    const IoStep invalid[]{{static_cast<IoResult>(99), 0}};\n    if (!consume_steps(valid, 5)) return 1;\n    if (consume_steps(stalled, 1)) return 2;\n    return consume_steps(invalid, 0) ? 3 : 0;\n}\n"
    }
  ]
};
