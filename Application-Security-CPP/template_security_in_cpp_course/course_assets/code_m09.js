window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "Static assertions cover rejected types while explicit runtime results verify accepted behavior in Release builds.",
  "codeExamples": [
    {
      "title": "Test template contracts in compile and runtime paths",
      "language": "cpp",
      "blurb": "Static assertions cover rejected types while explicit runtime results verify accepted behavior in Release builds.",
      "code": "#include <concepts>\n#include <string_view>\n\ntemplate<class T>\nconcept UnsignedCounter = std::unsigned_integral<T> && (sizeof(T) >= 4);\n\ntemplate<UnsignedCounter T>\nbool within_budget(T value, T maximum) noexcept { return maximum > 0 && value <= maximum; }\n\nstatic_assert(UnsignedCounter<unsigned>);\nstatic_assert(!UnsignedCounter<int>);\n\nint main() {\n    if (!within_budget<unsigned>(4, 8)) return 1;\n    if (within_budget<unsigned>(9, 8)) return 2;\n    return within_budget<unsigned>(0, 0) ? 3 : 0;\n}\n"
    }
  ]
};
