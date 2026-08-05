window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Encrypted secret files require a reviewed envelope, a concrete key identifier, and restrictive metadata.",
  "codeExamples": [
    {
      "title": "Validate encrypted secret-file evidence",
      "language": "cpp",
      "blurb": "The application binds format, a nonempty bounded key identifier, owner, mode, and ciphertext size before decryption.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <string>\n#include <string_view>\n\nstruct SecretFileEvidence {\n    std::string format;\n    std::string key_id;\n    std::uint32_t owner_id;\n    std::uint32_t mode;\n    std::size_t ciphertext_bytes;\n};\n\nbool approved_key_identifier(std::string_view key_id) noexcept {\n    constexpr std::string_view prefix = \"kms://orders/\";\n    if (!key_id.starts_with(prefix)) return false;\n    const auto identifier = key_id.substr(prefix.size());\n    if (identifier.empty() || identifier.size() > 64 ||\n        identifier.front() == '/' || identifier.back() == '/') {\n        return false;\n    }\n    bool previous_separator = false;\n    for (unsigned char ch : identifier) {\n        if (ch == '/') {\n            if (previous_separator) return false;\n            previous_separator = true;\n            continue;\n        }\n        previous_separator = false;\n        const bool lowercase = ch >= 'a' && ch <= 'z';\n        const bool digit = ch >= '0' && ch <= '9';\n        if (!lowercase && !digit && ch != '-') return false;\n    }\n    return true;\n}\n\nbool approved_secret_file(\n    const SecretFileEvidence& file,\n    std::uint32_t expected_owner\n) noexcept {\n    if (file.format != \"orders-secret-v2\" ||\n        !approved_key_identifier(file.key_id)) {\n        return false;\n    }\n    if (file.owner_id != expected_owner || (file.mode & 0077u) != 0) {\n        return false;\n    }\n    return file.ciphertext_bytes >= 32 &&\n           file.ciphertext_bytes <= 64 * 1024;\n}\n"
    },
    {
      "title": "Reject empty key identifiers and broad permissions",
      "language": "cpp",
      "blurb": "The regression separates concrete encryption-key identity from filesystem authorization and ciphertext bounds.",
      "code": "int main() {\n    SecretFileEvidence valid{\n        \"orders-secret-v2\",\n        \"kms://orders/key-7\",\n        1001,\n        0600,\n        128\n    };\n    if (!approved_secret_file(valid, 1001)) return 1;\n    valid.key_id = \"kms://orders/\";\n    if (approved_secret_file(valid, 1001)) return 2;\n    valid.key_id = \"kms://orders/key-7\";\n    valid.mode = 0644;\n    if (approved_secret_file(valid, 1001)) return 3;\n    valid.mode = 0600;\n    valid.key_id = \"local://key\";\n    if (approved_secret_file(valid, 1001)) return 4;\n    valid.key_id = \"kms://orders/key-7\";\n    valid.ciphertext_bytes = 10;\n    if (approved_secret_file(valid, 1001)) return 5;\n    return 0;\n}\n"
    }
  ]
};
