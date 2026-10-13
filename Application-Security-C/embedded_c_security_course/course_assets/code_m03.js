window.COURSE_CODE_MODULE = {
  "title": "Memory Safety in Firmware: code example",
  "codeIntro": "A fixed sample buffer still needs an explicit capacity, current count, and rejection rule at its write boundary.",
  "codeExamples": [
    {
      "title": "Vulnerable: full buffer accepts one more sample",
      "language": "c",
      "blurb": "The greater-than check permits count equal to capacity, so the next write crosses the logical sample region into a guard element.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool store_sample(uint16_t *samples, size_t capacity,
                         size_t *count, uint16_t sample)
{
    if (samples == NULL || count == NULL || *count > capacity) {
        return false;
    }
    /* IMPORTANT DEFECT: count == capacity has no writable element. */
    samples[*count] = sample;
    (*count)++;
    return true;
}

int main(void)
{
    uint16_t storage[] = { 10u, 20u, 30u, 40u, 0xeeeeu };
    size_t count = 4u;

    /* TEST: logical capacity is four; element four is a physical guard. */
    assert(store_sample(storage, 4u, &count, 99u));
    assert(count == 5u && storage[4] == 99u);
    return 0;
}
`
    },
    {
      "title": "Safer: reject writes at fixed capacity",
      "language": "c",
      "blurb": "The corrected boundary leaves count and stored samples unchanged when the static firmware buffer is already full.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool store_sample(uint16_t *samples, size_t capacity,
                         size_t *count, uint16_t sample)
{
    if (samples == NULL || count == NULL || *count >= capacity) {
        return false;
    }
    /* IMPORTANT FIX: only indexes below capacity may be written. */
    samples[*count] = sample;
    (*count)++;
    return true;
}

int main(void)
{
    uint16_t samples[4] = { 10u, 20u, 30u, 0u };
    size_t count = 3u;

    assert(store_sample(samples, 4u, &count, 40u));
    assert(count == 4u && samples[3] == 40u);
    /* TEST: full-buffer rejection preserves count and contents. */
    assert(!store_sample(samples, 4u, &count, 50u));
    assert(count == 4u && samples[3] == 40u);
    return 0;
}
`
    }
  ]
};
