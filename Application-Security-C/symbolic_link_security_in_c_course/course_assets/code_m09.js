window.COURSE_CODE_MODULE = {
  "title": "Review, Testing, and Tool Support",
  "codeIntro": "A link-race regression should force replacement at the dangerous boundary instead of hoping to win a timing race. The final descriptor operation must reject the swapped entry.",
  "codeExamples": [
    {
      "title": "Inject a link replacement immediately before use",
      "language": "c",
      "blurb": "The hook replaces a regular candidate with a symlink after inspection; openat with O_NOFOLLOW rejects it and the target file remains untouched.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"No-follow descriptor operations are required\"\n#endif\n\ntypedef int (*race_hook_fn)(int, const char *);\n\nstatic int swap_for_symlink(int directory_fd, const char *name)\n{\n    return unlinkat(directory_fd, name, 0) == 0 &&\n           symlinkat(\"target\", directory_fd, name) == 0 ? 0 : -1;\n}\n\nstatic int reviewed_open(int directory_fd, const char *name,\n                         race_hook_fn race_hook)\n{\n    struct stat inspected;\n\n    if (fstatat(directory_fd, name, &inspected, AT_SYMLINK_NOFOLLOW) != 0 ||\n        !S_ISREG(inspected.st_mode) ||\n        (race_hook != NULL && race_hook(directory_fd, name) != 0)) {\n        return -1;\n    }\n    return openat(directory_fd, name,\n                  O_RDONLY | O_CLOEXEC | O_NOFOLLOW);\n}\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/symlink-m09-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    int directory_fd;\n    int fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    fd = openat(directory_fd, \"target\",\n                O_RDWR | O_CREAT | O_EXCL | O_CLOEXEC, 0600);\n    assert(fd >= 0 && close(fd) == 0);\n    fd = openat(directory_fd, \"candidate\",\n                O_RDWR | O_CREAT | O_EXCL | O_CLOEXEC, 0600);\n    assert(fd >= 0 && close(fd) == 0);\n    assert(reviewed_open(directory_fd, \"candidate\", swap_for_symlink) < 0);\n    fd = openat(directory_fd, \"target\", O_RDONLY | O_CLOEXEC | O_NOFOLLOW);\n    assert(fd >= 0 && close(fd) == 0);\n    assert(unlinkat(directory_fd, \"candidate\", 0) == 0);\n    assert(unlinkat(directory_fd, \"target\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror symbolic_link_security_m09.c -o symbolic_link_security_m09\n./symbolic_link_security_m09\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer symbolic_link_security_m09.c -o symbolic_link_security_m09_san\n./symbolic_link_security_m09_san\n"
    }
  ]
};
