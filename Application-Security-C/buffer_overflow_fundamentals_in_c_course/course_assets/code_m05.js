window.COURSE_CODE_MODULE = {
  "title": "String and Memory API Review: code example",
  "codeIntro": "A size-aware formatting call is only safe when its return value is interpreted as a possible truncation result.",
  "codeExamples": [
    {
      "title": "Vulnerable: snprintf truncation is called success",
      "language": "c",
      "blurb": "The function checks only for a negative error, so a shortened identifier is accepted as though the complete value was written.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool format_identity(char *dst, size_t capacity, const char *name)
{
    int written;

    if (dst == NULL || name == NULL || capacity == 0u) {
        return false;
    }
    written = snprintf(dst, capacity, "user=%s", name);
    /* IMPORTANT DEFECT: nonnegative does not mean the output fitted. */
    return written >= 0;
}

int main(void)
{
    char output[8];

    assert(format_identity(output, sizeof output, "alice"));
    /* TEST: output is terminated but silently means something shorter. */
    assert(strcmp(output, "user=al") == 0);
    assert(strcmp(output, "user=alice") != 0);
    return 0;
}
`
    },
    {
      "title": "Safer: treat an oversized result as failure",
      "language": "c",
      "blurb": "The wrapper uses a fixed format and compares snprintf's required character count with the destination capacity.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool format_identity(char *dst, size_t capacity, const char *name)
{
    int written;

    if (dst == NULL || name == NULL || capacity == 0u) {
        return false;
    }
    written = snprintf(dst, capacity, "user=%s", name);
    /* IMPORTANT FIX: snprintf reports the characters it wanted to write. */
    return written >= 0 && (size_t)written < capacity;
}

int main(void)
{
    char small[8];
    char enough[16];

    assert(!format_identity(small, sizeof small, "alice"));
    assert(format_identity(enough, sizeof enough, "alice"));
    /* TEST: callers can distinguish complete output from truncation. */
    assert(strcmp(enough, "user=alice") == 0);
    return 0;
}
`
    }
  ]
};
