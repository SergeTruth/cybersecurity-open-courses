window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Flags, Counters, and State Transitions to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Enforce the legal lifecycle transition table",
      "language": "cpp",
      "blurb": "Callers request a destination state, but the class—not a caller-provided prior value—decides which transitions are legal.",
      "code": "#include <atomic>\n\nenum class State { created, running, stopping, stopped };\n\nbool legal(State from, State to) noexcept {\n    return (from == State::created && to == State::running) ||\n           (from == State::running && to == State::stopping) ||\n           (from == State::stopping && to == State::stopped);\n}\n\nbool transition(std::atomic<State>& state, State to) noexcept {\n    State observed = state.load();\n    while (legal(observed, to)) {\n        if (state.compare_exchange_weak(observed, to)) return true;\n    }\n    return false;\n}\n"
    },
    {
      "title": "Initialize shared configuration exactly once",
      "language": "cpp",
      "blurb": "call_once expresses the one-time initialization contract without inventing a partially initialized atomic state machine.",
      "code": "#include <memory>\n#include <mutex>\n#include <string>\n\nstd::once_flag config_once;\nstd::unique_ptr<const std::string> config;\n\nconst std::string& configuration() {\n    std::call_once(config_once, [] {\n        config = std::make_unique<const std::string>(\"approved\");\n    });\n    return *config;\n}\n"
    }
  ]
};
