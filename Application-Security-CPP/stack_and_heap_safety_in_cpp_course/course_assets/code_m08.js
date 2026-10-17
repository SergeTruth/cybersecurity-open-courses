window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "Explicit exit codes verify exact-fit and oversized copy behavior without relying on assert.",
  "codeExamples": [
    {
      "title": "Keep boundary regressions active in Release builds",
      "language": "cpp",
      "blurb": "Explicit exit codes verify exact-fit and oversized copy behavior without relying on assert.",
      "code": "#include <algorithm>\n#include <array>\n#include <span>\n#include <vector>\n\nbool bounded_copy(std::span<const int> input, std::span<int> output) {\n    if (input.size() != output.size()) return false;\n    const std::vector<int> snapshot{input.begin(), input.end()};\n    std::ranges::copy(snapshot, output.begin());\n    return true;\n}\n\nint main() {\n    const std::array<int, 3> input{2, 4, 6};\n    std::array<int, 3> exact{};\n    std::array<int, 2> short_output{};\n    if (!bounded_copy(input, exact)) return 1;\n    if (bounded_copy(input, short_output)) return 2;\n    std::array overlap{1, 2, 3, 4};\n    if (!bounded_copy(std::span{overlap}.first<3>(), std::span{overlap}.subspan<1, 3>())) return 3;\n    const std::array expected{1, 1, 2, 3};\n    return exact == input && overlap == expected ? 0 : 4;\n}\n"
    }
  ]
};
