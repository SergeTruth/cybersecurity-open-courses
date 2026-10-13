window.COURSE_CODE_MODULE = {
  "title": "Indexes, Loops, Counts, and Parsing",
  "codeIntro": "A validated count must remain connected to the logical packet boundary, and the loop must stop before—not at—the element count.",
  "codeExamples": [
    {
      "title": "Vulnerable: Iterate through count inclusive",
      "language": "c",
      "blurb": "The parser validates the declared payload but its inclusive loop reads one logical byte beyond it into a physical guard.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

static bool sum_samples(const uint8_t *packet, size_t packet_length,
                        unsigned int *sum)
{
    size_t i = 0U;
    const size_t count = packet == NULL ? 0U : (size_t)packet[0];
    unsigned int total = 0U;

    if (packet == NULL || sum == NULL || packet_length < 1U ||
        count > packet_length - 1U) {
        return false;
    }

    /* IMPORTANT DEFECT: count is a quantity, not the last valid index. */
    for (i = 0U; i <= count; ++i) {
        total += packet[1U + i];
    }
    *sum = total;
    return true;
}

int main(void)
{
    uint8_t physical_packet[5] = { 3U, 10U, 20U, 30U, 99U };
    const size_t logical_length = 4U;
    unsigned int sum = 0U;

    /* TEST: the guard value proves the extra logical read without UB. */
    assert(sum_samples(physical_packet, logical_length, &sum));
    assert(sum == 159U);
    assert(sum != 60U);

    puts("inclusive-loop defect demonstrated safely");
    return 0;
}
`
    },
    {
      "title": "Safer: Keep the loop inside the parsed count",
      "language": "c",
      "blurb": "The corrected parser requires an exact payload length and uses a strict loop bound for empty, normal, and maximum accepted packets.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

static bool sum_samples(const uint8_t *packet, size_t packet_length,
                        unsigned int *sum)
{
    size_t i = 0U;
    size_t count = 0U;
    unsigned int total = 0U;

    if (packet == NULL || sum == NULL || packet_length < 1U) {
        return false;
    }
    count = (size_t)packet[0];

    /* IMPORTANT FIX: validate the exact payload before advancing an index. */
    if (count != packet_length - 1U || count > 8U) {
        return false;
    }
    for (i = 0U; i < count; ++i) {
        total += packet[1U + i];
    }
    *sum = total;
    return true;
}

int main(void)
{
    static const uint8_t empty[] = { 0U };
    static const uint8_t normal[] = { 3U, 10U, 20U, 30U };
    static const uint8_t truncated[] = { 3U, 10U, 20U };
    static const uint8_t trailing[] = { 2U, 10U, 20U, 30U };
    static const uint8_t too_many[] = {
        9U, 1U, 1U, 1U, 1U, 1U, 1U, 1U, 1U, 1U
    };
    unsigned int sum = 99U;

    /* TEST: empty and normal packets remain inside their logical bounds. */
    assert(sum_samples(empty, sizeof empty, &sum) && sum == 0U);
    assert(sum_samples(normal, sizeof normal, &sum) && sum == 60U);

    /* TEST: truncation, trailing bytes, and excessive counts reject. */
    assert(!sum_samples(truncated, sizeof truncated, &sum));
    assert(!sum_samples(trailing, sizeof trailing, &sum));
    assert(!sum_samples(too_many, sizeof too_many, &sum));

    puts("parser loop tests passed");
    return 0;
}
`
    }
  ]
};
