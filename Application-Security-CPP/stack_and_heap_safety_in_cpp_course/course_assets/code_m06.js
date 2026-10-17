window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The collection owns each polymorphic task exclusively and destroys every task automatically.",
  "codeExamples": [
    {
      "title": "Combine containers and RAII ownership",
      "language": "cpp",
      "blurb": "The collection owns each polymorphic task exclusively and destroys every task automatically.",
      "code": "#include <limits>\n#include <memory>\n#include <vector>\n\nstruct Task { virtual ~Task() = default; virtual int run() const = 0; };\nclass AddTask final : public Task {\npublic:\n    static std::unique_ptr<Task> create(int value) {\n        if (value == std::numeric_limits<int>::max()) return {};\n        return std::unique_ptr<Task>{new AddTask{value}};\n    }\n    int run() const override { return value_ + 1; }\nprivate:\n    explicit AddTask(int value) : value_(value) {}\n    int value_;\n};\n\nint main() {\n    if (AddTask::create(std::numeric_limits<int>::max())) return 1;\n    std::vector<std::unique_ptr<Task>> tasks;\n    tasks.push_back(AddTask::create(4));\n    tasks.push_back(AddTask::create(8));\n    if (!tasks[0] || !tasks[1]) return 2;\n    int total = 0;\n    for (const auto& task : tasks) total += task->run();\n    return total == 14 ? 0 : 3;\n}\n"
    }
  ]
};
