window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Refactoring Legacy Buffer Code to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Wrap snprintf and reject truncation",
      "language": "cpp",
      "blurb": "The adapter checks negative results and required length, so a truncated identifier never becomes valid output.",
      "code": "#include <array>\n#include <cstdio>\n#include <optional>\n#include <string>\n#include <cstddef>\n\nstd::optional<std::string> order_label(unsigned id) {\n    std::array<char, 32> buffer{};\n    const int result = std::snprintf(\n        buffer.data(), buffer.size(), \"order-%u\", id);\n    if (result < 0 || static_cast<std::size_t>(result) >= buffer.size()) {\n        return std::nullopt;\n    }\n    return std::string(buffer.data(), static_cast<std::size_t>(result));\n}\n"
    },
    {
      "title": "Isolate a legacy destination pointer behind capacity",
      "language": "cpp",
      "blurb": "New callers use a span, and the wrapper passes the exact destination capacity to the size-aware legacy function.",
      "code": "#include <climits>\n#include <span>\n\nextern \"C\" int legacy_escape(\n    const char* input, int input_size, char* output, int output_capacity);\n\nint escape_legacy(std::span<const char> input, std::span<char> output) {\n    if (input.size() > INT_MAX || output.size() > INT_MAX) return -1;\n    return legacy_escape(\n        input.data(), static_cast<int>(input.size()),\n        output.data(), static_cast<int>(output.size()));\n}\n"
    }
  ]
};
