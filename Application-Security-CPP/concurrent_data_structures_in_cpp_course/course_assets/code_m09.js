window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Diagnostics, and Performance Review to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Stress a bounded queue and verify conservation",
      "language": "cpp",
      "blurb": "The self-contained queue regression returns failure unless accepted work is nonzero and exactly equals consumed work, even with NDEBUG.",
      "code": "#include <atomic>\n#include <condition_variable>\n#include <cstddef>\n#include <mutex>\n#include <queue>\n#include <thread>\n\nclass TestQueue {\n    static constexpr std::size_t capacity = 256;\n    std::mutex mutex_;\n    std::condition_variable changed_;\n    std::queue<int> items_;\n    bool closed_ = false;\npublic:\n    bool push(int value) {\n        std::lock_guard lock(mutex_);\n        if (closed_ || items_.size() == capacity) return false;\n        items_.push(value);\n        changed_.notify_one();\n        return true;\n    }\n    bool pop(int& value) {\n        std::unique_lock lock(mutex_);\n        changed_.wait(lock, [&] { return closed_ || !items_.empty(); });\n        if (items_.empty()) return false;\n        value = items_.front();\n        items_.pop();\n        return true;\n    }\n    void close() {\n        std::lock_guard lock(mutex_);\n        closed_ = true;\n        changed_.notify_all();\n    }\n};\n\nint main() {\n    TestQueue queue;\n    std::atomic<int> produced{0};\n    std::atomic<int> consumed{0};\n    std::thread producer([&] {\n        for (int value = 0; value < 10'000; ++value) {\n            if (queue.push(value)) ++produced;\n        }\n        queue.close();\n    });\n    std::thread consumer([&] {\n        int value = 0;\n        while (queue.pop(value)) ++consumed;\n    });\n    producer.join();\n    consumer.join();\n\n    if (produced.load() == 0) return 1;\n    if (produced.load() != consumed.load()) return 2;\n    return 0;\n}\n"
    },
    {
      "title": "Compile a concurrency regression with ThreadSanitizer",
      "language": "bash",
      "blurb": "The focused tool invocation preserves frame pointers, enables race detection, and fails immediately on the first observed race. The example assumes /usr/bin/clang++ is an application-owned, reviewed toolchain path.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nsource=${1:?concurrency test source required}\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/clang++ -std=c++20 -O1 -g -pthread   -fsanitize=thread -fno-omit-frame-pointer   \"$source\" -o \"$work/concurrency-test\"\nTSAN_OPTIONS='halt_on_error=1:second_deadlock_stack=1'   \"$work/concurrency-test\"\n"
    }
  ]
};
