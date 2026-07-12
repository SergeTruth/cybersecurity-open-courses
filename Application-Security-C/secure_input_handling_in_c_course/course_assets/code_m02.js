window.COURSE_CODE_MODULE = {
  "title": "Code Example: Treat Every Source as Untrusted",
  "codeExamples": [
    {
      "title": "Treat Every Source as Untrusted",
      "language": "c",
      "code": String.raw`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INPUT_NAME_MAX 64U

enum app_mode {
    MODE_READ_ONLY,
    MODE_BATCH
};

static int ascii_alphanumeric(unsigned char ch)
{
    return (ch >= (unsigned char)'A' && ch <= (unsigned char)'Z') ||
           (ch >= (unsigned char)'a' && ch <= (unsigned char)'z') ||
           (ch >= (unsigned char)'0' && ch <= (unsigned char)'9');
}

int parse_mode_from_env(enum app_mode *mode)
{
    const char *value;

    if (mode == NULL) {
        return -1;
    }
    value = getenv("APP_MODE");

    if (value == NULL || strcmp(value, "read-only") == 0) {
        *mode = MODE_READ_ONLY;
        return 0;
    }
    if (strcmp(value, "batch") == 0) {
        *mode = MODE_BATCH;
        return 0;
    }

    return -1;
}

int parse_input_name(const char *arg)
{
    size_t index;
    size_t length = 0U;

    /* Contract: arg is a readable, NUL-terminated C string. */
    if (arg == NULL) {
        return -1;
    }
    while (length <= INPUT_NAME_MAX && arg[length] != '\0') {
        length++;
    }
    if (length == 0U || length > INPUT_NAME_MAX ||
        !ascii_alphanumeric((unsigned char)arg[0]) ||
        !ascii_alphanumeric((unsigned char)arg[length - 1U])) {
        return -1;
    }

    for (index = 1U; index + 1U < length; index++) {
        unsigned char ch = (unsigned char)arg[index];
        if (!ascii_alphanumeric(ch) && ch != (unsigned char)'_' &&
            ch != (unsigned char)'-' && ch != (unsigned char)'.') {
            return -1;
        }
    }

    /* This is a logical name, not approval for a path or command argument. */
    return 0;
}

int main(int argc, char **argv)
{
    enum app_mode mode;

    if (argc != 2 || parse_mode_from_env(&mode) != 0 ||
        parse_input_name(argv[1]) != 0) {
        fputs("invalid command-line or environment input\n", stderr);
        return 1;
    }

    puts(mode == MODE_BATCH ? "batch mode" : "read-only mode");
    return 0;
}
`
    }
  ]
};
