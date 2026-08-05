window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Digest text is decoded under an exact algorithm and length contract before comparison.",
  "codeExamples": [
    {
      "title": "Decode a SHA-256 digest from lowercase hexadecimal",
      "language": "cpp",
      "blurb": "The decoder rejects uppercase, malformed, and wrong-length representations instead of normalizing ambiguity silently.",
      "code": "#include <array>\n#include <cstddef>\n#include <optional>\n#include <string_view>\n\nstd::optional<std::array<std::byte, 32>> decode_sha256_hex(std::string_view text) {\n    if (text.size() != 64) return std::nullopt;\n    auto nibble = [](char ch) -> int {\n        if (ch >= '0' && ch <= '9') return ch - '0';\n        if (ch >= 'a' && ch <= 'f') return ch - 'a' + 10;\n        return -1;\n    };\n    std::array<std::byte, 32> output{};\n    for (std::size_t index = 0; index < output.size(); ++index) {\n        int high = nibble(text[index * 2]);\n        int low = nibble(text[index * 2 + 1]);\n        if (high < 0 || low < 0) return std::nullopt;\n        output[index] = static_cast<std::byte>((high << 4) | low);\n    }\n    return output;\n}\n"
    },
    {
      "title": "Reject ambiguous digest encodings",
      "language": "cpp",
      "blurb": "The regression covers exact lowercase input, an uppercase character, and a truncated representation.",
      "code": "#include <string>\n\nint main() {\n    const std::string valid(64, 'a');\n    auto digest = decode_sha256_hex(valid);\n    if (!digest || (*digest)[0] != std::byte{0xaa}) return 1;\n    std::string uppercase = valid; uppercase[10] = 'A';\n    if (decode_sha256_hex(uppercase)) return 2;\n    if (decode_sha256_hex(valid.substr(1))) return 3;\n    return 0;\n}\n"
    }
  ]
};
