window.COURSE_CODE_MODULE = {
  "title": "Descriptor-First File Handling",
  "codeIntro": "Open first with no-follow semantics, then derive type, owner, and permission decisions from fstat on that descriptor. This binds validation to the object the program will actually use.",
  "codeExamples": [
    {
      "title": "Validate a private regular file after open",
      "language": "c",
      "blurb": "The helper accepts an owner-matched mode-0600 file, rejects broader permissions, and never substitutes a pathname check for descriptor metadata.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <sys/types.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"No-follow descriptor operations are required\"\n#endif\n\nstatic int open_private_regular(int directory_fd, const char *name,\n                                uid_t expected_owner)\n{\n    struct stat status;\n    int fd = openat(directory_fd, name,\n                    O_RDONLY | O_CLOEXEC | O_NOFOLLOW);\n\n    if (fd < 0) {\n        return -1;\n    }\n    if (fstat(fd, &status) != 0 || !S_ISREG(status.st_mode) ||\n        status.st_uid != expected_owner || (status.st_mode & 077) != 0) {\n        (void)close(fd);\n        return -1;\n    }\n    return fd;\n}\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/symlink-m05-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    int directory_fd;\n    int fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    fd = openat(directory_fd, \"private.dat\",\n                O_RDWR | O_CREAT | O_EXCL | O_CLOEXEC, 0600);\n    assert(fd >= 0 && close(fd) == 0);\n    fd = open_private_regular(directory_fd, \"private.dat\", geteuid());\n    assert(fd >= 0 && close(fd) == 0);\n    assert(fchmodat(directory_fd, \"private.dat\", 0644, 0) == 0);\n    assert(open_private_regular(directory_fd, \"private.dat\", geteuid()) < 0);\n    assert(unlinkat(directory_fd, \"private.dat\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror symbolic_link_security_m05.c -o symbolic_link_security_m05\n./symbolic_link_security_m05\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer symbolic_link_security_m05.c -o symbolic_link_security_m05_san\n./symbolic_link_security_m05_san\n"
    }
  ]
};
