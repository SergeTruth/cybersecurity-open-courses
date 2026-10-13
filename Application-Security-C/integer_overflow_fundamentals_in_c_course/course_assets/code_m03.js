window.COURSE_CODE_MODULE = {
  "title": "Signed Overflow, Unsigned Wraparound, and Promotions",
  "codeIntro": "Check signed arithmetic before it executes, and make promotion and unsigned-wrap behavior visible instead of assuming storage types control the expression.",
  "codeExamples": [
    {
      "title": "Check signed deltas and observe promotions",
      "language": "c",
      "blurb": "The signed update rejects unrepresentable results, while focused assertions show that small unsigned operands are promoted before later narrowing.",
      "code": `#include <assert.h>
#include <limits.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

static bool apply_delta(int current, int delta, int *updated)
{
    if (updated == NULL ||
        (delta > 0 && current > INT_MAX - delta) ||
        (delta < 0 && current < INT_MIN - delta)) {
        return false;
    }

    /* IMPORTANT FIX: perform signed addition only after range checks. */
    *updated = current + delta;
    return true;
}

int main(void)
{
    int updated = 0;
    const uint8_t left = 250U;
    const uint8_t right = 10U;
    const int promoted_sum = left + right;
    const uint8_t narrowed_sum = (uint8_t)promoted_sum;
    const uint8_t wrapped_counter = (uint8_t)(UINT8_MAX + 1U);

    /* TEST: valid signed boundaries succeed; overflow preconditions reject. */
    assert(apply_delta(INT_MAX - 1, 1, &updated));
    assert(updated == INT_MAX);
    assert(!apply_delta(INT_MAX, 1, &updated));
    assert(apply_delta(INT_MIN + 1, -1, &updated));
    assert(updated == INT_MIN);
    assert(!apply_delta(INT_MIN, -1, &updated));

    /* TEST: arithmetic is promoted before explicit narrowing or wrap. */
    assert(promoted_sum == 260);
    assert(narrowed_sum == 4U);
    assert(wrapped_counter == 0U);

    puts("integer model tests passed");
    return 0;
}
`
    }
  ]
};
