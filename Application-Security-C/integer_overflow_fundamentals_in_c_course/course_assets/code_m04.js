window.COURSE_CODE_MODULE = {
  "title": "Conversions, Truncation, and Sign Mistakes",
  "codeIntro": "A cast performs a conversion; it does not prove that a parsed count is nonnegative, representable, or within the application's accepted range.",
  "codeExamples": [
    {
      "title": "Vulnerable: Cast the parsed batch count",
      "language": "c",
      "blurb": "The storage function silently turns a negative input into a large count and truncates an oversized positive value.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

static bool store_batch_count(int32_t parsed_count, uint16_t *stored_count)
{
    if (stored_count == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: the cast is mistaken for input validation. */
    *stored_count = (uint16_t)parsed_count;
    return true;
}

int main(void)
{
    uint16_t stored = 0U;

    assert(store_batch_count(120, &stored));
    assert(stored == 120U);

    /* TEST: both invalid source values are accepted with new meanings. */
    assert(store_batch_count(-1, &stored));
    assert(stored == UINT16_MAX);
    assert(store_batch_count(70000, &stored));
    assert(stored == 4464U);

    puts("lossy conversion defect demonstrated");
    return 0;
}
`
    },
    {
      "title": "Safer: Validate before storing the count",
      "language": "c",
      "blurb": "The corrected boundary rejects negative, unrepresentable, and policy-exceeding values before the explicit conversion.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

static bool store_batch_count(int32_t parsed_count, uint16_t *stored_count)
{
    const int32_t maximum_batch = 4096;

    if (stored_count == NULL || parsed_count < 0 ||
        parsed_count > (int32_t)UINT16_MAX ||
        parsed_count > maximum_batch) {
        return false;
    }

    /* IMPORTANT FIX: representability and business range precede the cast. */
    *stored_count = (uint16_t)parsed_count;
    return true;
}

int main(void)
{
    uint16_t stored = 99U;

    /* TEST: zero and the policy maximum are accepted exactly. */
    assert(store_batch_count(0, &stored) && stored == 0U);
    assert(store_batch_count(4096, &stored) && stored == 4096U);

    /* TEST: negative, one-above-policy, and unrepresentable values reject. */
    assert(!store_batch_count(-1, &stored));
    assert(!store_batch_count(4097, &stored));
    assert(!store_batch_count(70000, &stored));
    assert(!store_batch_count(1, NULL));

    puts("checked conversion tests passed");
    return 0;
}
`
    }
  ]
};
