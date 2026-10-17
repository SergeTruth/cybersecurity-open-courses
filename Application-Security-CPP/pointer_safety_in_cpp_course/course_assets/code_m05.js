window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Validate range arithmetic and return owned bytes so a temporary input container cannot leave a dangling result.",
  "codeExamples": [
    {
      "title": "Copy a checked buffer slice into owned storage",
      "language": "cpp",
      "blurb": "The helper checks offset and count by subtraction, then copies the selected bytes before the input span can expire.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <vector>\n\nstd::optional<std::vector<std::byte>> checked_slice(\n    std::span<const std::byte> bytes,\n    std::size_t offset,\n    std::size_t count\n) {\n    if (offset > bytes.size() ||\n        count > bytes.size() - offset) {\n        return std::nullopt;\n    }\n    const auto selected = bytes.subspan(offset, count);\n    return std::vector<std::byte>{\n        selected.begin(), selected.end()\n    };\n}"
    },
    {
      "title": "Reject bad ranges and own temporary input data",
      "language": "cpp",
      "blurb": "The returned vector survives a temporary source, while oversized ranges and offsets fail safely.",
      "code": "#include <array>\n#include <limits>\n\nint test_checked_slice() {\n    const std::array<std::byte, 4> bytes{\n        std::byte{1}, std::byte{2},\n        std::byte{3}, std::byte{4}\n    };\n    const auto middle = checked_slice(bytes, 1, 2);\n    if (!middle || middle->size() != 2 ||\n        (*middle)[0] != std::byte{2}) return 1;\n    if (checked_slice(bytes, 3, 2)) return 2;\n    if (checked_slice(\n        bytes,\n        std::numeric_limits<std::size_t>::max(),\n        0\n    )) return 3;\n\n    auto owned = checked_slice(\n        std::vector<std::byte>(128, std::byte{1}),\n        0, 128\n    );\n    if (!owned || owned->front() != std::byte{1}) return 4;\n    return 0;\n}"
    }
  ]
};
