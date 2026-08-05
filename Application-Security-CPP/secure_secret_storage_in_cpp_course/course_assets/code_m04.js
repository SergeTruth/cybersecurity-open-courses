window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "An approved store receives only a bounded secret reference with nonempty validated path segments.",
  "codeExamples": [
    {
      "title": "Load a secret through an approved provider",
      "language": "cpp",
      "blurb": "The wrapper rejects empty identifiers, empty segments, control characters, and unapproved namespaces before consulting the store.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <string_view>\n#include <vector>\n\nclass SecretStore {\npublic:\n    virtual ~SecretStore() = default;\n    virtual std::optional<std::vector<std::byte>> read(\n        std::string_view reference\n    ) = 0;\n};\n\nbool approved_secret_reference(std::string_view reference) noexcept {\n    constexpr std::string_view prefix = \"vault://orders/\";\n    if (!reference.starts_with(prefix)) return false;\n    const auto identifier = reference.substr(prefix.size());\n    if (identifier.empty() || identifier.size() > 48 ||\n        identifier.front() == '/' || identifier.back() == '/') {\n        return false;\n    }\n    bool previous_separator = false;\n    for (unsigned char ch : identifier) {\n        if (ch == '/') {\n            if (previous_separator) return false;\n            previous_separator = true;\n            continue;\n        }\n        previous_separator = false;\n        const bool lowercase = ch >= 'a' && ch <= 'z';\n        const bool digit = ch >= '0' && ch <= '9';\n        if (!lowercase && !digit && ch != '-') return false;\n    }\n    return true;\n}\n\nstd::optional<std::vector<std::byte>> load_secret(\n    SecretStore& store,\n    std::string_view reference\n) {\n    if (!approved_secret_reference(reference)) return std::nullopt;\n    auto secret = store.read(reference);\n    if (!secret || secret->empty() || secret->size() > 4096) {\n        return std::nullopt;\n    }\n    return secret;\n}\n"
    },
    {
      "title": "Reject empty, malformed, oversized, and unapproved results",
      "language": "cpp",
      "blurb": "The regression keeps the provider namespace and identifier grammar distinct from provider availability.",
      "code": "class TestSecretStore final : public SecretStore {\npublic:\n    explicit TestSecretStore(std::size_t size) : size_(size) {}\n    std::optional<std::vector<std::byte>> read(\n        std::string_view\n    ) override {\n        return std::vector<std::byte>(size_, std::byte{0x41});\n    }\nprivate:\n    std::size_t size_;\n};\n\nint main() {\n    TestSecretStore valid(32);\n    if (!load_secret(valid, \"vault://orders/api/token\")) return 1;\n    if (load_secret(valid, \"vault://orders/\")) return 2;\n    if (load_secret(valid, \"vault://orders//token\")) return 3;\n    if (load_secret(valid, \"env://API_TOKEN\")) return 4;\n    TestSecretStore empty(0);\n    TestSecretStore oversized(4097);\n    if (load_secret(empty, \"vault://orders/api/token\")) return 5;\n    if (load_secret(oversized, \"vault://orders/api/token\")) return 6;\n    return 0;\n}\n"
    }
  ]
};
