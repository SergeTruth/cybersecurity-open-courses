window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "Borrowing uses a reference while ownership transfer requires a unique pointer explicitly.",
  "codeExamples": [
    {
      "title": "Express ownership in API signatures",
      "language": "cpp",
      "blurb": "Borrowing uses a reference while ownership transfer requires a unique pointer explicitly.",
      "code": "#include <cstddef>\n#include <utility>\n#include <memory>\n#include <string>\n#include <vector>\n\nstruct Job { std::string name; };\n\nstd::size_t inspect(const Job& job) noexcept { return job.name.size(); }\n\nclass Queue {\npublic:\n    bool submit(std::unique_ptr<Job> job) {\n        if (!job || job->name.empty()) return false;\n        jobs_.push_back(std::move(job));\n        return true;\n    }\n    std::size_t size() const noexcept { return jobs_.size(); }\nprivate:\n    std::vector<std::unique_ptr<Job>> jobs_;\n};\n\nint main() {\n    auto job = std::make_unique<Job>(Job{\"scan\"});\n    if (inspect(*job) != 4) return 1;\n    Queue queue;\n    if (!queue.submit(std::move(job)) || job) return 2;\n    return queue.size() == 1 ? 0 : 3;\n}\n"
    }
  ]
};
