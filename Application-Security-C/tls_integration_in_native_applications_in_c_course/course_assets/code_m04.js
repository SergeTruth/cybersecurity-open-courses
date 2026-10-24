window.COURSE_CODE_MODULE = {
  "title": "Certificates, Trust Stores, and Identity",
  "codeIntro": "Client verification requires both a trust source and the expected peer identity. Configure certificate verification, load the approved trust store, and set SNI plus hostname verification before the handshake.",
  "codeExamples": [
    {
      "title": "Bind trust and hostname verification to a client connection",
      "language": "c",
      "blurb": "The context loads default trust paths, requires peer verification, and the SSL object receives both SNI and an X.509 hostname check. Empty identities are rejected.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <openssl/ssl.h>\n#include <openssl/x509v3.h>\n\nstatic bool configure_client_trust(SSL_CTX *context)\n{\n    if (context == NULL || SSL_CTX_set_default_verify_paths(context) != 1) {\n        return false;\n    }\n    SSL_CTX_set_verify(context, SSL_VERIFY_PEER, NULL);\n    return SSL_CTX_get_verify_mode(context) == SSL_VERIFY_PEER;\n}\n\nstatic bool configure_peer_identity(SSL *connection, const char *hostname)\n{\n    if (connection == NULL || hostname == NULL || hostname[0] == '\\0') {\n        return false;\n    }\n    return SSL_set_tlsext_host_name(connection, hostname) == 1 &&\n           SSL_set1_host(connection, hostname) == 1;\n}\n\nint main(void)\n{\n    SSL_CTX *context = SSL_CTX_new(TLS_client_method());\n    SSL *connection;\n\n    assert(context != NULL);\n    assert(configure_client_trust(context));\n    connection = SSL_new(context);\n    assert(connection != NULL);\n    assert(configure_peer_identity(connection, \"api.example.test\"));\n    assert(!configure_peer_identity(connection, \"\"));\n    SSL_free(connection);\n    SSL_CTX_free(context);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror tls_integration_m04.c -o tls_integration_m04 $(pkg-config --cflags --libs openssl)\n./tls_integration_m04\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer tls_integration_m04.c -o tls_integration_m04_san $(pkg-config --cflags --libs openssl)\n./tls_integration_m04_san\n"
    }
  ]
};
