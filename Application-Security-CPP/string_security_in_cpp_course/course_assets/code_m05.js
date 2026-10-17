window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The decoder checks continuation bytes, overlong encodings, surrogate code points, and the Unicode ceiling.",
  "codeExamples": [
    {
      "title": "Validate UTF-8 without locale-dependent classification",
      "language": "cpp",
      "blurb": "The decoder checks continuation bytes, overlong encodings, surrogate code points, and the Unicode ceiling.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <span>\n\nbool valid_utf8(std::span<const unsigned char> input) noexcept {\n    for (std::size_t i = 0; i < input.size();) {\n        const auto first = input[i];\n        if (first <= 0x7f) { ++i; continue; }\n        std::size_t count = (first >= 0xc2 && first <= 0xdf) ? 2 :\n            (first >= 0xe0 && first <= 0xef) ? 3 :\n            (first >= 0xf0 && first <= 0xf4) ? 4 : 0;\n        if (count == 0 || count > input.size() - i) return false;\n        std::uint32_t value = first & (count == 2 ? 0x1f : count == 3 ? 0x0f : 0x07);\n        for (std::size_t n = 1; n < count; ++n) {\n            if ((input[i + n] & 0xc0) != 0x80) return false;\n            value = (value << 6) | (input[i + n] & 0x3f);\n        }\n        if ((count == 3 && value < 0x800) || (count == 4 && value < 0x10000) ||\n            (value >= 0xd800 && value <= 0xdfff) || value > 0x10ffff) return false;\n        i += count;\n    }\n    return true;\n}\n\nint main() {\n    const unsigned char valid[]{0x63, 0x61, 0x66, 0xc3, 0xa9};\n    const unsigned char overlong[]{0xc0, 0xaf};\n    const unsigned char forbidden[]{0xf8, 0x90, 0x80, 0x80};\n    if (valid_utf8(forbidden)) return 3;\n    if (!valid_utf8(valid)) return 1;\n    return valid_utf8(overlong) ? 2 : 0;\n}\n"
    }
  ]
};
