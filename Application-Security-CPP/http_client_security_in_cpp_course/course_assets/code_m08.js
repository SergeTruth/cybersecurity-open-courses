window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Apply one wall-clock deadline, retry only safe transient failures, honor cancellation, and close the response on every path.",
  "codeExamples": [
    {
      "title": "Run a bounded idempotent GET operation",
      "language": "cpp",
      "blurb": "The retry loop consumes a shared attempt budget and never retries authentication or validation failures.",
      "code": "#include <chrono>\n#include <string>\n\nenum class AttemptResult { ok, transient, rejected, cancelled };\n\ntemplate<class Clock, class Send>\nAttemptResult bounded_get(\n    typename Clock::time_point deadline,\n    unsigned maximum_attempts,\n    Send send\n) {\n    if (maximum_attempts == 0 || maximum_attempts > 3) {\n        return AttemptResult::rejected;\n    }\n    for (unsigned attempt = 0; attempt < maximum_attempts; ++attempt) {\n        if (Clock::now() >= deadline) return AttemptResult::cancelled;\n        const auto result = send(deadline);\n        if (result != AttemptResult::transient) return result;\n    }\n    return AttemptResult::transient;\n}"
    },
    {
      "title": "Regression: retry count and deadline are enforced together",
      "language": "cpp",
      "blurb": "A deterministic clock and sender make the lifecycle policy directly testable.",
      "code": "struct FixedClock {\n    using time_point = std::chrono::steady_clock::time_point;\n    static time_point now() { return time_point{}; }\n};\n\nint test_bounded_get() {\n    int attempts = 0;\n    const auto deadline = FixedClock::time_point{} + std::chrono::seconds(1);\n    const auto result = bounded_get<FixedClock>(deadline, 3, [&](auto) {\n        ++attempts;\n        return AttemptResult::transient;\n    });\n    if (result != AttemptResult::transient || attempts != 3) return 1;\n    if (bounded_get<FixedClock>(FixedClock::time_point{}, 3, [&](auto) {\n        ++attempts;\n        return AttemptResult::ok;\n    }) != AttemptResult::cancelled) return 2;\n    return 0;\n}"
    }
  ]
};
