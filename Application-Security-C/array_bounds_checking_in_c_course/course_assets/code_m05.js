window.COURSE_CODE_MODULE = {
  "title": "Checking Reads and Writes Before Access: code example",
  "codeIntro": "A complete range check must prove that every source and destination byte fits before the copy begins.",
  "codeExamples": [
    {
      "title": "Vulnerable: only starting offsets are checked",
      "language": "c",
      "blurb": "Both offsets can name valid first bytes while width still carries memcpy beyond the source or destination boundary.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool copy_region(unsigned char *dst, size_t dst_len, size_t dst_offset,
                        const unsigned char *src, size_t src_len,
                        size_t src_offset, size_t width)
{
    if (dst == NULL || src == NULL || dst_offset >= dst_len ||
        src_offset >= src_len) {
        return false;
    }

    /* IMPORTANT DEFECT: later bytes in width were not validated. */
    memcpy(dst + dst_offset, src + src_offset, width);
    return true;
}

int main(void)
{
    const unsigned char src[] = { 0x10u, 0x20u, 0xeeu, 0xeeu };
    unsigned char dst[] = { 0u, 0u, 0u, 0u };

    /* TEST: logical lengths are 2, while extra physical bytes are guards. */
    assert(copy_region(dst, 2u, 1u, src, 2u, 1u, 2u));
    assert(dst[2] == 0xeeu); /* The copy crossed both logical bounds. */
    return 0;
}
`
    },
    {
      "title": "Safer: validate both complete ranges",
      "language": "c",
      "blurb": "Subtraction-based checks authorize both complete ranges, and memmove safely handles callers that use overlapping regions.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool range_is_valid(size_t length, size_t offset, size_t width)
{
    return offset <= length && width <= length - offset;
}

static bool copy_region(unsigned char *dst, size_t dst_len, size_t dst_offset,
                        const unsigned char *src, size_t src_len,
                        size_t src_offset, size_t width)
{
    /* IMPORTANT FIX: authorize both complete ranges before pointer math. */
    if (dst == NULL || src == NULL ||
        !range_is_valid(src_len, src_offset, width) ||
        !range_is_valid(dst_len, dst_offset, width)) {
        return false;
    }

    memmove(dst + dst_offset, src + src_offset, width);
    return true;
}

int main(void)
{
    const unsigned char src[] = { 0x10u, 0x20u, 0x30u };
    unsigned char dst[] = { 0u, 0u, 0u };
    unsigned char overlap[] = { 1u, 2u, 3u, 4u };

    assert(copy_region(dst, 3u, 1u, src, 3u, 0u, 2u));
    assert(dst[1] == 0x10u && dst[2] == 0x20u);
    /* TEST: source fits, but the requested destination range does not. */
    assert(!copy_region(dst, 3u, 2u, src, 3u, 0u, 2u));
    /* TEST: overlapping regions are moved without undefined behavior. */
    assert(copy_region(overlap, 4u, 1u, overlap, 4u, 0u, 3u));
    assert(overlap[0] == 1u && overlap[1] == 1u &&
           overlap[2] == 2u && overlap[3] == 3u);
    return 0;
}
`
    }
  ]
};
