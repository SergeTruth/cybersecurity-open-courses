window.COURSE_CODE_MODULE = {
  "title": "Dynamic Buffers, Reallocation, and Capacity Growth: code example",
  "codeIntro": "Capacity growth must protect size arithmetic and preserve the original allocation until resizing succeeds.",
  "codeExamples": [
    {
      "title": "Vulnerable: growth can wrap or lose ownership",
      "language": "c",
      "blurb": "The assertion demonstrates wrapped size arithmetic; the direct realloc assignment separately shows how allocation failure can discard the owning pointer.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

static bool reserve_more(unsigned char **data, size_t length,
                         size_t *capacity, size_t additional)
{
    size_t required;
    size_t next;

    if (data == NULL || capacity == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: both size calculations can wrap. */
    required = length + additional;
    if (required <= *capacity) {
        return true;
    }

    next = *capacity == 0u ? 64u : *capacity;
    while (next < required) {
        next *= 2u;
    }

    /* IMPORTANT DEFECT: failure overwrites the owning pointer. */
    *data = realloc(*data, next);
    if (*data == NULL) {
        return false;
    }

    *capacity = next;
    return true;
}

int main(void)
{
    unsigned char *data = NULL;
    size_t capacity = 0u;

    /* TEST: wrapped zero is accepted before realloc, deterministically. */
    assert(reserve_more(&data, SIZE_MAX, &capacity, 1u));
    assert(data == NULL && capacity == 0u);
    return 0;
}
`
    },
    {
      "title": "Safer: grow capacity without losing the buffer",
      "language": "c",
      "blurb": "The buffer tracks length and capacity together, checks every size operation, and commits the temporary realloc result only after success.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

enum { INITIAL_CAPACITY = 64 };

struct buffer {
    unsigned char *data;
    size_t length;
    size_t capacity;
};

static bool buffer_reserve(struct buffer *buffer, size_t additional)
{
    unsigned char *resized = NULL;
    size_t required;
    size_t next;

    /* IMPORTANT FIX: prove the addition before calculating required. */
    if (buffer == NULL || additional > SIZE_MAX - buffer->length) {
        return false;
    }
    required = buffer->length + additional;
    if (required <= buffer->capacity) {
        return true;
    }

    next = buffer->capacity == 0u
        ? (size_t)INITIAL_CAPACITY
        : buffer->capacity;
    while (next < required) {
        if (next > SIZE_MAX / 2u) {
            next = required;
            break;
        }
        next *= 2u;
    }

    /* IMPORTANT FIX: preserve ownership until realloc succeeds. */
    resized = realloc(buffer->data, next);
    if (resized == NULL) {
        return false;
    }
    buffer->data = resized;
    buffer->capacity = next;
    return true;
}

int main(void)
{
    struct buffer buffer = { NULL, 0u, 0u };
    unsigned char *original;
    size_t original_capacity;

    assert(buffer_reserve(&buffer, 80u));
    assert(buffer.data != NULL && buffer.capacity >= 80u);
    buffer.length = 1u;
    original = buffer.data;
    original_capacity = buffer.capacity;
    /* TEST: overflow is rejected without changing the owner or capacity. */
    assert(!buffer_reserve(&buffer, SIZE_MAX));
    assert(buffer.data == original && buffer.capacity == original_capacity);
    free(buffer.data);
    return 0;
}
`
    }
  ]
};
