window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "The atomic gate validates the state-machine edge before attempting compare-exchange.",
  "codeExamples": [
    {
      "title": "Permit only reviewed atomic state transitions",
      "language": "cpp",
      "blurb": "The legal-edge function prevents a caller from using compare-exchange to jump to an arbitrary state.",
      "code": "#include <atomic>\n#include <cstdint>\n\nenum class ServiceState : std::uint32_t { idle, starting, running, stopping, stopped };\n\nconstexpr bool legal_transition(ServiceState from, ServiceState to) noexcept {\n    return (from == ServiceState::idle && to == ServiceState::starting) ||\n           (from == ServiceState::starting && to == ServiceState::running) ||\n           (from == ServiceState::running && to == ServiceState::stopping) ||\n           (from == ServiceState::stopping && to == ServiceState::stopped);\n}\n\nclass AtomicServiceGate {\npublic:\n    bool transition(ServiceState from, ServiceState to) noexcept {\n        if (!legal_transition(from, to)) return false;\n        auto expected = from;\n        return state_.compare_exchange_strong(expected, to,\n                                              std::memory_order_acq_rel,\n                                              std::memory_order_acquire);\n    }\nprivate:\n    std::atomic<ServiceState> state_{ServiceState::idle};\n};\n"
    },
    {
      "title": "Reject skipped, reversed, and stale transitions",
      "language": "cpp",
      "blurb": "The regression demonstrates the complete accepted startup path and three forbidden edges.",
      "code": "int main() {\n    AtomicServiceGate gate;\n    if (gate.transition(ServiceState::idle, ServiceState::running)) return 1;\n    if (!gate.transition(ServiceState::idle, ServiceState::starting)) return 2;\n    if (gate.transition(ServiceState::starting, ServiceState::stopped)) return 3;\n    if (!gate.transition(ServiceState::starting, ServiceState::running)) return 4;\n    if (gate.transition(ServiceState::idle, ServiceState::starting)) return 5;\n    return 0;\n}\n"
    }
  ]
};
