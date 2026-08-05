window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Token formatting preserves every random bit and rejects ambiguous alphabets.",
  "codeExamples": [
    {
      "title": "Encode fixed random bytes as unpadded base64url",
      "language": "cpp",
      "blurb": "The formatter uses the URL-safe alphabet and emits a canonical representation with no padding variants.",
      "code": "#include <array>\n#include <cstddef>\n#include <string>\n#include <span>\n\nstd::string base64url_no_padding(std::span<const std::byte> input) {\n    static constexpr char alphabet[] =\n        \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_\";\n    std::string output;\n    output.reserve((input.size() * 4 + 2) / 3);\n    unsigned accumulator = 0;\n    unsigned bits = 0;\n    for (std::byte value : input) {\n        accumulator = (accumulator << 8) | std::to_integer<unsigned>(value);\n        bits += 8;\n        while (bits >= 6) { bits -= 6; output.push_back(alphabet[(accumulator >> bits) & 0x3f]); }\n    }\n    if (bits != 0) output.push_back(alphabet[(accumulator << (6 - bits)) & 0x3f]);\n    return output;\n}\n"
    },
    {
      "title": "Check canonical token formatting",
      "language": "cpp",
      "blurb": "The regression verifies known bytes, output length, and the absence of standard-base64 separators.",
      "code": "int main() {\n    std::array<std::byte, 3> bytes{std::byte{0xfb}, std::byte{0xff}, std::byte{0xff}};\n    const auto encoded = base64url_no_padding(bytes);\n    if (encoded != \"-___\") return 1;\n    if (encoded.find('+') != std::string::npos || encoded.find('/') != std::string::npos ||\n        encoded.find('=') != std::string::npos) return 2;\n    std::array<std::byte, 1> one{std::byte{0}};\n    if (base64url_no_padding(one) != \"AA\") return 3;\n    return 0;\n}\n"
    }
  ]
};
