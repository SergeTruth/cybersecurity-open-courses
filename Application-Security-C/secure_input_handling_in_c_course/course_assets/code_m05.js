window.COURSE_CODE_MODULE = {
  "title": "Code Example: Parse Numbers and Check Overflow",
  "codeExamples": [
    {
      "title": "Parse Numbers and Check Overflow",
      "language": "c",
      "code": String.raw`#include <errno.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

#define MAX_ARRAY_BYTES (16U * 1024U * 1024U)

static int canonical_decimal(const char *text)
{
    size_t index;

    if (text == NULL || text[0] < '1' || text[0] > '9') {
        return 0;
    }
    for (index = 1U; text[index] != '\0'; index++) {
        if (text[index] < '0' || text[index] > '9') {
            return 0;
        }
    }
    return 1;
}

int parse_port(const char *text, unsigned short *port)
{
    char *end = NULL;
    long value;

    if (port == NULL || !canonical_decimal(text)) {
        return -1;
    }

    errno = 0;
    value = strtol(text, &end, 10);
    if (errno != 0 || end == text || *end != '\0' ||
        value < 1L || value > 65535L) {
        return -1;
    }

    *port = (unsigned short)value;
    return 0;
}

int checked_array_bytes(size_t count, size_t element_size, size_t *bytes)
{
    size_t total;

    if (bytes == NULL || element_size == 0U ||
        count > SIZE_MAX / element_size) {
        return -1;
    }
    total = count * element_size;
    if (total > (size_t)MAX_ARRAY_BYTES) {
        return -1;
    }

    *bytes = total;
    return 0;
}
`
    }
  ]
};
