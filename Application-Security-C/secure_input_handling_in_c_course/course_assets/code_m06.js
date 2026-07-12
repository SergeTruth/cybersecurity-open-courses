window.COURSE_CODE_MODULE = {
  "title": "Code Example: Contain a POSIX File Open",
  "codeExamples": [
    {
      "title": "Contain a POSIX File Open",
      "language": "c",
      "code": String.raw`#define _GNU_SOURCE
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

#ifndef BASE_DIR
#define BASE_DIR "/srv/app/uploads"
#endif

#define MAX_FILE_BYTES ((off_t)1048576)

static int ascii_alphanumeric(unsigned char ch)
{
    return (ch >= (unsigned char)'A' && ch <= (unsigned char)'Z') ||
           (ch >= (unsigned char)'a' && ch <= (unsigned char)'z') ||
           (ch >= (unsigned char)'0' && ch <= (unsigned char)'9');
}

static int safe_file_name(const char *name)
{
    size_t index;
    size_t length = 0U;

    if (name == NULL) {
        return 0;
    }
    while (length <= 64U && name[length] != '\0') {
        length++;
    }
    if (length < 5U || length > 64U ||
        !ascii_alphanumeric((unsigned char)name[0]) ||
        strcmp(name + length - 4U, ".cfg") != 0) {
        return 0;
    }

    for (index = 1U; index < length - 4U; index++) {
        unsigned char ch = (unsigned char)name[index];
        if (!ascii_alphanumeric(ch) && ch != (unsigned char)'_' &&
            ch != (unsigned char)'-' && ch != (unsigned char)'.') {
            return 0;
        }
    }
    return 1;
}

static int open_config_directory(void)
{
    return open(BASE_DIR,
                O_RDONLY | O_DIRECTORY | O_CLOEXEC | O_NOFOLLOW);
}

int open_valid_config(const char *name, FILE **out)
{
    int directory_fd;
    int file_fd;
    struct stat file_info;
    FILE *file;

    /* Output-slot contract: callers pass an empty owner slot. */
    if (out == NULL || *out != NULL || !safe_file_name(name)) {
        return -1;
    }

    directory_fd = open_config_directory();
    if (directory_fd < 0) {
        return -1;
    }
    /* O_NONBLOCK prevents a FIFO from stalling before fstat rejects it. */
    file_fd = openat(directory_fd, name,
                     O_RDONLY | O_CLOEXEC | O_NOFOLLOW | O_NONBLOCK);
    (void)close(directory_fd);
    if (file_fd < 0) {
        return -1;
    }

    if (fstat(file_fd, &file_info) != 0 ||
        !S_ISREG(file_info.st_mode) || file_info.st_size < (off_t)0 ||
        file_info.st_size > MAX_FILE_BYTES) {
        (void)close(file_fd);
        return -1;
    }

    file = fdopen(file_fd, "rb");
    if (file == NULL) {
        (void)close(file_fd);
        return -1;
    }

    /* Enforce the same byte limit while reading if files can change. */
    *out = file;
    return 0;
}
`
    }
  ]
};
