window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The deleter always releases the resource, treats accounting as optional instrumentation, and safely retains any supplied accounting state.",
  "codeExamples": [
    {
      "title": "Attach a null-safe nonthrowing custom deleter",
      "language": "cpp",
      "blurb": "The deleter always releases the resource, treats accounting as optional instrumentation, and safely retains any supplied accounting state.",
      "code": "#include <atomic>\n#include <cstddef>\n#include <memory>\n#include <utility>\n\nstruct ReleaseCount { std::atomic_size_t value{0}; };\nstruct Resource {\n    int handle;\n    static inline std::atomic_size_t destroyed{0};\n    ~Resource() noexcept { destroyed.fetch_add(1, std::memory_order_relaxed); }\n};\n\nclass ResourceDeleter {\npublic:\n    explicit ResourceDeleter(std::shared_ptr<ReleaseCount> count = {}) noexcept\n        : count_(std::move(count)) {}\n\n    void operator()(Resource* resource) const noexcept {\n        if (!resource) return;\n        delete resource;\n        if (count_) count_->value.fetch_add(1, std::memory_order_relaxed);\n    }\n\nprivate:\n    std::shared_ptr<ReleaseCount> count_;\n};\n\nint main() {\n    using Owner = std::unique_ptr<Resource, ResourceDeleter>;\n    auto count = std::make_shared<ReleaseCount>();\n    {\n        Owner measured{new Resource{9}, ResourceDeleter{count}};\n        Owner unmeasured{new Resource{10}, ResourceDeleter{}};\n    }\n    if (count->value.load(std::memory_order_relaxed) != 1) return 1;\n    return Resource::destroyed.load(std::memory_order_relaxed) == 2 ? 0 : 2;\n}\n"
    }
  ]
};
