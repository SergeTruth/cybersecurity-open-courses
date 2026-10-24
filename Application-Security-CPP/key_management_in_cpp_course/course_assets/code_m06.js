window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Ask a key service to perform authenticated encryption and bind the ciphertext to tenant and record context.",
  "codeExamples": [
    {
      "title": "Create an envelope carrying its key identifier",
      "language": "cpp",
      "blurb": "The KMS chooses and uses the key; the application stores the returned key ID, nonce, and authenticated ciphertext.",
      "code": "#include <cstddef>\n#include <optional>\n#include <span>\n#include <string>\n#include <vector>\n\nstruct Envelope {\n    std::string key_id;\n    std::vector<std::byte> nonce;\n    std::vector<std::byte> ciphertext_and_tag;\n};\n\nclass KeyService {\npublic:\n    virtual ~KeyService() = default;\n    virtual std::optional<Envelope> encrypt(\n        std::string key_purpose,\n        std::span<const std::byte> plaintext,\n        std::span<const std::byte> associated_data\n    ) = 0;\n};\n\nstd::optional<Envelope> encrypt_order(\n    KeyService& keys,\n    std::span<const std::byte> plaintext,\n    std::span<const std::byte> tenant_and_order\n) {\n    if (plaintext.empty() || plaintext.size() > 65536 ||\n        tenant_and_order.empty()) return std::nullopt;\n    auto envelope = keys.encrypt(\n        \"orders-data\", plaintext, tenant_and_order\n    );\n    if (!envelope || envelope->key_id.empty() ||\n        envelope->nonce.size() != 12 ||\n        envelope->ciphertext_and_tag.size() < 16) return std::nullopt;\n    return envelope;\n}"
    },
    {
      "title": "Regression: context and authenticated output are mandatory",
      "language": "cpp",
      "blurb": "A malformed backend response is rejected before persistence.",
      "code": "#include <array>\nclass FakeKeyService final : public KeyService {\npublic:\n    std::optional<Envelope> encrypt(\n        std::string,\n        std::span<const std::byte> plaintext,\n        std::span<const std::byte> context\n    ) override {\n        if (context.empty()) return std::nullopt;\n        return Envelope{\n            \"kms://orders/data/4\",\n            std::vector<std::byte>(12),\n            std::vector<std::byte>(plaintext.size() + 16)\n        };\n    }\n};\n\nint test_envelope_encryption() {\n    FakeKeyService keys;\n    const std::array<std::byte, 2> value{std::byte{1}, std::byte{2}};\n    if (!encrypt_order(keys, value, value)) return 1;\n    if (encrypt_order(keys, value, {})) return 2;\n    return 0;\n}"
    }
  ]
};
