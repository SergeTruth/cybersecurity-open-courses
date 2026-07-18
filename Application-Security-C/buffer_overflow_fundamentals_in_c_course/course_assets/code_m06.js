window.COURSE_CODE_MODULE = {
  "title": "Integer Safety and Allocation Size Calculations: code example",
  "codeIntro": "The comparison checks each multiplication and addition before a calculated packet size reaches malloc.",
  "codeExamples": [
    {
      "title": "Vulnerable: wrapped calculation allocates eight bytes",
      "language": "c",
      "blurb": "A huge record count wraps the element product to zero, leaving only the header size as the allocation request.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { HEADER_SIZE = 8, ENTRY_SIZE = 16 };

static bool packet_size(size_t count, size_t *out)
{
    if (out == NULL) {
        return false;
    }
    /* IMPORTANT DEFECT: multiplication and addition are unchecked. */
    *out = (size_t)HEADER_SIZE + count * (size_t)ENTRY_SIZE;
    return true;
}

int main(void)
{
    const size_t huge_count = SIZE_MAX / (size_t)ENTRY_SIZE + 1u;
    size_t bytes = 0u;

    assert(packet_size(huge_count, &bytes));
    assert(bytes == (size_t)HEADER_SIZE);
    /* TEST: a huge logical packet produced a tiny requested size. */
    return 0;
}
`
    },
    {
      "title": "Safer: check multiplication and addition",
      "language": "c",
      "blurb": "The size helper rejects both an overflowing record product and a product that cannot accommodate the packet header.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { HEADER_SIZE = 8, ENTRY_SIZE = 16 };

static bool packet_size(size_t count, size_t *out)
{
    size_t entries;

    if (out == NULL || count > SIZE_MAX / (size_t)ENTRY_SIZE) {
        return false;
    }
    entries = count * (size_t)ENTRY_SIZE;
    /* IMPORTANT FIX: prove the final addition before performing it. */
    if (entries > SIZE_MAX - (size_t)HEADER_SIZE) {
        return false;
    }
    *out = (size_t)HEADER_SIZE + entries;
    return true;
}

int main(void)
{
    const size_t huge_count = SIZE_MAX / (size_t)ENTRY_SIZE + 1u;
    size_t bytes = 0u;

    assert(packet_size(2u, &bytes));
    assert(bytes == 40u);
    /* TEST: the same huge count is rejected before allocation. */
    assert(!packet_size(huge_count, &bytes));
    return 0;
}
`
    }
  ]
};
