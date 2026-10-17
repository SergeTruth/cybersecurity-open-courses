window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Replace stored raw observers with weak ownership so expiration is detected before dereference.",
  "codeExamples": [
    {
      "title": "Lock a weak pointer at every access",
      "language": "cpp",
      "blurb": "The observer returns no value after the owner is gone instead of retaining or dereferencing a dangling pointer.",
      "code": "#include <memory>\n#include <optional>\n\nstruct CounterState {\n    int value = 0;\n};\n\nclass CounterObserver {\npublic:\n    explicit CounterObserver(\n        const std::shared_ptr<CounterState>& state\n    ) : state_(state) {}\n\n    std::optional<int> read() const noexcept {\n        const auto state = state_.lock();\n        if (!state) return std::nullopt;\n        return state->value;\n    }\n\nprivate:\n    std::weak_ptr<CounterState> state_;\n};"
    },
    {
      "title": "Verify the observer detects expiration",
      "language": "cpp",
      "blurb": "The value is available while shared ownership exists and absent immediately after the owner is destroyed.",
      "code": "int test_counter_observer_expiration() {\n    auto state = std::make_shared<CounterState>();\n    state->value = 17;\n    CounterObserver observer{state};\n    if (observer.read() != 17) return 1;\n    state.reset();\n    if (observer.read()) return 2;\n    return 0;\n}"
    }
  ]
};
