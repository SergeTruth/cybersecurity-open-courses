window.COURSE_CODE_MODULE = {
  "title": "Permissions, Ownership, and Privileged Contexts",
  "codeIntro": "Privileged code must validate the opened object's owner, type, and mode before consuming it. Directory trust and a safe name do not make broad file permissions acceptable.",
  "codeExamples": [
    {
      "title": "Enforce an owner-and-mode contract on the descriptor",
      "language": "c",
      "blurb": "The same file is rejected at mode 0640 and accepted at mode 0600, proving that the decision follows descriptor metadata rather than the path string.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdbool.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <sys/types.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"No-follow descriptor operations are required\"\n#endif\n\nstatic bool descriptor_is_private(int fd, uid_t expected_owner)\n{\n    struct stat status;\n\n    return fd >= 0 && fstat(fd, &status) == 0 &&\n           S_ISREG(status.st_mode) && status.st_uid == expected_owner &&\n           (status.st_mode & 077) == 0;\n}\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/symlink-m07-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    int directory_fd;\n    int fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    fd = openat(directory_fd, \"policy.dat\",\n                O_RDWR | O_CREAT | O_EXCL | O_CLOEXEC | O_NOFOLLOW,\n                0600);\n    assert(fd >= 0);\n    assert(fchmod(fd, 0640) == 0);\n    assert(!descriptor_is_private(fd, geteuid()));\n    assert(fchmod(fd, 0600) == 0);\n    assert(descriptor_is_private(fd, geteuid()));\n    assert(close(fd) == 0);\n    assert(unlinkat(directory_fd, \"policy.dat\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror symbolic_link_security_m07.c -o symbolic_link_security_m07\n./symbolic_link_security_m07\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer symbolic_link_security_m07.c -o symbolic_link_security_m07_san\n./symbolic_link_security_m07_san\n"
    }
  ]
};
