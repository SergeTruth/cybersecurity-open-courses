window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Constrain algorithms to the iterator operations they actually require instead of assuming random access for every range.",
  "codeExamples": [
    {
      "title": "Require random access for indexed window checks",
      "language": "cpp",
      "blurb": "The concept prevents accidental instantiation with a forward-only list iterator.",
      "code": "#include <concepts>\n#include <cstddef>\n#include <iterator>\n#include <optional>\n\ntemplate<std::random_access_iterator Iterator>\nstd::optional<typename std::iterator_traits<Iterator>::value_type>\nelement_at(Iterator first, Iterator last, std::size_t index) {\n    const auto distance = last - first;\n    if (distance < 0 ||\n        index >= static_cast<std::size_t>(distance)) return std::nullopt;\n    return *(first + static_cast<std::iter_difference_t<Iterator>>(index));\n}"
    },
    {
      "title": "Regression: bounds are checked before random-access arithmetic",
      "language": "cpp",
      "blurb": "A valid vector iterator returns a value while an end position is rejected.",
      "code": "#include <vector>\n\nint test_random_access_contract() {\n    const std::vector<int> values{4, 5, 6};\n    if (element_at(values.begin(), values.end(), 1) != 5) return 1;\n    if (element_at(values.begin(), values.end(), 3)) return 2;\n    return 0;\n}"
    }
  ]
};
