window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validate Before Copying",
  "codeExamples": [
    {
      "title": "Validate Before Copying",
      "language": "c",
      "code": String.raw`#include <stdio.h>
#include <string.h>

#define USERNAME_CAP 32U

static int bounded_length(const char *text, size_t limit, size_t *length)
{
    size_t index;

    for (index = 0U; index < limit; index++) {
        if (text[index] == '\0') {
            *length = index;
            return 0;
        }
    }
    return -1;
}

static int valid_username_char(unsigned char ch)
{
    return (ch >= (unsigned char)'A' && ch <= (unsigned char)'Z') ||
           (ch >= (unsigned char)'a' && ch <= (unsigned char)'z') ||
           (ch >= (unsigned char)'0' && ch <= (unsigned char)'9') ||
           ch == (unsigned char)'_' || ch == (unsigned char)'-';
}

int copy_valid_username(char dest[USERNAME_CAP], const char *input)
{
    size_t index;
    size_t length;

    /* Contract: input is a readable, NUL-terminated C string. */
    if (dest == NULL || input == NULL) {
        return -1;
    }
    if (bounded_length(input, USERNAME_CAP, &length) != 0 || length == 0U) {
        return -1;
    }

    for (index = 0U; index < length; index++) {
        if (!valid_username_char((unsigned char)input[index])) {
            return -1;
        }
    }

    memmove(dest, input, length + 1U);
    return 0;
}

int main(int argc, char **argv)
{
    char username[USERNAME_CAP];

    if (argc != 2 || copy_valid_username(username, argv[1]) != 0) {
        fputs("usage: program <1-31 ASCII username>\n", stderr);
        return 1;
    }

    printf("accepted username: %s\n", username);
    return 0;
}
`
    }
  ]
};
