window.COURSE_CODE_MODULE = {
  "title": "Data Sensitivity and Temporary Storage",
  "codeIntro": "When sensitive temporary storage is unavoidable, minimize name lifetime, restrict descriptor access, bound the data, and clear every in-memory plaintext buffer after its last required use.",
  "codeExamples": [
    {
      "title": "Unlink sensitive temporary storage immediately",
      "language": "c",
      "blurb": "The file remains usable through its descriptor after unlink, while pathname lookup fails and both the original staging buffer and the readback buffer are explicitly cleared.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n\nstatic void clear_bytes(uint8_t *buffer, size_t length)\n{\n    volatile uint8_t *cursor = buffer;\n    size_t index;\n\n    for (index = 0U; index < length; ++index) {\n        cursor[index] = 0U;\n    }\n}\n\nint main(void)\n{\n    char path[] = \"/tmp/temp-m06-XXXXXX\";\n    uint8_t secret[8] = {9U, 8U, 7U, 6U, 5U, 4U, 3U, 2U};\n    uint8_t observed[sizeof secret] = {0U};\n    int fd = mkstemp(path);\n    size_t index;\n\n    assert(fd >= 0);\n    assert(unlink(path) == 0);\n    assert(access(path, F_OK) != 0);\n    assert(write(fd, secret, sizeof secret) == (ssize_t)sizeof secret);\n    clear_bytes(secret, sizeof secret);\n    assert(lseek(fd, 0, SEEK_SET) == 0);\n    assert(read(fd, observed, sizeof observed) == (ssize_t)sizeof observed);\n    assert(observed[0] == 9U && observed[7] == 2U);\n    clear_bytes(observed, sizeof observed);\n    for (index = 0U; index < sizeof secret; ++index) {\n        assert(secret[index] == 0U);\n        assert(observed[index] == 0U);\n    }\n    assert(close(fd) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror temporary_file_security_m06.c -o temporary_file_security_m06\n./temporary_file_security_m06\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer temporary_file_security_m06.c -o temporary_file_security_m06_san\n./temporary_file_security_m06_san\n"
    }
  ]
};
