window.COURSE_CODE_MODULE = {
  "title": "Secure TLS Configuration",
  "codeIntro": "Turn protocol and algorithm policy into checked context configuration. Set a supported version range, disable compression, select approved TLS 1.2 and TLS 1.3 suites, and require peer verification.",
  "codeExamples": [
    {
      "title": "Apply an explicit client TLS policy",
      "language": "c",
      "blurb": "The executable test inspects the configured version floor, ceiling, compression option, and verification mode after every setter succeeds.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <openssl/ssl.h>\n\nstatic bool apply_client_policy(SSL_CTX *context)\n{\n    if (context == NULL ||\n        SSL_CTX_set_min_proto_version(context, TLS1_2_VERSION) != 1 ||\n        SSL_CTX_set_max_proto_version(context, TLS1_3_VERSION) != 1 ||\n        SSL_CTX_set_cipher_list(context,\n            \"ECDHE-ECDSA-AES256-GCM-SHA384:\"\n            \"ECDHE-RSA-AES256-GCM-SHA384\") != 1 ||\n        SSL_CTX_set_ciphersuites(context,\n            \"TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256\") != 1) {\n        return false;\n    }\n    (void)SSL_CTX_set_options(context, SSL_OP_NO_COMPRESSION);\n    SSL_CTX_set_verify(context, SSL_VERIFY_PEER, NULL);\n    return true;\n}\n\nint main(void)\n{\n    SSL_CTX *context = SSL_CTX_new(TLS_client_method());\n\n    assert(context != NULL);\n    assert(apply_client_policy(context));\n    assert(SSL_CTX_get_min_proto_version(context) == TLS1_2_VERSION);\n    assert(SSL_CTX_get_max_proto_version(context) == TLS1_3_VERSION);\n    assert((SSL_CTX_get_options(context) & SSL_OP_NO_COMPRESSION) != 0UL);\n    assert(SSL_CTX_get_verify_mode(context) == SSL_VERIFY_PEER);\n    SSL_CTX_free(context);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror tls_integration_m05.c -o tls_integration_m05 $(pkg-config --cflags --libs openssl)\n./tls_integration_m05\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer tls_integration_m05.c -o tls_integration_m05_san $(pkg-config --cflags --libs openssl)\n./tls_integration_m05_san\n"
    }
  ]
};
