window.COURSE_CODE_MODULE = {
  "title": "Formatting, Building, and Appending Strings",
  "codeIntro": "Compare capacity-aware formatting whose truncation signal is ignored with formatting that rejects an incomplete constructed value.",
  "codeExamples": [
    {
      "title": "Vulnerable: Treat any snprintf output as success",
      "language": "c",
      "blurb": "snprintf keeps the buffer terminated, but a nonnegative return alone does not mean the complete configuration label fit.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool build_user_label(const char *user, char *out, size_t capacity)
{
    int result = 0;

    if (user == NULL || out == NULL || capacity == 0u) {
        return false;
    }

    result = snprintf(out, capacity, "user=%s", user);
    /* IMPORTANT DEFECT: nonnegative also includes truncated output. */
    return result >= 0;
}

int main(void)
{
    char label[12] = {0};

    assert(build_user_label("administrator", label, sizeof label));

    /* TEST: the helper reports success for a changed, incomplete identifier. */
    assert(strcmp(label, "user=admini") == 0);
    assert(strcmp(label, "user=administrator") != 0);
    return 0;
}
`
    },
    {
      "title": "Safer: Reject incomplete formatted output",
      "language": "c",
      "blurb": "The corrected builder keeps a trusted format template, interprets snprintf's required-length result, and clears output that cannot be used completely. Formatting uses separate temporary storage so the input may alias the output; allocation failures are explicit.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static bool build_user_label(const char *user, char *out, size_t capacity)
{
    int result = 0;
    char *formatted = NULL;

    if (user == NULL || out == NULL || capacity == 0u) {
        return false;
    }
    /* Never let snprintf read an input that overlaps its destination. */
    formatted = malloc(capacity);
    if (formatted == NULL) {
        out[0] = '\0';
        return false;
    }
    result = snprintf(formatted, capacity, "user=%s", user);

    /* IMPORTANT FIX: compare the reported required length with capacity. */
    if (result < 0 || (size_t)result >= capacity) {
        free(formatted);
        out[0] = '\0';
        return false;
    }
    memcpy(out, formatted, (size_t)result + 1u);
    free(formatted);
    return true;
}

int main(void)
{
    char label[12] = {0};
    char in_place[32] = "alice";

    /* TEST: complete formatted output is accepted. */
    assert(build_user_label("alice", label, sizeof label));
    assert(strcmp(label, "user=alice") == 0);

    /* TEST: truncation is rejected and cannot flow into later logic. */
    assert(!build_user_label("administrator", label, sizeof label));
    assert(label[0] == '\0');
    assert(!build_user_label("alice", label, 0u));
    assert(build_user_label(in_place, in_place, sizeof in_place));
    assert(strcmp(in_place, "user=alice") == 0);
    return 0;
}
`
    }
  ]
};
