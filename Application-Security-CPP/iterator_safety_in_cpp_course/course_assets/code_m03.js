window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Reacquire vector elements by an identifier whose uniqueness is validated before any mutation can invalidate iterators.",
  "codeExamples": [
    {
      "title": "Reacquire an element by stable identifier after vector growth",
      "language": "cpp",
      "blurb": "The function requires one selected ID and rejects an added ID already present before push_back may reallocate storage.",
      "code": "\n#include <algorithm>\n#include <optional>\n#include <string>\n#include <utility>\n#include <vector>\n\nstruct Job {\n    unsigned id;\n    std::string state;\n};\n\nstd::optional<std::string> append_and_read(\n    std::vector<Job>& jobs,\n    unsigned selected_id,\n    Job added\n) {\n    const auto selected_count = std::ranges::count(\n        jobs, selected_id, &Job::id\n    );\n    if (selected_count != 1) return std::nullopt;\n    if (std::ranges::any_of(jobs, [&](const Job& job) {\n        return job.id == added.id;\n    })) return std::nullopt;\n\n    jobs.push_back(std::move(added));\n    const auto current =\n        std::ranges::find(jobs, selected_id, &Job::id);\n    if (current == jobs.end()) return std::nullopt;\n    return current->state;\n}"
    },
    {
      "title": "Regression: reallocation is safe and duplicate identities fail",
      "language": "cpp",
      "blurb": "A duplicate addition cannot make post-mutation lookup ambiguous.",
      "code": "\nint test_iterator_reacquisition() {\n    std::vector<Job> jobs;\n    jobs.reserve(1);\n    jobs.push_back({7, \"queued\"});\n    if (append_and_read(jobs, 7, {8, \"new\"}) !=\n        \"queued\") return 1;\n    if (append_and_read(jobs, 7, {8, \"duplicate\"})) return 2;\n    if (append_and_read(jobs, 99, {9, \"new\"})) return 3;\n    return 0;\n}"
    }
  ]
};
