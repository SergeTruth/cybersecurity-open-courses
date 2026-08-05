window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply hashes, MACs, and password storage to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Derive a password verifier with a salt and explicit work policy",
      "language": "cpp",
      "blurb": "The example uses a password KDF rather than storing a fast unsalted hash.",
      "code": "#include <array>\n#include <climits>\n#include <cstddef>\n#include <span>\n#include <stdexcept>\n#include <string_view>\n#include <openssl/evp.h>\n\nstd::array<unsigned char, 32> derive_password_verifier(\n    std::string_view password,\n    std::span<const unsigned char, 16> salt,\n    int iterations) {\n    if (password.empty() || password.size() > 1024) {\n        throw std::invalid_argument(\"password length\");\n    }\n    if (iterations < 600000) {\n        throw std::invalid_argument(\"password work factor\");\n    }\n    std::array<unsigned char, 32> output{};\n    if (PKCS5_PBKDF2_HMAC(\n            password.data(), static_cast<int>(password.size()),\n            salt.data(), static_cast<int>(salt.size()),\n            iterations, EVP_sha256(),\n            static_cast<int>(output.size()), output.data()) != 1) {\n        throw std::runtime_error(\"password KDF failed\");\n    }\n    return output;\n}\n"
    },
    {
      "title": "Reject a caller-selected weak work factor",
      "language": "cpp",
      "blurb": "The application-owned minimum is enforced before the reviewed library primitive runs.",
      "code": "int test_password_verifier_rejects_weak_policy() {\n    std::array<unsigned char, 16> salt{};\n    try {\n        (void)derive_password_verifier(\"correct horse\", salt, 1000);\n        return 1;\n    } catch (const std::invalid_argument&) {\n        return 0;\n    }\n}\n"
    }
  ]
};
