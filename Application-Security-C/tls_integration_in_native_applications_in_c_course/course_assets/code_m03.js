window.COURSE_CODE_MODULE = {
  "title": "Choosing and Using a TLS Library",
  "codeIntro": "Use a maintained TLS implementation through its documented API, check initialization and context creation, and make the minimum protocol version explicit for both client and server roles.",
  "codeExamples": [
    {
      "title": "Create role-correct OpenSSL contexts",
      "language": "c",
      "blurb": "The regression initializes OpenSSL, creates distinct client and server contexts, applies a TLS 1.2 floor, and releases every context.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <openssl/ssl.h>\n\nstatic SSL_CTX *make_context(bool server)\n{\n    const SSL_METHOD *method = server ? TLS_server_method() :\n                                        TLS_client_method();\n    SSL_CTX *context = SSL_CTX_new(method);\n\n    if (context == NULL) {\n        return NULL;\n    }\n    if (SSL_CTX_set_min_proto_version(context, TLS1_2_VERSION) != 1) {\n        SSL_CTX_free(context);\n        return NULL;\n    }\n    return context;\n}\n\nint main(void)\n{\n    SSL_CTX *client;\n    SSL_CTX *server;\n\n    assert(OPENSSL_init_ssl(OPENSSL_INIT_LOAD_SSL_STRINGS, NULL) == 1);\n    assert(OpenSSL_version_num() != 0UL);\n    client = make_context(false);\n    server = make_context(true);\n    assert(client != NULL && server != NULL);\n    assert(SSL_CTX_get_min_proto_version(client) == TLS1_2_VERSION);\n    assert(SSL_CTX_get_min_proto_version(server) == TLS1_2_VERSION);\n    SSL_CTX_free(server);\n    SSL_CTX_free(client);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror tls_integration_m03.c -o tls_integration_m03 $(pkg-config --cflags --libs openssl)\n./tls_integration_m03\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer tls_integration_m03.c -o tls_integration_m03_san $(pkg-config --cflags --libs openssl)\n./tls_integration_m03_san\n"
    }
  ]
};
