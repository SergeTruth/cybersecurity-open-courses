window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Tooling, and Code Review to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Stress the legal transition invariant",
      "language": "cpp",
      "blurb": "The regression uses explicit exit codes to test the production transition table, rejected jumps, and the single accepted racing transition under every build profile.",
      "code": "#include <array>\n#include <atomic>\n#include <thread>\n\nenum class Phase { created, running, stopping, stopped };\n\nbool legal(Phase from, Phase to) noexcept {\n    return (from == Phase::created && to == Phase::running) ||\n           (from == Phase::running && to == Phase::stopping) ||\n           (from == Phase::stopping && to == Phase::stopped);\n}\n\nbool transition(std::atomic<Phase>& phase, Phase to) noexcept {\n    Phase observed = phase.load();\n    while (legal(observed, to)) {\n        if (phase.compare_exchange_weak(observed, to)) return true;\n    }\n    return false;\n}\n\nint main() {\n    std::atomic<Phase> phase{Phase::created};\n    if (transition(phase, Phase::stopped)) return 1;\n\n    std::atomic<int> accepted{0};\n    std::array<std::thread, 8> threads;\n    for (auto& thread : threads) {\n        thread = std::thread([&] {\n            if (transition(phase, Phase::running)) ++accepted;\n        });\n    }\n    for (auto& thread : threads) thread.join();\n\n    if (accepted.load() != 1) return 2;\n    if (phase.load() != Phase::running) return 3;\n    if (transition(phase, Phase::created)) return 4;\n    if (!transition(phase, Phase::stopping)) return 5;\n    if (!transition(phase, Phase::stopped)) return 6;\n    if (transition(phase, Phase::running)) return 7;\n    return 0;\n}\n"
    },
    {
      "title": "Run race detection without changing the release target",
      "language": "bash",
      "blurb": "The command builds one explicit translation unit with ThreadSanitizer and fails if the executable reports a race. The example assumes /usr/bin/clang++ is an application-owned, reviewed toolchain path.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nsource=${1:?C++ source required}\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/clang++ -std=c++20 -O1 -g   -fsanitize=thread -fno-omit-frame-pointer   \"$source\" -pthread -o \"$work/thread-test\"\nTSAN_OPTIONS='halt_on_error=1' \"$work/thread-test\"\n"
    }
  ]
};
