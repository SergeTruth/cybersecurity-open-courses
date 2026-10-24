window.COURSE_CODE_MODULE = {
  "title": "Creation, Replacement, and Temporary Files",
  "codeIntro": "Create new files atomically beneath a trusted directory descriptor. O_EXCL prevents replacement, O_NOFOLLOW rejects a link at the final component, and restrictive creation mode avoids a later permission window.",
  "codeExamples": [
    {
      "title": "Create a new child without replacing a link",
      "language": "c",
      "blurb": "The regression proves that a preexisting symlink cannot be replaced and that a fresh mode-0600 child is created successfully.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"No-follow descriptor operations are required\"\n#endif\n\nstatic int create_private_child(int directory_fd, const char *name)\n{\n    return openat(directory_fd, name,\n                  O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC | O_NOFOLLOW,\n                  0600);\n}\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/symlink-m06-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    struct stat status;\n    int directory_fd;\n    int fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    assert(symlinkat(\"missing-target\", directory_fd, \"report\") == 0);\n    assert(create_private_child(directory_fd, \"report\") < 0);\n    assert(unlinkat(directory_fd, \"report\", 0) == 0);\n    fd = create_private_child(directory_fd, \"report\");\n    assert(fd >= 0);\n    assert(fstat(fd, &status) == 0 && S_ISREG(status.st_mode));\n    assert((status.st_mode & 077) == 0);\n    assert(close(fd) == 0);\n    assert(unlinkat(directory_fd, \"report\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror symbolic_link_security_m06.c -o symbolic_link_security_m06\n./symbolic_link_security_m06\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer symbolic_link_security_m06.c -o symbolic_link_security_m06_san\n./symbolic_link_security_m06_san\n"
    }
  ]
};
