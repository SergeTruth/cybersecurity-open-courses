window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Copy a stable snapshot under the lock, then use checked accumulation so iterator safety is not undermined by size arithmetic.",
  "codeExamples": [
    {
      "title": "Iterate over a synchronized snapshot under a byte budget",
      "language": "cpp",
      "blurb": "No borrowed iterator crosses the mutex boundary, and subtraction-based checked addition prevents size_t wraparound.",
      "code": "\n#include <cstddef>\n#include <mutex>\n#include <optional>\n#include <string>\n#include <utility>\n#include <vector>\n\nclass SharedEvents {\npublic:\n    void append(std::string event) {\n        std::scoped_lock lock{mutex_};\n        events_.push_back(std::move(event));\n    }\n    std::vector<std::string> snapshot() const {\n        std::scoped_lock lock{mutex_};\n        return events_;\n    }\nprivate:\n    mutable std::mutex mutex_;\n    std::vector<std::string> events_;\n};\n\nstd::optional<std::size_t> total_event_bytes(\n    const SharedEvents& events,\n    std::size_t maximum\n) {\n    std::size_t total = 0;\n    for (const auto& event : events.snapshot()) {\n        if (event.size() > maximum - total) return std::nullopt;\n        total += event.size();\n    }\n    return total;\n}"
    },
    {
      "title": "Regression: stable traversal and cumulative limits are both enforced",
      "language": "cpp",
      "blurb": "The same snapshot calculation returns an error rather than wrapping or exceeding policy.",
      "code": "\nint test_shared_snapshot() {\n    SharedEvents events;\n    events.append(\"one\");\n    events.append(\"three\");\n    if (total_event_bytes(events, 8) != 8) return 1;\n    if (total_event_bytes(events, 7)) return 2;\n    return 0;\n}"
    }
  ]
};
