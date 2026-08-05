window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Memory Ordering at a Reviewable Level to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Publish immutable payload with release and acquire",
      "language": "cpp",
      "blurb": "The release store publishes prior payload writes to readers that observe the matching acquire load.",
      "code": "#include <atomic>\n#include <memory>\n#include <mutex>\n#include <string>\n\nstd::shared_ptr<const std::string> payload;\nstd::atomic<bool> ready{false};\nstd::once_flag publish_once;\n\nvoid publish() {\n    std::call_once(publish_once, [] {\n        payload = std::make_shared<const std::string>(\"configured\");\n        ready.store(true, std::memory_order_release);\n    });\n}\n\nstd::shared_ptr<const std::string> consume() {\n    if (!ready.load(std::memory_order_acquire)) return {};\n    return payload;\n}\n"
    },
    {
      "title": "Keep unrelated telemetry relaxed",
      "language": "cpp",
      "blurb": "The sample counter communicates no state beyond its own numeric value, so it does not pretend to publish other objects.",
      "code": "#include <atomic>\n#include <cstdint>\n\nstd::atomic<std::uint64_t> samples{0};\n\nvoid record_sample() noexcept {\n    samples.fetch_add(1, std::memory_order_relaxed);\n}\n\nstd::uint64_t sample_count() noexcept {\n    return samples.load(std::memory_order_relaxed);\n}\n"
    }
  ]
};
