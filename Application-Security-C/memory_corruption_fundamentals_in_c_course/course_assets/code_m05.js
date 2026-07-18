window.COURSE_CODE_MODULE = {
  "title": "Heap Management Mistakes",
  "codeIntro": "A resize operation must validate current ownership and preserve the original allocation and metadata until realloc succeeds.",
  "codeExamples": [
    {
      "title": "Resize dynamic storage without losing ownership",
      "language": "c",
      "blurb": "The function rejects inconsistent state and overflow, commits realloc through a temporary pointer, initializes growth, and handles zero as explicit cleanup.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

struct int_buffer {
    int *data;
    size_t count;
};

static bool resize_buffer(struct int_buffer *buffer, size_t new_count)
{
    int *resized = NULL;
    size_t index = 0U;

    if (buffer == NULL ||
        (buffer->data == NULL) != (buffer->count == 0U) ||
        new_count > SIZE_MAX / sizeof *buffer->data) {
        return false;
    }
    if (new_count == 0U) {
        free(buffer->data);
        buffer->data = NULL;
        buffer->count = 0U;
        return true;
    }

    /* IMPORTANT FIX: keep the owning pointer unchanged until success. */
    resized = realloc(buffer->data, new_count * sizeof *buffer->data);
    if (resized == NULL) {
        return false;
    }
    for (index = buffer->count; index < new_count; index++) {
        resized[index] = 0;
    }
    buffer->data = resized;
    buffer->count = new_count;
    return true;
}

int main(void)
{
    struct int_buffer numbers = {NULL, 0U};
    struct int_buffer missing_owner = {NULL, 3U};
    int sentinel = 0;
    struct int_buffer zero_count_owner = {&sentinel, 0U};
    int *original = NULL;

    /* TEST: inconsistent ownership state is rejected before realloc. */
    assert(!resize_buffer(&missing_owner, 4U));
    assert(!resize_buffer(&zero_count_owner, 4U));

    assert(resize_buffer(&numbers, 3U));
    numbers.data[0] = 7;
    original = numbers.data;

    assert(!resize_buffer(&numbers, SIZE_MAX));
    assert(numbers.data == original && numbers.count == 3U);
    assert(numbers.data[0] == 7);

    assert(resize_buffer(&numbers, 5U));
    assert(numbers.data[0] == 7 && numbers.data[3] == 0);
    assert(resize_buffer(&numbers, 0U));
    assert(numbers.data == NULL && numbers.count == 0U);
    return 0;
}
`
    }
  ]
};
