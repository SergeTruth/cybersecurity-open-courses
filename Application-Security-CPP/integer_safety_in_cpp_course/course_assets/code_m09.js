window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Centralize legacy narrowing at a checked adapter, reject a missing callback, and call old code only with representable lengths.",
  "codeExamples": [
    {
      "title": "Wrap a legacy 16-bit length API",
      "language": "cpp",
      "blurb": "The adapter rejects null callbacks and unrepresentable spans before the function call or narrowing conversion.",
      "code": "\n#include <cstddef>\n#include <cstdint>\n#include <limits>\n#include <span>\n\nenum class LegacyStatus {\n    ok,\n    missing_callback,\n    too_large,\n    failed\n};\n\nusing LegacyWrite = int (*)(\n    const unsigned char*,\n    std::uint16_t\n);\n\nLegacyStatus write_legacy(\n    std::span<const unsigned char> bytes,\n    LegacyWrite write\n) {\n    if (write == nullptr) return LegacyStatus::missing_callback;\n    if (bytes.size() >\n        std::numeric_limits<std::uint16_t>::max()) {\n        return LegacyStatus::too_large;\n    }\n    const auto length =\n        static_cast<std::uint16_t>(bytes.size());\n    return write(bytes.data(), length) == 0\n        ? LegacyStatus::ok\n        : LegacyStatus::failed;\n}"
    },
    {
      "title": "Regression: missing and oversized legacy calls never dispatch",
      "language": "cpp",
      "blurb": "The call counter proves that null and too-wide inputs fail before old code executes.",
      "code": "\n#include <array>\n#include <vector>\n\nint test_legacy_adapter() {\n    static int calls = 0;\n    calls = 0;\n    auto writer = +[](\n        const unsigned char*,\n        std::uint16_t length\n    ) {\n        ++calls;\n        return length == 3 ? 0 : -1;\n    };\n    const std::array<unsigned char, 3> small{1, 2, 3};\n    if (write_legacy(small, nullptr) !=\n        LegacyStatus::missing_callback) return 1;\n    if (calls != 0) return 2;\n    if (write_legacy(small, writer) != LegacyStatus::ok) return 3;\n    if (calls != 1) return 4;\n    const std::vector<unsigned char> large(70000);\n    if (write_legacy(large, writer) !=\n        LegacyStatus::too_large) return 5;\n    if (calls != 1) return 6;\n    return 0;\n}"
    }
  ]
};
