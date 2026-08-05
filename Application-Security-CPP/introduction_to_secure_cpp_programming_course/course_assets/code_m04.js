window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use containers for ownership and spans for bounded borrowing, with the caller retaining the owner for the entire operation.",
  "codeExamples": [
    {
      "title": "Copy a payload into a framed output span",
      "language": "cpp",
      "blurb": "The encoder rejects insufficient output and snapshots overlapping input before writing the header.",
      "code": "#include <array>\n#include <algorithm>\n#include <cstddef>\n#include <optional>\n#include <span>\n#include <vector>\n\nstd::optional<std::size_t> frame_payload(\n    std::span<const std::byte> payload,\n    std::span<std::byte> output\n) {\n    if (payload.size() > 255 || output.size() < payload.size() + 2) {\n        return std::nullopt;\n    }\n    const std::vector<std::byte> snapshot(payload.begin(), payload.end());\n    output[0] = std::byte{0x7e};\n    output[1] = static_cast<std::byte>(snapshot.size());\n    std::copy(snapshot.begin(), snapshot.end(), output.begin() + 2);\n    return snapshot.size() + 2;\n}"
    },
    {
      "title": "Regression: overlapping input and output preserves payload bytes",
      "language": "cpp",
      "blurb": "Snapshotting makes the documented overlap behavior deterministic.",
      "code": "int test_frame_payload_overlap() {\n    std::array<std::byte, 8> storage{\n        std::byte{'A'}, std::byte{'B'}, std::byte{'C'}\n    };\n    const auto written = frame_payload(\n        std::span<const std::byte>{storage}.first(3), storage\n    );\n    if (written != 5) return 1;\n    if (storage[2] != std::byte{'A'} ||\n        storage[3] != std::byte{'B'} ||\n        storage[4] != std::byte{'C'}) return 2;\n    return 0;\n}"
    }
  ]
};
