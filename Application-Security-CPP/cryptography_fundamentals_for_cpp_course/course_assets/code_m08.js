window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply cryptographic misuse review to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Centralize an application-owned AEAD parameter policy",
      "language": "cpp",
      "blurb": "Review code can reject unsupported algorithms and dangerous nonce or tag sizes before library calls.",
      "code": "#include <cstddef>\n#include <string_view>\n\nstruct AeadParameters {\n    std::string_view algorithm;\n    std::size_t key_bytes;\n    std::size_t nonce_bytes;\n    std::size_t tag_bytes;\n};\n\nenum class CryptoReview {\n    approved,\n    algorithm,\n    key_size,\n    nonce_size,\n    tag_size\n};\n\nconstexpr CryptoReview review_aead(AeadParameters parameters) noexcept {\n    if (parameters.algorithm != \"AES-256-GCM\") return CryptoReview::algorithm;\n    if (parameters.key_bytes != 32) return CryptoReview::key_size;\n    if (parameters.nonce_bytes != 12) return CryptoReview::nonce_size;\n    if (parameters.tag_bytes != 16) return CryptoReview::tag_size;\n    return CryptoReview::approved;\n}\n"
    },
    {
      "title": "Regression-test the misuse cases individually",
      "language": "cpp",
      "blurb": "Each check identifies a distinct configuration error without invoking a generic sanitizer target.",
      "code": "int test_aead_review_rejects_misuse() {\n    if (review_aead({\"AES-256-GCM\", 32, 12, 16}) !=\n        CryptoReview::approved) return 1;\n    if (review_aead({\"AES-256-CBC\", 32, 12, 16}) !=\n        CryptoReview::algorithm) return 2;\n    if (review_aead({\"AES-256-GCM\", 32, 8, 16}) !=\n        CryptoReview::nonce_size) return 3;\n    if (review_aead({\"AES-256-GCM\", 32, 12, 8}) !=\n        CryptoReview::tag_size) return 4;\n    return 0;\n}\n"
    }
  ]
};
