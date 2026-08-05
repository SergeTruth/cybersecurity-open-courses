window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A deterministic concurrency regression reports launch failure only after releasing and joining every worker already created.",
  "codeExamples": [
    {
      "title": "Coordinate counter workers with failure-safe startup",
      "language": "cpp",
      "blurb": "The production launcher converts thread-construction failure into an explicit result, allowing the coordinator to open the latch and join existing workers first.",
      "code": "#include <atomic>\n#include <cstddef>\n#include <latch>\n#include <optional>\n#include <thread>\n#include <utility>\n#include <vector>\n\ntemplate<class Launcher>\nstd::optional<std::size_t> run_increment_regression_with(\n    std::size_t workers,\n    std::size_t iterations,\n    Launcher&& launch\n) {\n    if (workers == 0 || workers > 16 || iterations > 100000) {\n        return std::nullopt;\n    }\n\n    std::latch start(1);\n    std::atomic_size_t counter{0};\n    std::vector<std::jthread> threads;\n    threads.reserve(workers);\n\n    for (std::size_t worker = 0; worker < workers; ++worker) {\n        std::optional<std::jthread> candidate;\n        try {\n            candidate = launch([&] {\n                start.wait();\n                for (std::size_t i = 0; i < iterations; ++i) {\n                    counter.fetch_add(1, std::memory_order_relaxed);\n                }\n            });\n        } catch (...) {\n            start.count_down();\n            threads.clear();\n            throw;\n        }\n        if (!candidate) {\n            start.count_down();\n            threads.clear();\n            return std::nullopt;\n        }\n        threads.push_back(std::move(*candidate));\n    }\n\n    start.count_down();\n    threads.clear();\n    return counter.load(std::memory_order_relaxed);\n}\n\nstd::optional<std::size_t> run_increment_regression(\n    std::size_t workers,\n    std::size_t iterations\n) {\n    return run_increment_regression_with(\n        workers,\n        iterations,\n        [](auto task) noexcept -> std::optional<std::jthread> {\n            try {\n                return std::jthread(std::move(task));\n            } catch (...) {\n                return std::nullopt;\n            }\n        }\n    );\n}\n"
    },
    {
      "title": "Inject a partial launch failure without deadlocking",
      "language": "cpp",
      "blurb": "The test starts one real worker, rejects the next launch, and confirms cleanup completes before normal counter checks continue.",
      "code": "int main() {\n    std::size_t launches = 0;\n    auto failed = run_increment_regression_with(\n        4,\n        1,\n        [&launches](auto task) -> std::optional<std::jthread> {\n            if (launches++ == 1) return std::nullopt;\n            return std::jthread(std::move(task));\n        }\n    );\n    if (failed.has_value()) return 1;\n\n    auto completed = run_increment_regression(4, 10000);\n    if (!completed || *completed != 40000) return 2;\n    if (run_increment_regression(0, 10000)) return 3;\n    if (run_increment_regression(17, 1)) return 4;\n    return 0;\n}\n"
    }
  ]
};
