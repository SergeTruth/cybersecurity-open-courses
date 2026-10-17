window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The consteval helper rejects excessive work through a narrow, reviewed template bound.",
  "codeExamples": [
    {
      "title": "Cap compile-time computation",
      "language": "cpp",
      "blurb": "The consteval helper rejects excessive work through a narrow, reviewed template bound.",
      "code": "#include <array>\n#include <cstddef>\n\ntemplate<std::size_t Count>\n    requires (Count > 0 && Count <= 32)\nconsteval auto ascending_table() {\n    std::array<std::size_t, Count> result{};\n    for (std::size_t index = 0; index < Count; ++index) result[index] = index;\n    return result;\n}\n\ntemplate<std::size_t Count>\nconcept SupportedTable = requires { ascending_table<Count>(); };\n\nstatic_assert(SupportedTable<8>);\nstatic_assert(!SupportedTable<0>);\nstatic_assert(!SupportedTable<64>);\n\nint main() {\n    constexpr auto table = ascending_table<4>();\n    return table[3] == 3 ? 0 : 1;\n}\n"
    }
  ]
};
