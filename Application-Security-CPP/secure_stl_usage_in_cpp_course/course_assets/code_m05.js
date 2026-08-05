window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A canonical identifier is an owning validated type rather than a retained string_view.",
  "codeExamples": [
    {
      "title": "Canonicalize an ASCII resource identifier",
      "language": "cpp",
      "blurb": "The factory lowercases a bounded ASCII input, rejects separators, and stores owned text.",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n\nconstexpr bool ascii_alphanumeric(unsigned char ch) noexcept {\n    return (ch >= 'A' && ch <= 'Z') ||\n           (ch >= 'a' && ch <= 'z') ||\n           (ch >= '0' && ch <= '9');\n}\n\nconstexpr char lowercase_ascii(unsigned char ch) noexcept {\n    return ch >= 'A' && ch <= 'Z'\n        ? static_cast<char>(ch - 'A' + 'a')\n        : static_cast<char>(ch);\n}\n\nstatic_assert(!ascii_alphanumeric(0xe9));\n\nclass ResourceId {\npublic:\n    static std::optional<ResourceId> parse(std::string_view input) {\n        if (input.empty() || input.size() > 40) return std::nullopt;\n        std::string canonical;\n        canonical.reserve(input.size());\n        for (unsigned char ch : input) {\n            if (!ascii_alphanumeric(ch) && ch != '-') {\n                return std::nullopt;\n            }\n            canonical.push_back(lowercase_ascii(ch));\n        }\n        return ResourceId(std::move(canonical));\n    }\n    std::string value() const { return value_; }\nprivate:\n    explicit ResourceId(std::string value) : value_(std::move(value)) {}\n    std::string value_;\n};\n"
    },
    {
      "title": "Verify ownership survives source mutation",
      "language": "cpp",
      "blurb": "The regression changes the original string after parsing and rejects a path-shaped identifier.",
      "code": "int main() {\n    std::string source = \"Order-7\";\n    auto id = ResourceId::parse(source);\n    source.assign(\"changed\");\n    if (!id || id->value() != \"order-7\") return 1;\n    if (ResourceId::parse(\"../admin\")) return 2;\n    if (ResourceId::parse(\"bad\\nvalue\")) return 3;\n    const std::string high_byte(1, static_cast<char>(0xe9));\n    if (ResourceId::parse(high_byte)) return 4;\n    return 0;\n}\n"
    }
  ]
};
