window.COURSE_CODE_MODULE = {
  "title": "Code Example: Preserve Capacity and Termination",
  "codeExamples": [
    {
      "title": "Preserve Capacity and Termination",
      "language": "c",
      "code": String.raw`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

int copy_complete_string(char *dest, size_t dest_cap, const char *source)
{
    size_t source_len;

    if (dest == NULL || source == NULL || dest_cap == 0U) {
        return -1;
    }
    if (bounded_length(source, dest_cap, &source_len) != 0) {
        return -1;
    }

    memmove(dest, source, source_len + 1U);
    return 0;
}

int build_label(char *dest, size_t dest_cap, const char *name)
{
    char *candidate;
    int written;

    if (dest == NULL || name == NULL || dest_cap == 0U) {
        return -1;
    }

    candidate = malloc(dest_cap);
    if (candidate == NULL) {
        return -1;
    }
    written = snprintf(candidate, dest_cap, "user:%s", name);
    if (written < 0 || (size_t)written >= dest_cap) {
        free(candidate);
        return -1;
    }

    memmove(dest, candidate, (size_t)written + 1U);
    free(candidate);
    return 0;
}

int main(void)
{
    char name[16];
    char label[24];

    if (copy_complete_string(name, sizeof(name), "alice") != 0 ||
        build_label(label, sizeof(label), name) != 0) {
        fputs("input was too long or invalid\n", stderr);
        return 1;
    }

    puts(label);
    return 0;
}
`
    }
  ]
};
