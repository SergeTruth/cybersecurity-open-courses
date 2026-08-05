window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply public-key signatures and certificates to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Verify a detached signature with an approved EVP key",
      "language": "cpp",
      "blurb": "The public key is supplied by a separately validated certificate chain and the library performs the signature comparison.",
      "code": "#include <array>\n#include <cstddef>\n#include <memory>\n#include <span>\n#include <stdexcept>\n#include <openssl/evp.h>\n\nusing DigestContext =\n    std::unique_ptr<EVP_MD_CTX, decltype(&EVP_MD_CTX_free)>;\n\nbool verify_sha256_signature(\n    EVP_PKEY& verified_public_key,\n    std::span<const unsigned char> message,\n    std::span<const unsigned char> signature) {\n    if (message.empty() || signature.empty()) return false;\n    DigestContext context(EVP_MD_CTX_new(), &EVP_MD_CTX_free);\n    if (!context) throw std::runtime_error(\"digest context allocation failed\");\n    if (EVP_DigestVerifyInit(context.get(), nullptr, EVP_sha256(), nullptr,\n                             &verified_public_key) != 1 ||\n        EVP_DigestVerifyUpdate(context.get(), message.data(), message.size()) != 1) {\n        throw std::runtime_error(\"signature verification setup failed\");\n    }\n    const int result = EVP_DigestVerifyFinal(\n        context.get(), signature.data(), signature.size());\n    if (result < 0) throw std::runtime_error(\"signature verification error\");\n    return result == 1;\n}\n"
    },
    {
      "title": "Fail closed before public-key verification on empty evidence",
      "language": "cpp",
      "blurb": "The boundary does not treat missing message or signature bytes as an authentic object.",
      "code": "int test_signature_verifier_rejects_missing_evidence(EVP_PKEY& key) {\n    const std::array<unsigned char, 1> one{1};\n    if (verify_sha256_signature(key, {}, one)) return 1;\n    if (verify_sha256_signature(key, one, {})) return 2;\n    return 0;\n}\n"
    }
  ]
};
