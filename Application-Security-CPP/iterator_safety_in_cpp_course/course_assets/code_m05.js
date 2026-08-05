window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use a range pipeline whose ASCII input policy, ownership, and materialization point are visible at the call site.",
  "codeExamples": [
    {
      "title": "Materialize ASCII-validated order IDs from a read-only range",
      "language": "cpp",
      "blurb": "An explicit ASCII protocol grammar avoids locale-dependent classification, and the result owns every accepted ID.",
      "code": "\n#include <algorithm>\n#include <ranges>\n#include <string>\n#include <vector>\n\nbool ascii_order_id_character(unsigned char ch) noexcept {\n    return (ch >= static_cast<unsigned char>('A') &&\n            ch <= static_cast<unsigned char>('Z')) ||\n           (ch >= static_cast<unsigned char>('a') &&\n            ch <= static_cast<unsigned char>('z')) ||\n           (ch >= static_cast<unsigned char>('0') &&\n            ch <= static_cast<unsigned char>('9')) ||\n           ch == static_cast<unsigned char>('-');\n}\n\nbool valid_order_id(const std::string& id) {\n    return !id.empty() && id.size() <= 16 &&\n        std::ranges::all_of(id, [](const char raw) {\n            return ascii_order_id_character(\n                static_cast<unsigned char>(raw)\n            );\n        });\n}\n\nstd::vector<std::string> accepted_order_ids(\n    const std::vector<std::string>& input\n) {\n    std::vector<std::string> result;\n    for (const auto& id :\n         input | std::views::filter(valid_order_id)) {\n        result.push_back(id);\n    }\n    return result;\n}"
    },
    {
      "title": "Regression: the materialized result is owned and locale-independent",
      "language": "cpp",
      "blurb": "Invalid punctuation and non-ASCII bytes are excluded before the source container is destroyed.",
      "code": "\nint test_materialized_range() {\n    std::vector<std::string> source{\n        \"a-1\", \"../bad\", std::string{\"\\xC3\\xA9\", 2}, \"b-2\"\n    };\n    auto accepted = accepted_order_ids(source);\n    source.clear();\n    if (accepted !=\n        std::vector<std::string>{\"a-1\", \"b-2\"}) return 1;\n    return 0;\n}"
    }
  ]
};
