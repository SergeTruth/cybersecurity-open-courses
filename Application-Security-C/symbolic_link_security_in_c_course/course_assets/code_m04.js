window.COURSE_CODE_MODULE = {
  "title": "Avoiding Check-Then-Use Mistakes",
  "codeIntro": "A metadata check does not reserve a pathname. Make the final open operation itself reject links and validate the returned descriptor, even if an attacker replaces the directory entry after an earlier check.",
  "codeExamples": [
    {
      "title": "Reject a symlink replacement",
      "language": "c",
      "blurb": "A test hook swaps the checked entry for a symlink immediately before openat. O_NOFOLLOW makes the security decision at use time and the open fails closed.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"No-follow descriptor operations are required\"\n#endif\n\ntypedef int (*before_open_fn)(int, const char *);\n\nstatic int replace_with_link(int directory_fd, const char *name)\n{\n    if (unlinkat(directory_fd, name, 0) != 0) {\n        return -1;\n    }\n    return symlinkat(\"trusted.txt\", directory_fd, name);\n}\n\nstatic int open_after_check(int directory_fd, const char *name,\n                            before_open_fn before_open)\n{\n    struct stat checked;\n    struct stat opened;\n    int fd;\n\n    if (fstatat(directory_fd, name, &checked, AT_SYMLINK_NOFOLLOW) != 0 ||\n        !S_ISREG(checked.st_mode) ||\n        (before_open != NULL && before_open(directory_fd, name) != 0)) {\n        return -1;\n    }\n    fd = openat(directory_fd, name, O_RDONLY | O_CLOEXEC | O_NOFOLLOW);\n    if (fd < 0) {\n        return -1;\n    }\n    if (fstat(fd, &opened) != 0 || !S_ISREG(opened.st_mode)) {\n        (void)close(fd);\n        return -1;\n    }\n    return fd;\n}\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/symlink-m04-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    int directory_fd;\n    int fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    fd = openat(directory_fd, \"trusted.txt\",\n                O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC, 0600);\n    assert(fd >= 0 && close(fd) == 0);\n    fd = openat(directory_fd, \"candidate.txt\",\n                O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC, 0600);\n    assert(fd >= 0 && close(fd) == 0);\n    assert(open_after_check(directory_fd, \"candidate.txt\",\n                            replace_with_link) < 0);\n    assert(unlinkat(directory_fd, \"candidate.txt\", 0) == 0);\n    assert(unlinkat(directory_fd, \"trusted.txt\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror symbolic_link_security_m04.c -o symbolic_link_security_m04\n./symbolic_link_security_m04\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer symbolic_link_security_m04.c -o symbolic_link_security_m04_san\n./symbolic_link_security_m04_san\n"
    }
  ]
};
