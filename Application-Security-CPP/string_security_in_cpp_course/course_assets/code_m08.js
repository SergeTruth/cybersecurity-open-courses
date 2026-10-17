window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The adapter checks snprintf’s full result before publishing the destination string.",
  "codeExamples": [
    {
      "title": "Wrap a legacy output API with exact bounds",
      "language": "cpp",
      "blurb": "The adapter checks snprintf’s full result before publishing the destination string.",
      "code": "#include <array>\n#include <cstddef>\n#include <cstdio>\n#include <optional>\n#include <string>\n#include <string_view>\n\nstd::optional<std::string> format_label(std::string_view name, unsigned id) {\n    if (name.empty() || name.size() > 20) return std::nullopt;\n    for (const char raw : name) {\n        const auto ch = static_cast<unsigned char>(raw);\n        if (ch < 0x20 || ch == 0x7f) return std::nullopt;\n    }\n    std::array<char, 32> output{};\n    const int written = std::snprintf(output.data(), output.size(), \"%.*s:%u\",\n                                      static_cast<int>(name.size()), name.data(), id);\n    if (written < 0 || static_cast<std::size_t>(written) >= output.size()) return std::nullopt;\n    return std::string{output.data(), static_cast<std::size_t>(written)};\n}\n\nint main() {\n    const auto label = format_label(\"order\", 42);\n    if (!label || *label != \"order:42\") return 1;\n    if (format_label(\"this-name-is-far-too-long\", 1)) return 2;\n    const std::string_view embedded_nul{\"admin\\0ignored\", 13};\n    return format_label(embedded_nul, 7) ? 3 : 0;\n}\n"
    }
  ]
};
