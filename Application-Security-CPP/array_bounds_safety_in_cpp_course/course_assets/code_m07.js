window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Designing Safer Array APIs to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Express input and output limits with spans",
      "language": "cpp",
      "blurb": "The encoder snapshots the bounded input before writing, so overlapping input and output spans still produce the original bytes twice.",
      "code": "#include <algorithm>\n#include <cstddef>\n#include <span>\n#include <vector>\n\nbool duplicate_bytes(std::span<const std::byte> input,\n                     std::span<std::byte> output,\n                     std::size_t& written) {\n    written = 0;\n    if (input.size() > output.size() / 2) return false;\n    const std::vector<std::byte> snapshot(input.begin(), input.end());\n    std::copy(snapshot.begin(), snapshot.end(), output.begin());\n    std::copy(snapshot.begin(), snapshot.end(),\n              output.begin() + snapshot.size());\n    written = snapshot.size() * 2;\n    return true;\n}\n"
    },
    {
      "title": "Return an owned result instead of an iterator",
      "language": "cpp",
      "blurb": "The lookup exposes no iterator whose validity depends on later mutation of the underlying container.",
      "code": "#include <algorithm>\n#include <optional>\n#include <string>\n#include <vector>\n#include <string_view>\n\nstd::optional<std::string> find_name(\n    const std::vector<std::string>& names, std::string_view wanted) {\n    const auto it = std::find(names.begin(), names.end(), wanted);\n    if (it == names.end()) return std::nullopt;\n    return *it;\n}\n"
    }
  ]
};
