window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply RAII and smart-pointer observation to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Observe shared state through a weak pointer",
      "language": "cpp",
      "blurb": "A caller must lock the weak pointer and handle expiration before dereferencing.",
      "code": "#include <memory>\n#include <optional>\n#include <string>\n#include <utility>\n\nstruct ConnectionState {\n    explicit ConnectionState(std::string label_value)\n        : label(std::move(label_value)) {}\n    std::string label;\n};\n\nstd::optional<std::string> current_label(\n    const std::weak_ptr<const ConnectionState>& observed) {\n    const auto state = observed.lock();\n    if (!state) return std::nullopt;\n    return state->label;\n}\n"
    },
    {
      "title": "Fail closed after the shared owner expires",
      "language": "cpp",
      "blurb": "The regression proves observation does not silently become a dangling raw pointer.",
      "code": "int test_weak_connection_state_expires_safely() {\n    std::weak_ptr<const ConnectionState> observed;\n    {\n        auto owner = std::make_shared<ConnectionState>(\"connected\");\n        observed = owner;\n        if (current_label(observed) != std::optional<std::string>{\"connected\"}) {\n            return 1;\n        }\n    }\n    return current_label(observed) ? 2 : 0;\n}\n"
    }
  ]
};
