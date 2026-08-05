window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A jthread worker owns cancellation and joining as part of its lifetime.",
  "codeExamples": [
    {
      "title": "Stop and join a background worker deterministically",
      "language": "cpp",
      "blurb": "The owner deletes copying and uses jthread so partial construction and ordinary destruction cannot leave joinable threads.",
      "code": "#include <atomic>\n#include <chrono>\n#include <thread>\n\nclass PollingWorker {\npublic:\n    PollingWorker() : thread_([this](std::stop_token stop) {\n        while (!stop.stop_requested()) {\n            polls_.fetch_add(1, std::memory_order_relaxed);\n            std::this_thread::yield();\n        }\n    }) {}\n    PollingWorker(const PollingWorker&) = delete;\n    PollingWorker& operator=(const PollingWorker&) = delete;\n    void stop() noexcept { thread_.request_stop(); }\n    void join() { if (thread_.joinable()) thread_.join(); }\n    unsigned polls() const noexcept { return polls_.load(std::memory_order_relaxed); }\nprivate:\n    std::atomic<unsigned> polls_{0};\n    std::jthread thread_;\n};\n"
    },
    {
      "title": "Confirm the worker reaches a bounded shutdown handshake",
      "language": "cpp",
      "blurb": "The deadline prevents scheduler delay from becoming an unbounded test and join confirms termination.",
      "code": "int main() {\n    PollingWorker worker;\n    const auto deadline = std::chrono::steady_clock::now() + std::chrono::seconds(2);\n    while (worker.polls() == 0 && std::chrono::steady_clock::now() < deadline) {\n        std::this_thread::yield();\n    }\n    if (worker.polls() == 0) return 1;\n    worker.stop();\n    worker.join();\n    return 0;\n}\n"
    }
  ]
};
