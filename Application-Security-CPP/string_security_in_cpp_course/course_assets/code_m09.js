window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The executable keeps empty, exact-limit, and over-limit cases active in every build profile.",
  "codeExamples": [
    {
      "title": "Run table-driven string boundary tests",
      "language": "cpp",
      "blurb": "The executable keeps empty, exact-limit, and over-limit cases active in every build profile.",
      "code": "#include <array>\n#include <string_view>\n\nbool valid_identifier(std::string_view text) noexcept {\n    if (text.empty() || text.size() > 12) return false;\n    for (const char ch : text) {\n        const bool ascii = (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || ch == '-';\n        if (!ascii) return false;\n    }\n    return true;\n}\n\nint main() {\n    struct Case { std::string_view text; bool expected; };\n    constexpr std::array cases{Case{\"alpha-7\", true}, Case{\"\", false},\n                               Case{\"UPPER\", false}, Case{\"abcdefghijklmn\", false}};\n    for (const auto& test : cases) if (valid_identifier(test.text) != test.expected) return 1;\n    return 0;\n}\n"
    }
  ]
};
