window.COURSE_CODE_MODULE = {
  "title": "Numeric Argument Validation",
  "codeIntro": "Compare permissive conversion with decimal-only, range-aware validation for the same worker-count option.",
  "codeExamples": [
    {
      "title": "Vulnerable: Accept a worker count with atoi",
      "language": "c",
      "blurb": "atoi cannot report overflow or trailing data, and casting a negative result turns an invalid count into a very large size.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

static bool parse_workers(const char *text, size_t *out)
{
    int value = 0;

    if (text == NULL || out == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: atoi accepts prefixes and provides no error status. */
    value = atoi(text);
    if (value == 0) {
        return false;
    }
    *out = (size_t)value;
    return true;
}

int main(void)
{
    size_t workers = 0u;

    assert(parse_workers("8", &workers));
    assert(workers == 8u);

    /* TEST: malformed and negative inputs are incorrectly accepted. */
    assert(parse_workers("8workers", &workers));
    assert(workers == 8u);
    assert(parse_workers("-1", &workers));
    assert(workers > 1024u);
    return 0;
}
`
    },
    {
      "title": "Safer: Parse a bounded decimal worker count",
      "language": "c",
      "blurb": "The corrected parser requires decimal digits only, checks conversion errors and policy bounds, and proves downstream allocation multiplication is safe.",
      "code": String.raw`#include <assert.h>
#include <errno.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct {
    unsigned char state[64];
} Worker;

static bool parse_workers(const char *text, size_t *out)
{
    char *end = NULL;
    unsigned long long value = 0u;
    size_t i = 0u;

    if (text == NULL || out == NULL || text[0] == '\0') {
        return false;
    }
    while (text[i] != '\0') {
        if (text[i] < '0' || text[i] > '9') {
            return false;
        }
        i++;
    }

    errno = 0;
    value = strtoull(text, &end, 10);
    /* IMPORTANT FIX: check syntax, conversion, policy, and later arithmetic. */
    if (errno != 0 || end == text || *end != '\0' ||
        value < 1u || value > 1024u ||
        value > (unsigned long long)(SIZE_MAX / sizeof(Worker))) {
        return false;
    }

    *out = (size_t)value;
    return true;
}

int main(void)
{
    size_t workers = 0u;

    /* TEST: both accepted boundaries are safe for allocation sizing. */
    assert(parse_workers("1", &workers) && workers == 1u);
    assert(parse_workers("1024", &workers) && workers == 1024u);
    assert(workers <= SIZE_MAX / sizeof(Worker));

    /* TEST: sign, partial text, range, and conversion overflow are rejected. */
    assert(!parse_workers("0", &workers));
    assert(!parse_workers("-1", &workers));
    assert(!parse_workers("8workers", &workers));
    assert(!parse_workers("1025", &workers));
    assert(!parse_workers("999999999999999999999999999", &workers));
    return 0;
}
`
    }
  ]
};
