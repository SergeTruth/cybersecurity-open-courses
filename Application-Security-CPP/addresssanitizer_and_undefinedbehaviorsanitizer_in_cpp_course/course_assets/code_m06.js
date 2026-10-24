window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Fixing Findings Safely to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Fix a copy by checking capacity before writing",
      "language": "cpp",
      "blurb": "The corrected implementation uses subtraction-based bounds logic and rejects the operation without exposing partial output.",
      "code": "#include <algorithm>\n#include <cstddef>\n#include <span>\n\nbool append(std::span<std::byte> output, std::size_t used,\n            std::span<const std::byte> input, std::size_t& new_used) {\n    new_used = used;\n    if (used > output.size() || input.size() > output.size() - used) return false;\n    std::copy(input.begin(), input.end(), output.begin() + used);\n    new_used = used + input.size();\n    return true;\n}\n"
    },
    {
      "title": "Fix asynchronous lifetime with shared immutable ownership",
      "language": "cpp",
      "blurb": "The worker captures an owning snapshot rather than a raw pointer into a scope that may end before execution.",
      "code": "#include <future>\n#include <memory>\n#include <string>\n#include <cstddef>\n#include <utility>\n\nstd::future<std::size_t> measure_later(std::string value) {\n    auto snapshot = std::make_shared<const std::string>(std::move(value));\n    return std::async(std::launch::async, [snapshot] {\n        return snapshot->size();\n    });\n}\n\nint main() {\n    return measure_later(\"order\").get() == 5 ? 0 : 1;\n}\n"
    }
  ]
};
