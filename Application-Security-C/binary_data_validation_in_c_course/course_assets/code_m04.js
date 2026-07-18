window.COURSE_CODE_MODULE = {
  "title": "Length Fields, Offsets, and Range Checks: code example",
  "codeIntro": "An offset is only the beginning of a claim; the complete offset-and-length range must fit before copying.",
  "codeExamples": [
    {
      "title": "Vulnerable: only the range start is checked",
      "language": "c",
      "blurb": "The offset lies inside the logical file, but the requested width continues into physical guard bytes.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool copy_section(unsigned char *dst, size_t dst_capacity,
                         const unsigned char *file, size_t file_length,
                         size_t offset, size_t width)
{
    if (dst == NULL || file == NULL || offset >= file_length ||
        width > dst_capacity) {
        return false;
    }

    /* IMPORTANT DEFECT: bytes after offset were never authorized. */
    memcpy(dst, file + offset, width);
    return true;
}

int main(void)
{
    const unsigned char storage[] =
        { 1u, 2u, 3u, 4u, 5u, 6u, 7u, 8u, 0xeeu, 0xeeu };
    unsigned char section[4] = { 0u, 0u, 0u, 0u };

    /* TEST: file_length is 8; bytes 8 and 9 are guards. */
    assert(copy_section(section, sizeof section, storage, 8u, 6u, 4u));
    assert(section[2] == 0xeeu && section[3] == 0xeeu);
    return 0;
}
`
    },
    {
      "title": "Safer: prove the complete section fits",
      "language": "c",
      "blurb": "A subtraction-based range check rejects wraparound, and memmove keeps overlapping source and destination regions well-defined.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool range_fits(size_t length, size_t offset, size_t width)
{
    return offset <= length && width <= length - offset;
}

static bool copy_section(unsigned char *dst, size_t dst_capacity,
                         const unsigned char *file, size_t file_length,
                         size_t offset, size_t width)
{
    /* IMPORTANT FIX: validate both complete ranges before moving data. */
    if (dst == NULL || file == NULL || width > dst_capacity ||
        !range_fits(file_length, offset, width)) {
        return false;
    }

    memmove(dst, file + offset, width);
    return true;
}

int main(void)
{
    const unsigned char file[] = { 1u, 2u, 3u, 4u, 5u, 6u, 7u, 8u };
    unsigned char section[3] = { 0u, 0u, 0u };
    unsigned char overlap[] = { 1u, 2u, 3u, 4u, 5u };

    assert(copy_section(section, sizeof section, file, sizeof file, 5u, 3u));
    assert(section[0] == 6u && section[2] == 8u);
    /* TEST: a valid start does not excuse an overlong range. */
    assert(!copy_section(section, sizeof section, file, sizeof file, 6u, 3u));
    /* TEST: overlapping source and destination remain defined. */
    assert(copy_section(overlap + 1u, 4u, overlap, sizeof overlap, 0u, 4u));
    assert(overlap[0] == 1u && overlap[1] == 1u &&
           overlap[2] == 2u && overlap[4] == 4u);
    return 0;
}
`
    }
  ]
};
