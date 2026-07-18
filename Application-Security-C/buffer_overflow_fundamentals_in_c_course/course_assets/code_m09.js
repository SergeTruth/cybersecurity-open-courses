window.COURSE_CODE_MODULE = {
  "title": "Code Review and Production Readiness: code example",
  "codeIntro": "Production failure reporting should preserve useful context without treating arbitrary input bytes as a string or exposing their contents.",
  "codeExamples": [
    {
      "title": "Vulnerable: diagnostic logs raw input",
      "language": "c",
      "blurb": "The logger discards the validated byte length and prints through a terminator, exposing data beyond the region under review.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool report_failure(char *dst, size_t capacity, const char *input)
{
    int written;

    if (dst == NULL || input == NULL || capacity == 0u) {
        return false;
    }
    /* IMPORTANT DEFECT: arbitrary input is logged as an unlimited string. */
    written = snprintf(dst, capacity, "rejected packet: %s", input);
    return written >= 0 && (size_t)written < capacity;
}

int main(void)
{
    const char input[] = "TOKEN";
    const size_t validated_length = 3u;
    char diagnostic[64];

    assert(validated_length == 3u);
    assert(report_failure(diagnostic, sizeof diagnostic, input));
    /* TEST: bytes outside the validated region reached production output. */
    assert(strstr(diagnostic, "TOKEN") != NULL);
    return 0;
}
`
    },
    {
      "title": "Safer: log bounded metadata, not contents",
      "language": "c",
      "blurb": "The diagnostic uses program-controlled categories and the validated size, providing review context without dumping the input buffer.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

enum failure_category { FAILURE_OVERLONG, FAILURE_TRUNCATED };

static const char *category_text(enum failure_category category)
{
    switch (category) {
    case FAILURE_OVERLONG:
        return "overlong";
    case FAILURE_TRUNCATED:
        return "truncated";
    default:
        return NULL;
    }
}

static bool report_failure(char *dst, size_t capacity,
                           enum failure_category category,
                           size_t input_length)
{
    const char *category_name = category_text(category);
    int written;

    if (dst == NULL || capacity == 0u || category_name == NULL) {
        return false;
    }
    /* IMPORTANT FIX: only controlled context and validated size are logged. */
    written = snprintf(dst, capacity, "packet rejected: %s (%zu bytes)",
                       category_name, input_length);
    return written >= 0 && (size_t)written < capacity;
}

int main(void)
{
    char diagnostic[64];

    assert(report_failure(diagnostic, sizeof diagnostic,
                          FAILURE_OVERLONG, 6u));
    /* TEST: useful context remains, while raw packet contents do not. */
    assert(strstr(diagnostic, "overlong") != NULL);
    assert(strstr(diagnostic, "6 bytes") != NULL);
    assert(strstr(diagnostic, "TOKEN") == NULL);
    /* TEST: unknown diagnostic categories fail without being mislabeled. */
    assert(!report_failure(diagnostic, sizeof diagnostic,
                           (enum failure_category)99, 6u));
    return 0;
}
`
    }
  ]
};
