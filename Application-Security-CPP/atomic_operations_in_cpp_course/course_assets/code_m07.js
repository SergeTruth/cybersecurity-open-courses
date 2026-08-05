window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Lifetime, Publication, and Shutdown Hazards to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Publish and reclaim snapshots with atomic shared ownership",
      "language": "cpp",
      "blurb": "Readers acquire their own shared ownership before accessing the immutable object, so replacement cannot free an observed snapshot.",
      "code": "#include <atomic>\n#include <memory>\n#include <string>\n#include <utility>\n\nstd::atomic<std::shared_ptr<const std::string>> current;\n\nvoid publish(std::string value) {\n    current.store(\n        std::make_shared<const std::string>(std::move(value)),\n        std::memory_order_release);\n}\n\nstd::shared_ptr<const std::string> snapshot() {\n    return current.load(std::memory_order_acquire);\n}\n"
    },
    {
      "title": "Confirm worker termination before destroying shared state",
      "language": "cpp",
      "blurb": "The owner publishes stop, joins the worker, and only then allows the worker-accessed payload to be destroyed.",
      "code": "#include <atomic>\n#include <thread>\n\nclass Worker {\n    int payload_ = 7;\n    std::atomic<bool> stop_{false};\n    std::thread thread_{[this] {\n        while (!stop_.load(std::memory_order_acquire)) {\n            volatile int observed = payload_;\n            (void)observed;\n        }\n    }};\npublic:\n    ~Worker() {\n        stop_.store(true, std::memory_order_release);\n        thread_.join();\n    }\n};\n"
    }
  ]
};
