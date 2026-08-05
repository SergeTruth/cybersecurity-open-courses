window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Designing Safer Function and API Boundaries to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Report required output without partial writes",
      "language": "cpp",
      "blurb": "The encoder checks complete capacity and snapshots the payload before any output write, so overlapping spans preserve the original payload.",
      "code": "#include <algorithm>\n#include <cstddef>\n#include <span>\n#include <vector>\n\nstruct WriteResult {\n    bool complete;\n    std::size_t required;\n    std::size_t written;\n};\n\nWriteResult frame(std::span<const std::byte> payload,\n                  std::span<std::byte> output) {\n    if (payload.size() == static_cast<std::size_t>(-1)) {\n        return {false, payload.size(), 0};\n    }\n    const std::size_t required = payload.size() + 1;\n    if (output.size() < required) return {false, required, 0};\n\n    const std::vector<std::byte> snapshot(payload.begin(), payload.end());\n    output[0] = std::byte{0x7e};\n    std::copy(snapshot.begin(), snapshot.end(), output.begin() + 1);\n    return {true, required, required};\n}\n"
    },
    {
      "title": "Return owned output when aliasing is unnecessary",
      "language": "cpp",
      "blurb": "Returning an owned vector removes input/output overlap from the API instead of attempting nonportable ordering comparisons between unrelated pointers.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <vector>\n\nstd::optional<std::vector<std::byte>> copy_owned(\n    std::span<const std::byte> input,\n    std::size_t maximum_size = 65'536) {\n    if (input.size() > maximum_size) return std::nullopt;\n    return std::vector<std::byte>(input.begin(), input.end());\n}\n"
    }
  ]
};
