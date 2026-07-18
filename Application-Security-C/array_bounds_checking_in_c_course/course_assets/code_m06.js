window.COURSE_CODE_MODULE = {
  "title": "Strings, Terminators, and Length-Limited Operations: code example",
  "codeIntro": "The pair separates string content length from storage capacity and makes room for the terminator explicit.",
  "codeExamples": [
    {
      "title": "Vulnerable: strncpy may omit the terminator",
      "language": "c",
      "blurb": "When the source contains at least dst_capacity characters, strncpy fills the destination without producing a C string terminator.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool copy_text(char *dst, size_t dst_capacity, const char *src)
{
    if (dst == NULL || src == NULL || dst_capacity == 0u) {
        return false;
    }

    /* IMPORTANT DEFECT: a full-width copy can leave dst unterminated. */
    (void)strncpy(dst, src, dst_capacity);
    return true;
}

int main(void)
{
    char text[4] = { '?', '?', '?', '?' };

    assert(copy_text(text, sizeof text, "ABCD"));
    /* TEST: all four slots hold content, so no C string was produced. */
    assert(memchr(text, '\0', sizeof text) == NULL);
    return 0;
}
`
    },
    {
      "title": "Safer: require a known source length",
      "language": "c",
      "blurb": "The function rejects truncation, moves exactly the known content bytes even when regions overlap, and appends one terminator within capacity.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool copy_text(char *dst, size_t dst_capacity,
                      const char *src, size_t src_length)
{
    /* IMPORTANT FIX: reject unless content plus one terminator fits. */
    if (dst == NULL || src == NULL || dst_capacity == 0u ||
        src_length >= dst_capacity) {
        return false;
    }

    memmove(dst, src, src_length);
    dst[src_length] = '\0';
    return true;
}

int main(void)
{
    char text[4] = { '?', '?', '?', '?' };
    char overlap[8] = "ABC";

    assert(copy_text(text, sizeof text, "ABC", 3u));
    assert(memcmp(text, "ABC", 4u) == 0);
    /* TEST: reject four content bytes because capacity also needs '\0'. */
    assert(!copy_text(text, sizeof text, "ABCD", 4u));
    /* TEST: memmove permits source and destination regions to overlap. */
    assert(copy_text(overlap + 1, sizeof overlap - 1u, overlap, 3u));
    assert(strcmp(overlap, "AABC") == 0);
    return 0;
}
`
    }
  ]
};
