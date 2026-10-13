window.COURSE_CODE_MODULE = {
  "title": "Bounds, Sizes, and Heap Object Layout",
  "codeIntro": "Keep element count with its allocation and check the header-plus-array size before creating a flexible trailing object.",
  "codeExamples": [
    {
      "title": "Allocate a bounded flexible-array batch",
      "language": "c",
      "blurb": "The constructor verifies multiplication and addition before allocation, while indexed writes use the stored element count.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    size_t count;
    uint16_t samples[];
} sample_batch;

static bool batch_create(size_t count, sample_batch **output)
{
    sample_batch *batch = NULL;
    size_t trailing_bytes = 0U;
    size_t total_bytes = 0U;

    if (count == 0U || output == NULL || *output != NULL ||
        count > (SIZE_MAX - sizeof *batch) / sizeof batch->samples[0]) {
        return false;
    }

    /* IMPORTANT FIX: validate element multiplication plus header addition. */
    trailing_bytes = count * sizeof batch->samples[0];
    total_bytes = sizeof *batch + trailing_bytes;
    batch = calloc(1U, total_bytes);
    if (batch == NULL) {
        return false;
    }
    batch->count = count;
    *output = batch;
    return true;
}

static bool batch_set(sample_batch *batch, size_t index, uint16_t value)
{
    if (batch == NULL || index >= batch->count) {
        return false;
    }
    batch->samples[index] = value;
    return true;
}

int main(void)
{
    sample_batch *batch = NULL;
    sample_batch *overflow_batch = NULL;
    const size_t impossible_count =
        (SIZE_MAX - sizeof(sample_batch)) / sizeof(uint16_t) + 1U;

    /* TEST: the exact allocated element range is writable. */
    assert(batch_create(3U, &batch));
    assert(batch_set(batch, 0U, 100U));
    assert(batch_set(batch, 2U, 300U));
    assert(batch->samples[0] == 100U && batch->samples[2] == 300U);

    /* TEST: one-past-end and overflowing layouts are rejected. */
    assert(!batch_set(batch, 3U, 400U));
    assert(!batch_create(impossible_count, &overflow_batch));
    assert(overflow_batch == NULL);

    free(batch);
    batch = NULL;
    puts("heap layout tests passed");
    return 0;
}
`
    }
  ]
};
