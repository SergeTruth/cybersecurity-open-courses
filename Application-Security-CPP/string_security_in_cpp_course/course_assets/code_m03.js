window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The adapter searches only the supplied extent and rejects input without an in-bounds terminator.",
  "codeExamples": [
    {
      "title": "Convert a bounded C buffer safely",
      "language": "cpp",
      "blurb": "The adapter searches only the supplied extent and rejects input without an in-bounds terminator.",
      "code": "#include <algorithm>\n#include <cstddef>\n#include <optional>\n#include <span>\n#include <string>\n\nstd::optional<std::string> bounded_c_string(std::span<const char> bytes) {\n    if (bytes.empty() || bytes.size() > 64) return std::nullopt;\n    const auto end = std::ranges::find(bytes, '\\0');\n    if (end == bytes.end()) return std::nullopt;\n    return std::string{bytes.begin(), end};\n}\n\nint main() {\n    const char valid[]{'o', 'k', '\\0', 'x'};\n    const char missing[]{'n', 'o'};\n    const auto text = bounded_c_string(valid);\n    if (!text || *text != \"ok\") return 1;\n    return bounded_c_string(missing) ? 2 : 0;\n}\n"
    }
  ]
};
