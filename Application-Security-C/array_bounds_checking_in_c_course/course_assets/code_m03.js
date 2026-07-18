window.COURSE_CODE_MODULE = {
  "title": "Common Bounds Mistakes: code example",
  "codeIntro": "The comparison shows how an off-by-one condition admits the first invalid array index.",
  "codeExamples": [
    {
      "title": "Vulnerable: one-past-end index is accepted",
      "language": "c",
      "blurb": "The greater-than check permits index == count, so the following read dereferences the one-past-the-end position.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool lookup_status(const uint8_t *statuses, size_t count,
                          size_t index, uint8_t *out)
{
    if (statuses == NULL || out == NULL || index > count) {
        return false;
    }

    /* IMPORTANT DEFECT: index == count is not a valid element. */
    *out = statuses[index];
    return true;
}

int main(void)
{
    const uint8_t storage[] = { 10u, 20u, 99u };
    uint8_t result = 0u;

    /* TEST: count is 2; the third physical byte is only a guard. */
    assert(lookup_status(storage, 2u, 2u, &result));
    assert(result == 99u); /* The faulty check exposed the guard byte. */
    return 0;
}
`
    },
    {
      "title": "Safer: require index to be below count",
      "language": "c",
      "blurb": "For a size_t index, index >= count rejects every value outside 0 <= index < count before dereferencing the array.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool lookup_status(const uint8_t *statuses, size_t count,
                          size_t index, uint8_t *out)
{
    if (statuses == NULL || out == NULL || index >= count) {
        return false;
    }

    /* IMPORTANT FIX: reject the first one-past-end index. */
    *out = statuses[index];
    return true;
}

int main(void)
{
    const uint8_t statuses[] = { 10u, 20u };
    uint8_t result = 0u;

    assert(lookup_status(statuses, 2u, 1u, &result));
    assert(result == 20u);
    /* TEST: a one-past-end pointer may be formed, but not dereferenced. */
    assert(!lookup_status(statuses, 2u, 2u, &result));
    return 0;
}
`
    }
  ]
};
