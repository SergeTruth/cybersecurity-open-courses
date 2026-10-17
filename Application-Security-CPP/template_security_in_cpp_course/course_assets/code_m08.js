window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The constrained algorithm accepts sized ranges and rejects work above the application ceiling.",
  "codeExamples": [
    {
      "title": "Preserve range extents in generic algorithms",
      "language": "cpp",
      "blurb": "The constraints require the same const, sized input range used by the body, and the algorithm rejects work above the application ceiling.",
      "code": "#include <array>\n#include <concepts>\n#include <ranges>\n\ntemplate<class Range>\n    requires std::ranges::input_range<const Range> &&\n             std::ranges::sized_range<const Range> &&\n             std::integral<std::ranges::range_value_t<const Range>>\nbool all_nonnegative(const Range& range) {\n    if (std::ranges::size(range) > 128) return false;\n    for (const auto value : range) if (value < 0) return false;\n    return true;\n}\n\nint main() {\n    const std::array good{1, 2, 3};\n    const std::array bad{1, -1, 3};\n    if (!all_nonnegative(good)) return 1;\n    return all_nonnegative(bad) ? 2 : 0;\n}\n"
    }
  ]
};
