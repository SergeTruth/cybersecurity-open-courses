window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Put cryptographic operations behind a reviewed provider, require an approved algorithm identifier, and keep key material outside general application objects.",
  "codeExamples": [
    {
      "title": "Request authenticated encryption through a provider interface",
      "language": "cpp",
      "blurb": "The application supplies plaintext and a key identifier; the provider owns key retrieval and cryptographic implementation details.",
      "code": "#include <utility>\n#include <array>\n#include <cstddef>\n#include <optional>\n#include <span>\n#include <string>\n#include <vector>\n\nstruct SealedMessage {\n    std::string key_id;\n    std::vector<std::byte> ciphertext;\n};\n\nclass CryptoProvider {\npublic:\n    virtual ~CryptoProvider() = default;\n    virtual std::optional<SealedMessage> seal(\n        std::string key_id,\n        std::span<const std::byte> plaintext,\n        std::span<const std::byte> associated_data\n    ) = 0;\n};\n\nstd::optional<SealedMessage> protect_order(\n    CryptoProvider& provider,\n    std::span<const std::byte> order,\n    std::span<const std::byte> context\n) {\n    if (order.empty() || order.size() > 65536 || context.empty()) {\n        return std::nullopt;\n    }\n    return provider.seal(\"orders-data-v4\", order, context);\n}"
    },
    {
      "title": "Regression: application policy reaches the crypto provider",
      "language": "cpp",
      "blurb": "A recording provider verifies key selection and associated-data binding without implementing homemade cryptography.",
      "code": "class RecordingCrypto final : public CryptoProvider {\npublic:\n    std::optional<SealedMessage> seal(\n        std::string key_id,\n        std::span<const std::byte> plaintext,\n        std::span<const std::byte> associated_data\n    ) override {\n        seen_key = key_id;\n        if (associated_data.empty()) return std::nullopt;\n        return SealedMessage{std::move(key_id),\n            std::vector<std::byte>(plaintext.begin(), plaintext.end())};\n    }\n    std::string seen_key;\n};\n\nint test_crypto_provider_boundary() {\n    RecordingCrypto provider;\n    const std::array<std::byte, 1> value{std::byte{7}};\n    if (!protect_order(provider, value, value)) return 1;\n    if (provider.seen_key != \"orders-data-v4\") return 2;\n    if (protect_order(provider, {}, value)) return 3;\n    return 0;\n}"
    }
  ]
};
