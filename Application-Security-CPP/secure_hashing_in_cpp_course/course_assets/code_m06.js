window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Canonicalization defines the exact bytes hashed for a small structured record.",
  "codeExamples": [
    {
      "title": "Canonicalize an order record before hashing",
      "language": "cpp",
      "blurb": "The encoder validates each field and emits an unambiguous length-prefixed representation.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <optional>\n#include <string>\n#include <string_view>\n#include <vector>\n\nconstexpr bool ascii_order_id_char(unsigned char ch) noexcept {\n    return (ch >= 'A' && ch <= 'Z') ||\n           (ch >= 'a' && ch <= 'z') ||\n           (ch >= '0' && ch <= '9') || ch == '-';\n}\n\nstatic_assert(!ascii_order_id_char(0xe9));\n\nvoid append_u16(std::vector<std::byte>& output, std::size_t value) {\n    output.push_back(static_cast<std::byte>((value >> 8) & 0xff));\n    output.push_back(static_cast<std::byte>(value & 0xff));\n}\n\nstd::optional<std::vector<std::byte>> canonical_order(\n    std::string_view order_id,\n    std::string_view currency,\n    std::uint64_t total_cents\n) {\n    if (order_id.empty() || order_id.size() > 32 || currency.size() != 3) return std::nullopt;\n    for (unsigned char ch : order_id) {\n        if (!ascii_order_id_char(ch)) return std::nullopt;\n    }\n    for (unsigned char ch : currency) if (ch < 'A' || ch > 'Z') return std::nullopt;\n    std::vector<std::byte> output;\n    output.reserve(2 + order_id.size() + 2 + currency.size() + 8);\n    append_u16(output, order_id.size());\n    for (unsigned char ch : order_id) output.push_back(static_cast<std::byte>(ch));\n    append_u16(output, currency.size());\n    for (unsigned char ch : currency) output.push_back(static_cast<std::byte>(ch));\n    for (int shift = 56; shift >= 0; shift -= 8) {\n        output.push_back(static_cast<std::byte>((total_cents >> shift) & 0xff));\n    }\n    return output;\n}\n"
    },
    {
      "title": "Prove field boundaries affect canonical bytes",
      "language": "cpp",
      "blurb": "The regression distinguishes two records that simple concatenation could make ambiguous.",
      "code": "int main() {\n    auto first = canonical_order(\"AB\", \"USD\", 10);\n    auto second = canonical_order(\"A\", \"BUS\", 10);\n    if (!first || !second || *first == *second) return 1;\n    if (canonical_order(\"AB\", \"usd\", 10)) return 2;\n    if (canonical_order(\"A/B\", \"USD\", 10)) return 3;\n    const std::string high_byte(1, static_cast<char>(0xe9));\n    if (canonical_order(high_byte, \"USD\", 10)) return 4;\n    return 0;\n}\n"
    }
  ]
};
