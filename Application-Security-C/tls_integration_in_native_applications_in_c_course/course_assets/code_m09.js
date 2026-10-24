window.COURSE_CODE_MODULE = {
  "title": "Testing, Logging, and Operational Readiness",
  "codeIntro": "Drain the OpenSSL error queue at the failure boundary, record bounded numeric categories, and never copy certificates, keys, plaintext, or peer-controlled strings into diagnostic events.",
  "codeExamples": [
    {
      "title": "Drain TLS errors into fixed diagnostic categories",
      "language": "c",
      "blurb": "The regression raises a synthetic OpenSSL error, captures only library and reason numbers, verifies the fixed event name, and proves the queue is empty afterward.",
      "code": "#include <assert.h>\n#include <stddef.h>\n#include <string.h>\n#include <openssl/err.h>\n#include <openssl/ssl.h>\n\ntypedef void (*tls_error_log_fn)(const char *, int, int, void *);\n\nstatic size_t drain_tls_errors(tls_error_log_fn logger, void *context)\n{\n    unsigned long code;\n    size_t count = 0U;\n\n    if (logger == NULL) {\n        return 0U;\n    }\n    while ((code = ERR_get_error()) != 0UL) {\n        logger(\"tls_operation_failed\", (int)ERR_GET_LIB(code),\n               (int)ERR_GET_REASON(code), context);\n        count += 1U;\n    }\n    return count;\n}\n\nstruct captured_event {\n    char name[32];\n    int library;\n    int reason;\n};\n\nstatic void capture_error(const char *name, int library, int reason,\n                          void *context)\n{\n    struct captured_event *event = context;\n    size_t length = strlen(name);\n\n    assert(event != NULL && length < sizeof event->name);\n    (void)memcpy(event->name, name, length + 1U);\n    event->library = library;\n    event->reason = reason;\n}\n\nint main(void)\n{\n    struct captured_event event = {{0}, 0, 0};\n    SSL_CTX *context = SSL_CTX_new(TLS_client_method());\n\n    assert(context != NULL);\n    ERR_clear_error();\n    ERR_raise(ERR_LIB_SSL, 1);\n    assert(drain_tls_errors(capture_error, &event) == 1U);\n    assert(strcmp(event.name, \"tls_operation_failed\") == 0);\n    assert(event.library == ERR_LIB_SSL);\n    assert(event.reason == 1);\n    assert(ERR_peek_error() == 0UL);\n    SSL_CTX_free(context);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror tls_integration_m09.c -o tls_integration_m09 $(pkg-config --cflags --libs openssl)\n./tls_integration_m09\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer tls_integration_m09.c -o tls_integration_m09_san $(pkg-config --cflags --libs openssl)\n./tls_integration_m09_san\n"
    }
  ]
};
