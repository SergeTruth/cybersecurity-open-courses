window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Return an owned value when a view would otherwise outlive the temporary range that produced it.",
  "codeExamples": [
    {
      "title": "Return an owned prefix from a temporary string",
      "language": "cpp",
      "blurb": "The result copies the selected characters instead of returning string_view into destroyed storage.",
      "code": "#include <algorithm>\n#include <cctype>\n#include <ranges>\n#include <string>\n#include <string_view>\n\nstd::string owned_token_prefix(std::string input) {\n    const auto end = std::ranges::find_if(input, [](unsigned char ch) {\n        return std::isspace(ch);\n    });\n    return std::string{input.begin(), end};\n}\n\ntemplate<std::ranges::borrowed_range Range>\nauto first_iterator(Range&& range) {\n    return std::ranges::begin(range);\n}"
    },
    {
      "title": "Regression: the prefix survives destruction of the input",
      "language": "cpp",
      "blurb": "The API makes ownership obvious and does not expose a borrowed iterator for a temporary vector.",
      "code": "int test_owned_prefix() {\n    const auto token = owned_token_prefix(std::string{\"alpha beta\"});\n    if (token != \"alpha\") return 1;\n    std::string stable{\"xy\"};\n    if (*first_iterator(stable) != 'x') return 2;\n    return 0;\n}"
    }
  ]
};
