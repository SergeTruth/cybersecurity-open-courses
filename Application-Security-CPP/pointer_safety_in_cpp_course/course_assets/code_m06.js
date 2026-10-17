window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Express ownership transfer with unique pointers and observation with references so the boundary contract is visible in the type system.",
  "codeExamples": [
    {
      "title": "Consume unique ownership explicitly",
      "language": "cpp",
      "blurb": "The queue accepts a unique pointer by value and becomes the only owner after the caller moves it.",
      "code": "#include <memory>\n#include <queue>\n#include <string>\n#include <utility>\n\nstruct Job {\n    std::string id;\n};\n\nclass JobQueue {\npublic:\n    bool submit(std::unique_ptr<Job> job) {\n        if (!job || job->id.empty()) return false;\n        jobs_.push(std::move(job));\n        return true;\n    }\n\n    std::unique_ptr<Job> take() {\n        if (jobs_.empty()) return {};\n        auto job = std::move(jobs_.front());\n        jobs_.pop();\n        return job;\n    }\n\nprivate:\n    std::queue<std::unique_ptr<Job>> jobs_;\n};"
    },
    {
      "title": "Verify the ownership boundary",
      "language": "cpp",
      "blurb": "Submission empties the caller's unique pointer, and retrieval transfers that same ownership to the consumer.",
      "code": "int test_unique_job_transfer() {\n    JobQueue queue;\n    auto job = std::make_unique<Job>();\n    job->id = \"job-17\";\n    if (!queue.submit(std::move(job))) return 1;\n    if (job) return 2;\n    auto received = queue.take();\n    if (!received || received->id != \"job-17\") return 3;\n    return 0;\n}"
    }
  ]
};
