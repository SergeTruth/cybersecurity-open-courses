window.COURSE_CODE_MODULE = {
  "title": "Permissions and Access Control",
  "codeIntro": "Verify temporary-file permissions on the descriptor rather than assuming a process umask or library default. Reject any group or other access before storing data.",
  "codeExamples": [
    {
      "title": "Enforce mode 0600 on a unique temporary file",
      "language": "c",
      "blurb": "The test checks the descriptor metadata after fchmod and proves that broadening the mode causes the policy check to fail.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <stdbool.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\nstatic bool descriptor_is_private(int fd)\n{\n    struct stat status;\n\n    return fd >= 0 && fstat(fd, &status) == 0 &&\n           S_ISREG(status.st_mode) && (status.st_mode & 077) == 0;\n}\n\nint main(void)\n{\n    char path[] = \"/tmp/temp-m05-XXXXXX\";\n    int fd = mkstemp(path);\n\n    assert(fd >= 0);\n    assert(fchmod(fd, 0600) == 0);\n    assert(descriptor_is_private(fd));\n    assert(fchmod(fd, 0644) == 0);\n    assert(!descriptor_is_private(fd));\n    assert(fchmod(fd, 0600) == 0);\n    assert(close(fd) == 0);\n    assert(unlink(path) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror temporary_file_security_m05.c -o temporary_file_security_m05\n./temporary_file_security_m05\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer temporary_file_security_m05.c -o temporary_file_security_m05_san\n./temporary_file_security_m05_san\n"
    }
  ]
};
