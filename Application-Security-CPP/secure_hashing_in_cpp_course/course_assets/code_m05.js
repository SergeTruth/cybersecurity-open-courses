window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Message authentication verifies a provider-produced HMAC with a fixed-size comparison.",
  "codeExamples": [
    {
      "title": "Verify an HMAC without accepting ambiguous lengths",
      "language": "cpp",
      "blurb": "The application requires a 32-byte tag and compares every byte after the approved provider computes the expected value.",
      "code": "#include <array>\n#include <cstddef>\n#include <span>\n\nclass HmacProvider {\npublic:\n    virtual ~HmacProvider() = default;\n    virtual bool hmac_sha256(std::span<const std::byte> message,\n                             std::array<std::byte, 32>& output) = 0;\n};\n\nbool verify_hmac(HmacProvider& provider,\n                 std::span<const std::byte> message,\n                 std::span<const std::byte> supplied) {\n    if (supplied.size() != 32) return false;\n    std::array<std::byte, 32> expected{};\n    if (!provider.hmac_sha256(message, expected)) return false;\n    unsigned difference = 0;\n    for (std::size_t index = 0; index < expected.size(); ++index) {\n        difference |= std::to_integer<unsigned>(expected[index] ^ supplied[index]);\n    }\n    return difference == 0;\n}\n"
    },
    {
      "title": "Exercise accepted, changed, and truncated tags",
      "language": "cpp",
      "blurb": "The test double isolates the comparison contract without presenting a homegrown MAC implementation.",
      "code": "class TestHmacProvider final : public HmacProvider {\npublic:\n    bool hmac_sha256(std::span<const std::byte>, std::array<std::byte, 32>& output) override {\n        output.fill(std::byte{0x5a});\n        return true;\n    }\n};\n\nint main() {\n    TestHmacProvider provider;\n    std::array<std::byte, 1> message{std::byte{1}};\n    std::array<std::byte, 32> tag{};\n    tag.fill(std::byte{0x5a});\n    if (!verify_hmac(provider, message, tag)) return 1;\n    tag[17] = std::byte{0};\n    if (verify_hmac(provider, message, tag)) return 2;\n    if (verify_hmac(provider, message, std::span(tag).first(31))) return 3;\n    return 0;\n}\n"
    }
  ]
};
