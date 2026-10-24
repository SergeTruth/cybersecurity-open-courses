window.COURSE_CODE_MODULE = {
  "title": "Directories, Paths, and Trust Boundaries",
  "codeIntro": "Choose a trusted temporary directory, open it as a descriptor, and create children relative to that descriptor. A unique mode-0700 directory gives the fixed internal name a narrow trust boundary.",
  "codeExamples": [
    {
      "title": "Create a temporary child beneath a private directory",
      "language": "c",
      "blurb": "The regression opens the directory first, validates type, owner, and mode on that descriptor, and removes the child and directory through checked cleanup paths.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <fcntl.h>\n#include <stdlib.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\n#if !defined(O_CLOEXEC) || !defined(O_DIRECTORY) || !defined(O_NOFOLLOW)\n#error \"Descriptor-relative no-follow creation is required\"\n#endif\n\nint main(void)\n{\n    char directory_template[] = \"/tmp/temp-m04-XXXXXX\";\n    char *directory = mkdtemp(directory_template);\n    struct stat status;\n    int directory_fd;\n    int file_fd;\n\n    assert(directory != NULL);\n    directory_fd = open(directory, O_RDONLY | O_DIRECTORY |\n                        O_CLOEXEC | O_NOFOLLOW);\n    assert(directory_fd >= 0);\n    assert(fstat(directory_fd, &status) == 0);\n    assert(S_ISDIR(status.st_mode));\n    assert(status.st_uid == geteuid());\n    assert((status.st_mode & 077) == 0);\n    file_fd = openat(directory_fd, \"report.tmp\",\n                     O_WRONLY | O_CREAT | O_EXCL | O_CLOEXEC |\n                     O_NOFOLLOW, 0600);\n    assert(file_fd >= 0);\n    assert(close(file_fd) == 0);\n    assert(unlinkat(directory_fd, \"report.tmp\", 0) == 0);\n    assert(close(directory_fd) == 0);\n    assert(rmdir(directory) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror temporary_file_security_m04.c -o temporary_file_security_m04\n./temporary_file_security_m04\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer temporary_file_security_m04.c -o temporary_file_security_m04_san\n./temporary_file_security_m04_san\n"
    }
  ]
};
