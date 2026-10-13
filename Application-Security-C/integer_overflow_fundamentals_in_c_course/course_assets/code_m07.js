window.COURSE_CODE_MODULE = {
  "title": "Division, Remainder, Shifts, and Edge Cases",
  "codeIntro": "Keep divisor, signed-minimum, remainder range, and shift-width checks adjacent to the operations they authorize.",
  "codeExamples": [
    {
      "title": "Guard division, buckets, and bit extraction",
      "language": "c",
      "blurb": "Small helpers document the numeric contract for signed division, nonnegative bucket selection, and bounded unsigned shifts.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

static bool divide_i32(int32_t dividend, int32_t divisor, int32_t *quotient)
{
    if (quotient == NULL || divisor == 0 ||
        (dividend == INT32_MIN && divisor == -1)) {
        return false;
    }
    *quotient = dividend / divisor;
    return true;
}

static bool bucket_for(int32_t key, int32_t bucket_count, size_t *bucket)
{
    int32_t remainder = 0;

    if (bucket == NULL || key < 0 || bucket_count <= 0) {
        return false;
    }
    remainder = key % bucket_count;
    *bucket = (size_t)remainder;
    return true;
}

static bool extract_bits(uint32_t value, uint32_t shift, uint32_t width,
                         uint32_t *field)
{
    uint32_t mask = 0U;

    /* IMPORTANT FIX: establish width and shift range before either shift. */
    if (field == NULL || width == 0U || width > 32U ||
        shift >= 32U || width > 32U - shift) {
        return false;
    }
    mask = width == 32U ? UINT32_MAX : (UINT32_C(1) << width) - 1U;
    *field = (value >> shift) & mask;
    return true;
}

int main(void)
{
    int32_t quotient = 0;
    size_t bucket = 0U;
    uint32_t field = 0U;

    /* TEST: accepted operands produce defined division and remainder values. */
    assert(divide_i32(20, 4, &quotient) && quotient == 5);
    assert(!divide_i32(20, 0, &quotient));
    assert(!divide_i32(INT32_MIN, -1, &quotient));
    assert(bucket_for(17, 5, &bucket) && bucket == 2U);
    assert(!bucket_for(-1, 5, &bucket));

    /* TEST: valid bit windows succeed and invalid counts reject. */
    assert(extract_bits(UINT32_C(0x000000b4), 2U, 3U, &field));
    assert(field == 5U);
    assert(!extract_bits(UINT32_MAX, 32U, 1U, &field));
    assert(!extract_bits(UINT32_MAX, 31U, 2U, &field));

    puts("division and shift edge tests passed");
    return 0;
}
`
    }
  ]
};
