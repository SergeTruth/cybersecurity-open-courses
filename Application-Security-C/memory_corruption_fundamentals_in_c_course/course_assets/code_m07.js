window.COURSE_CODE_MODULE = {
  "title": "Integer Sizes, Allocation Math, and Type Assumptions",
  "codeIntro": "Element counts, element widths, and header bytes must be combined without allowing size_t arithmetic to wrap.",
  "codeExamples": [
    {
      "title": "Vulnerable: multiply and add allocation units directly",
      "language": "c",
      "blurb": "A large element count wraps during multiplication, producing an apparently tiny byte count for storage that later code would treat as enormous.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool allocation_bytes(size_t count, size_t element_size,
                             size_t header_size, size_t *result)
{
    if (result == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: multiplication and addition may wrap modulo SIZE_MAX. */
    *result = header_size + count * element_size;
    return true;
}

int main(void)
{
    const size_t huge_count = SIZE_MAX / 16U + 1U;
    size_t bytes = 0U;

    assert(allocation_bytes(4U, 16U, 8U, &bytes));
    assert(bytes == 72U);
    assert(allocation_bytes(huge_count, 16U, 8U, &bytes));

    /* TEST: the enormous request produced an eight-byte allocation request. */
    assert(bytes == 8U);
    return 0;
}
`
    },
    {
      "title": "Safer: prove allocation arithmetic before use",
      "language": "c",
      "blurb": "The calculation reserves header bytes first, divides the remaining maximum by the element width, and rejects counts that cannot fit.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool allocation_bytes(size_t count, size_t element_size,
                             size_t header_size, size_t *result)
{
    if (result == NULL || element_size == 0U ||
        count > (SIZE_MAX - header_size) / element_size) {
        return false;
    }

    /* IMPORTANT FIX: the proven arithmetic preserves byte and element units. */
    *result = header_size + count * element_size;
    return true;
}

int main(void)
{
    const size_t huge_count = SIZE_MAX / 16U + 1U;
    size_t bytes = 123U;

    assert(allocation_bytes(4U, 16U, 8U, &bytes));
    assert(bytes == 72U);

    /* TEST: overflow and zero-width element requests are rejected. */
    bytes = 123U;
    assert(!allocation_bytes(huge_count, 16U, 8U, &bytes));
    assert(bytes == 123U);
    assert(!allocation_bytes(4U, 0U, 8U, &bytes));
    return 0;
}
`
    }
  ]
};
