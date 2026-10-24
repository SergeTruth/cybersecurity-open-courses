window.COURSE_CODE_MODULE = {
  "title": "Trust Boundaries in File Paths",
  "codeIntro": "Treat a pathname as untrusted resolution input. Anchor operations to a directory descriptor, admit only one lexical component, require no-follow support at build time, and validate the opened object.",
  "codeExamples": [
    {
      "title": "Open a regular child beneath a trusted directory descriptor",
      "language": "c",
      "blurb": "The regression accepts a private regular file and rejects both traversal syntax and a symbolic-link child. Missing O_NOFOLLOW support is a build failure, never a silent zero-valued fallback.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdlib.h>\n#include <string.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"This example requires O_CLOEXEC, O_DIRECTORY, and O_NOFOLLOW\"\n#endif\n\nstatic bool safe_component(const char *name)\n{\n    return name != NULL && name[0] != '\\0' &&\n           strchr(name, '/') == NULL && strcmp(name, \".\") != 0 &&\n           strcmp(name, \"..\") != 0;\n}\n\nstatic int open_regular_child(int directory_fd, const char *name)\n{\n    struct stat status;\n    int fd;\n\n    if (directory_fd < 0 || !safe_component(name)) {\n        return -1;\n    }\n    fd = openat(directory_fd, name, O_RDONLY | O_CLOEXEC | O_NOFOLLOW);\n    if (fd < 0) {\n        return -1;\n    }\n    if (fstat(fd, &status) != 0 || !S_ISREG(status.st_mode)) {\n        (void)close(fd);\n        return -1;\n    }\n    return fd;\n}\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/symlink-m03-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    int directory_fd;\n    int file_fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    file_fd = openat(directory_fd, \"data.txt\",\n                     O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC, 0600);\n    assert(file_fd >= 0);\n    assert(close(file_fd) == 0);\n    assert(symlinkat(\"data.txt\", directory_fd, \"link.txt\") == 0);\n    file_fd = open_regular_child(directory_fd, \"data.txt\");\n    assert(file_fd >= 0);\n    assert(close(file_fd) == 0);\n    assert(open_regular_child(directory_fd, \"link.txt\") < 0);\n    assert(open_regular_child(directory_fd, \"../data.txt\") < 0);\n    assert(unlinkat(directory_fd, \"link.txt\", 0) == 0);\n    assert(unlinkat(directory_fd, \"data.txt\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror symbolic_link_security_m03.c -o symbolic_link_security_m03\n./symbolic_link_security_m03\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer symbolic_link_security_m03.c -o symbolic_link_security_m03_san\n./symbolic_link_security_m03_san\n"
    }
  ]
};
