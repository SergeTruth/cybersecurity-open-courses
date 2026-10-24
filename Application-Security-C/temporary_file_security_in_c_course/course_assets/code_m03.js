window.COURSE_CODE_MODULE = {
  "title": "Safe Temporary File Creation",
  "codeIntro": "Validate inputs before creating anything, use mkstemp for atomic unique creation, unlink the name when persistence is unnecessary, and close independently of write success.",
  "codeExamples": [
    {
      "title": "Create, write, close, and unlink a temporary report",
      "language": "c",
      "blurb": "The null-input path returns before mkstemp. The successful path includes stdlib.h, unlinks immediately, and always evaluates fclose even when the write fails.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\n#include <unistd.h>\n\nstatic bool write_temp_report(const char *text)\n{\n    char path[] = \"/tmp/temp-m03-XXXXXX\";\n    FILE *stream;\n    int fd;\n    bool write_ok;\n    bool close_ok;\n\n    if (text == NULL) {\n        return false;\n    }\n    fd = mkstemp(path);\n    if (fd < 0) {\n        return false;\n    }\n    if (unlink(path) != 0) {\n        (void)close(fd);\n        return false;\n    }\n    stream = fdopen(fd, \"w\");\n    if (stream == NULL) {\n        (void)close(fd);\n        return false;\n    }\n    write_ok = fputs(text, stream) >= 0;\n    close_ok = fclose(stream) == 0;\n    return write_ok && close_ok;\n}\n\nint main(void)\n{\n    assert(!write_temp_report(NULL));\n    assert(write_temp_report(\"bounded report\\n\"));\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror temporary_file_security_m03.c -o temporary_file_security_m03\n./temporary_file_security_m03\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer temporary_file_security_m03.c -o temporary_file_security_m03_san\n./temporary_file_security_m03_san\n"
    }
  ]
};
