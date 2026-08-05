window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Exercise arithmetic edges with explicit results and use compiler overflow instrumentation as a complementary diagnostic.",
  "codeExamples": [
    {
      "title": "Check a boundary table without assertions",
      "language": "cpp",
      "blurb": "The table-driven regression remains effective in release builds and names the failing case by return code.",
      "code": "#include <cstddef>\n#include <array>\n#include <cstdint>\n#include <limits>\n#include <optional>\n\nstd::optional<std::uint64_t> diagnostic_checked_add(\n    std::uint64_t left,\n    std::uint64_t right\n) {\n    if (right > std::numeric_limits<std::uint64_t>::max() - left) {\n        return std::nullopt;\n    }\n    return left + right;\n}\n\nstruct AddCase {\n    std::uint64_t left;\n    std::uint64_t right;\n    bool succeeds;\n};\n\nint run_checked_add_boundaries() {\n    constexpr auto maximum = std::numeric_limits<std::uint64_t>::max();\n    const std::array<AddCase, 4> cases{{\n        {0, 0, true},\n        {maximum, 0, true},\n        {maximum, 1, false},\n        {maximum - 1, 2, false}\n    }};\n    for (std::size_t index = 0; index < cases.size(); ++index) {\n        if (diagnostic_checked_add(\n                cases[index].left, cases[index].right\n            ).has_value()\n            != cases[index].succeeds) {\n            return static_cast<int>(index + 1);\n        }\n    }\n    return 0;\n}"
    },
    {
      "title": "Regression: diagnostics use bounded case identifiers",
      "language": "cpp",
      "blurb": "The test reports a numeric case index rather than interpolating untrusted arithmetic input into a message.",
      "code": "int test_integer_boundary_table() {\n    return run_checked_add_boundaries();\n}"
    }
  ]
};
