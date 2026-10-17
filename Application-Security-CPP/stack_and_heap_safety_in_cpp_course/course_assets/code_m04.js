window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The API copies accepted bytes into an owned vector instead of exposing a span into temporary storage.",
  "codeExamples": [
    {
      "title": "Return owned bytes across lifetime boundaries",
      "language": "cpp",
      "blurb": "The API copies accepted bytes into an owned vector instead of exposing a span into temporary storage.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <vector>\n\nstd::optional<std::vector<std::byte>> copy_payload(std::span<const std::byte> input) {\n    if (input.empty() || input.size() > 512) return std::nullopt;\n    return std::vector<std::byte>{input.begin(), input.end()};\n}\n\nint main() {\n    const std::byte input[]{std::byte{0x41}, std::byte{0x42}, std::byte{0x43}};\n    auto owned = copy_payload(input);\n    if (!owned || owned->size() != 3) return 1;\n    if ((*owned)[0] != std::byte{0x41}) return 2;\n    return copy_payload({}) ? 3 : 0;\n}\n"
    }
  ]
};
