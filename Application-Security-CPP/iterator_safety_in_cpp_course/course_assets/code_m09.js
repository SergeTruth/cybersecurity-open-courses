window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use release-effective boundary regressions and run them additionally with implementation debug iterators and sanitizers in CI.",
  "codeExamples": [
    {
      "title": "Probe every valid position, one-past-end, and a reversed range",
      "language": "cpp",
      "blurb": "The table covers every element plus both invalid boundary shapes accepted by the generic function's iterator parameters.",
      "code": "#include <cstddef>\n#include <array>\n#include <iterator>\n#include <optional>\n\ntemplate<std::random_access_iterator Iterator>\nstd::optional<typename std::iterator_traits<Iterator>::value_type>\ndebug_element_at(Iterator first, Iterator last, std::size_t index) {\n    const auto distance = last - first;\n    if (distance < 0 ||\n        index >= static_cast<std::size_t>(distance)) return std::nullopt;\n    return *(first + static_cast<std::iter_difference_t<Iterator>>(index));\n}\n\nint run_iterator_boundary_regressions() {\n    const std::array<int, 3> values{10, 20, 30};\n    for (std::size_t index = 0; index < values.size(); ++index) {\n        const auto value =\n            debug_element_at(values.begin(), values.end(), index);\n        if (!value || *value != values[index]) {\n            return static_cast<int>(index + 1);\n        }\n    }\n    if (debug_element_at(\n        values.begin(), values.end(), values.size()\n    )) return 4;\n    if (debug_element_at(\n        values.end(), values.begin(), 0\n    )) return 5;\n    return 0;\n}"
    },
    {
      "title": "Regression: NDEBUG cannot remove iterator checks",
      "language": "cpp",
      "blurb": "The test uses control flow and return values, not assert.",
      "code": "int test_iterator_boundaries() {\n    return run_iterator_boundary_regressions();\n}"
    }
  ]
};
