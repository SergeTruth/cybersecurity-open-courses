window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Prefer Safer C++ Abstractions to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Transform bytes through bounded spans",
      "language": "cpp",
      "blurb": "The operation checks equal extents and never accepts a destination pointer without its writable capacity.",
      "code": "#include <cstddef>\n#include <span>\n\nbool invert(std::span<const std::byte> input, std::span<std::byte> output) {\n    if (output.size() != input.size()) return false;\n    for (std::size_t index = 0; index < input.size(); ++index) {\n        output[index] = ~input[index];\n    }\n    return true;\n}\n"
    },
    {
      "title": "Build variable output in an owning vector",
      "language": "cpp",
      "blurb": "The implementation validates the policy limit and lets the container manage storage rather than writing through a caller-selected raw buffer.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <vector>\n\nstd::optional<std::vector<std::byte>> duplicate(\n    std::span<const std::byte> input) {\n    if (input.size() > 4096) return std::nullopt;\n    std::vector<std::byte> output;\n    output.reserve(input.size() * 2);\n    output.insert(output.end(), input.begin(), input.end());\n    output.insert(output.end(), input.begin(), input.end());\n    return output;\n}\n"
    }
  ]
};
