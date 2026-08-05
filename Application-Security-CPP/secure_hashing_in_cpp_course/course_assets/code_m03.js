window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Hash computation is delegated to an approved provider while the application binds the algorithm identifier to the digest.",
  "codeExamples": [
    {
      "title": "Bind digest bytes to an approved algorithm",
      "language": "cpp",
      "blurb": "The wrapper rejects unapproved algorithms and owns the returned digest instead of exposing provider storage.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <string>\n#include <string_view>\n#include <utility>\n#include <vector>\n\nclass HashProvider {\npublic:\n    virtual ~HashProvider() = default;\n    virtual std::optional<std::vector<std::byte>> sha256(std::span<const std::byte> input) = 0;\n};\n\nstruct DigestRecord {\n    std::string algorithm;\n    std::vector<std::byte> bytes;\n};\n\nstd::optional<DigestRecord> hash_with_approved_provider(\n    HashProvider& provider,\n    std::string_view algorithm,\n    std::span<const std::byte> input\n) {\n    if (algorithm != \"sha-256\") return std::nullopt;\n    auto bytes = provider.sha256(input);\n    if (!bytes || bytes->size() != 32) return std::nullopt;\n    return DigestRecord{\"sha-256\", std::move(*bytes)};\n}\n"
    },
    {
      "title": "Reject wrong-size and unapproved provider results",
      "language": "cpp",
      "blurb": "A deterministic test double verifies the application-side algorithm and length contract.",
      "code": "#include <array>\n\nclass TestHashProvider final : public HashProvider {\npublic:\n    explicit TestHashProvider(std::size_t length) : length_(length) {}\n    std::optional<std::vector<std::byte>> sha256(std::span<const std::byte>) override {\n        return std::vector<std::byte>(length_, std::byte{0x2a});\n    }\nprivate:\n    std::size_t length_;\n};\n\nint main() {\n    std::array<std::byte, 1> input{std::byte{1}};\n    TestHashProvider good(32);\n    if (!hash_with_approved_provider(good, \"sha-256\", input)) return 1;\n    if (hash_with_approved_provider(good, \"md5\", input)) return 2;\n    TestHashProvider short_digest(16);\n    if (hash_with_approved_provider(short_digest, \"sha-256\", input)) return 3;\n    return 0;\n}\n"
    }
  ]
};
