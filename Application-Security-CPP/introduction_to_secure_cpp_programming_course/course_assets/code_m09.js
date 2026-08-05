window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Combine compiler diagnostics with release-effective negative regressions that exercise the security boundary itself.",
  "codeExamples": [
    {
      "title": "Run a compact security regression table",
      "language": "cpp",
      "blurb": "Each case checks a different boundary and returns a stable nonzero identifier on failure.",
      "code": "#include <cstddef>\n#include <array>\n#include <charconv>\n#include <string_view>\n\nstruct InputCase {\n    std::string_view text;\n    bool accepted;\n};\n\nbool accepted_quantity_for_review(std::string_view text) {\n    unsigned value = 0;\n    const auto [end, error] =\n        std::from_chars(text.data(), text.data() + text.size(), value);\n    return error == std::errc{} &&\n        end == text.data() + text.size() &&\n        value > 0 && value <= 1000;\n}\n\nint run_quantity_security_regressions() {\n    constexpr std::array<InputCase, 5> cases{{\n        {\"1\", true},\n        {\"1000\", true},\n        {\"0\", false},\n        {\"1001\", false},\n        {\"7units\", false}\n    }};\n    for (std::size_t index = 0; index < cases.size(); ++index) {\n        const bool accepted =\n            accepted_quantity_for_review(cases[index].text);\n        if (accepted != cases[index].accepted) {\n            return static_cast<int>(index + 1);\n        }\n    }\n    return 0;\n}"
    },
    {
      "title": "Regression: release builds execute every check",
      "language": "cpp",
      "blurb": "There is no assert expression for NDEBUG to remove.",
      "code": "int test_secure_review_table() {\n    return run_quantity_security_regressions();\n}"
    }
  ]
};
