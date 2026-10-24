window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The artifact supplies findings while the application separately owns severity and age thresholds.",
  "codeExamples": [
    {
      "title": "Evaluate findings against application policy",
      "language": "cpp",
      "blurb": "The artifact supplies findings while the application separately owns severity and age thresholds.",
      "code": "#include <cstdint>\n\nstruct FindingEvidence { unsigned critical; unsigned high; std::uint64_t age_hours; };\nstruct FindingPolicy { unsigned maximum_critical; unsigned maximum_high; std::uint64_t maximum_age_hours; };\n\nbool releasable(const FindingEvidence& evidence, const FindingPolicy& policy) noexcept {\n    return evidence.critical <= policy.maximum_critical && evidence.high <= policy.maximum_high &&\n           evidence.age_hours <= policy.maximum_age_hours;\n}\n\nint main() {\n    constexpr FindingPolicy policy{0, 2, 24};\n    if (!releasable({0, 2, 12}, policy)) return 1;\n    if (releasable({1, 0, 1}, policy)) return 2;\n    return releasable({0, 999, 1}, policy) ? 3 : 0;\n}\n"
    }
  ]
};
