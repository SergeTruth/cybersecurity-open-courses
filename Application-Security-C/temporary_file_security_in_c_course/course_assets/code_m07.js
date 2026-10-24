window.COURSE_CODE_MODULE = {
  "title": "Lifetime, Cleanup, and Failure Paths",
  "codeIntro": "Every successful creation must converge on close and unlink, including write failure. Evaluate cleanup operations independently so a failed write cannot short-circuit fclose.",
  "codeExamples": [
    {
      "title": "Prove cleanup after injected write failure",
      "language": "c",
      "blurb": "Both successful and failing writers are exercised. Each path closes the stream, unlinks the pathname, and leaves no reusable temporary artifact.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\n\ntypedef bool (*writer_fn)(FILE *, const char *);\n\nstatic bool good_writer(FILE *stream, const char *text)\n{\n    return fputs(text, stream) >= 0;\n}\n\nstatic bool failing_writer(FILE *stream, const char *text)\n{\n    (void)stream;\n    (void)text;\n    return false;\n}\n\nstatic bool write_and_remove(char *path_template, const char *text,\n                             writer_fn writer)\n{\n    FILE *stream;\n    int fd;\n    bool write_ok;\n    bool close_ok;\n    bool unlink_ok;\n\n    if (path_template == NULL || text == NULL || writer == NULL) {\n        return false;\n    }\n    fd = mkstemp(path_template);\n    if (fd < 0) {\n        return false;\n    }\n    stream = fdopen(fd, \"w\");\n    if (stream == NULL) {\n        (void)close(fd);\n        (void)unlink(path_template);\n        return false;\n    }\n    write_ok = writer(stream, text);\n    close_ok = fclose(stream) == 0;\n    unlink_ok = unlink(path_template) == 0;\n    return write_ok && close_ok && unlink_ok;\n}\n\nint main(void)\n{\n    char success_path[] = \"/tmp/temp-m07-ok-XXXXXX\";\n    char failure_path[] = \"/tmp/temp-m07-fail-XXXXXX\";\n\n    assert(write_and_remove(success_path, \"report\", good_writer));\n    assert(access(success_path, F_OK) != 0);\n    assert(!write_and_remove(failure_path, \"report\", failing_writer));\n    assert(access(failure_path, F_OK) != 0);\n    assert(!write_and_remove(NULL, \"report\", good_writer));\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror temporary_file_security_m07.c -o temporary_file_security_m07\n./temporary_file_security_m07\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer temporary_file_security_m07.c -o temporary_file_security_m07_san\n./temporary_file_security_m07_san\n"
    }
  ]
};
