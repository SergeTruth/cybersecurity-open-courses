window.COURSE_CODE_MODULE = {
  "title": "Stack, Heap, and Static Buffers: code example",
  "codeIntro": "Storage duration changes lifetime and cleanup, but every destination still needs its own explicit finite capacity.",
  "codeExamples": [
    {
      "title": "Vulnerable: helper assumes every buffer is large",
      "language": "c",
      "blurb": "A hidden sixteen-byte assumption accepts a ten-byte string even when the caller's logical destination is only eight bytes.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool store_text(char *dst, const char *src, size_t src_length)
{
    const size_t assumed_capacity = 16u;

    if (dst == NULL || src == NULL || src_length >= assumed_capacity) {
        return false;
    }
    /* IMPORTANT DEFECT: the helper does not know this destination's size. */
    memmove(dst, src, src_length);
    dst[src_length] = '\0';
    return true;
}

int main(void)
{
    char storage[16] = { 0 };
    const size_t logical_capacity = 8u;

    assert(store_text(storage, "ABCDEFGHIJ", 10u));
    /* TEST: bytes beyond the caller's eight-byte region were modified. */
    assert(logical_capacity == 8u && storage[8] == 'I');
    return 0;
}
`
    },
    {
      "title": "Safer: use the capacity of each storage object",
      "language": "c",
      "blurb": "The same checked interface protects automatic, allocated, and static buffers while preserving heap cleanup ownership.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

static bool store_text(char *dst, size_t capacity,
                       const char *src, size_t src_length)
{
    /* IMPORTANT FIX: capacity belongs to the exact destination object. */
    if (dst == NULL || src == NULL || capacity == 0u ||
        src_length >= capacity) {
        return false;
    }
    memmove(dst, src, src_length);
    dst[src_length] = '\0';
    return true;
}

int main(void)
{
    char automatic[8] = { 0 };
    static char shared[8];
    char *allocated = malloc(8u);
    char overlap[8] = "ABC";

    assert(allocated != NULL);
    /* TEST: storage location never changes the eight-byte limit. */
    assert(!store_text(automatic, sizeof automatic, "12345678", 8u));
    assert(store_text(shared, sizeof shared, "OK", 2u));
    assert(store_text(allocated, 8u, "HEAP", 4u));
    assert(strcmp(shared, "OK") == 0 && strcmp(allocated, "HEAP") == 0);
    /* TEST: the generic storage helper also defines overlapping movement. */
    assert(store_text(overlap + 1, sizeof overlap - 1u, overlap, 3u));
    assert(strcmp(overlap, "AABC") == 0);
    free(allocated);
    return 0;
}
`
    }
  ]
};
