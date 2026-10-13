window.COURSE_CODE_MODULE = {
  "title": "Safe Resizing and realloc",
  "codeIntro": "A failed resize leaves the original allocation owned by the caller, so the only owning pointer must not be overwritten before success.",
  "codeExamples": [
    {
      "title": "Vulnerable: Overwrite the owner with realloc's result",
      "language": "c",
      "blurb": "A deterministic realloc-style failure shows how direct assignment loses the only owning pointer while the original allocation remains live.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef void *(*resize_operation)(void *block, size_t new_size, void *context);

typedef struct {
    uint8_t *data;
    size_t capacity;
} byte_buffer;

static void *always_fail_resize(void *block, size_t new_size, void *context)
{
    (void)block;
    (void)new_size;
    (void)context;
    return NULL;
}

static bool reserve(byte_buffer *buffer, size_t needed,
                    resize_operation resize, void *context)
{
    size_t next = 0U;

    if (buffer == NULL || resize == NULL || needed == 0U) {
        return false;
    }
    if (needed <= buffer->capacity) {
        return true;
    }
    next = buffer->capacity == 0U ? 4U : buffer->capacity;
    while (next < needed) {
        if (next > SIZE_MAX / 2U) {
            return false;
        }
        next *= 2U;
    }

    /* IMPORTANT DEFECT: failure destroys the only owning pointer. */
    buffer->data = resize(buffer->data, next, context);
    if (buffer->data == NULL) {
        return false;
    }
    buffer->capacity = next;
    return true;
}

int main(void)
{
    byte_buffer buffer = { malloc(4U), 4U };
    uint8_t *cleanup_alias = buffer.data;

    assert(buffer.data != NULL);
    buffer.data[0] = 0x5aU;
    assert(reserve(&buffer, 4U, always_fail_resize, NULL));

    /* TEST: resize failure loses ownership but leaves the allocation live. */
    assert(!reserve(&buffer, 8U, always_fail_resize, NULL));
    assert(buffer.data == NULL && buffer.capacity == 4U);
    assert(cleanup_alias[0] == 0x5aU);

    free(cleanup_alias);
    puts("lost-owner defect demonstrated safely");
    return 0;
}
`
    },
    {
      "title": "Safer: Commit pointer and capacity together",
      "language": "c",
      "blurb": "A temporary pointer preserves the original allocation on failure and updates pointer and capacity only after success.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef void *(*resize_operation)(void *block, size_t new_size, void *context);

typedef struct {
    uint8_t *data;
    size_t capacity;
} byte_buffer;

static void *system_resize(void *block, size_t new_size, void *context)
{
    (void)context;
    return realloc(block, new_size);
}

static void *always_fail_resize(void *block, size_t new_size, void *context)
{
    (void)block;
    (void)new_size;
    (void)context;
    return NULL;
}

static bool reserve(byte_buffer *buffer, size_t needed,
                    resize_operation resize, void *context)
{
    uint8_t *temporary = NULL;
    size_t next = 0U;

    if (buffer == NULL || resize == NULL || needed == 0U) {
        return false;
    }
    if (needed <= buffer->capacity) {
        return true;
    }
    next = buffer->capacity == 0U ? 4U : buffer->capacity;
    while (next < needed) {
        if (next > SIZE_MAX / 2U) {
            return false;
        }
        next *= 2U;
    }

    /* IMPORTANT FIX: preserve ownership until resize succeeds. */
    temporary = resize(buffer->data, next, context);
    if (temporary == NULL) {
        return false;
    }
    buffer->data = temporary;
    buffer->capacity = next;
    return true;
}

int main(void)
{
    byte_buffer buffer = { malloc(4U), 4U };
    uint8_t *original = buffer.data;

    assert(buffer.data != NULL);
    buffer.data[0] = 0x5aU;

    /* TEST: failure preserves pointer, capacity, contents, and ownership. */
    assert(!reserve(&buffer, 8U, always_fail_resize, NULL));
    assert(buffer.data == original && buffer.capacity == 4U);
    assert(buffer.data[0] == 0x5aU);

    /* TEST: success updates pointer metadata together; zero size rejects. */
    assert(reserve(&buffer, 8U, system_resize, NULL));
    assert(buffer.data != NULL && buffer.capacity == 8U);
    assert(buffer.data[0] == 0x5aU);
    assert(!reserve(&buffer, 0U, system_resize, NULL));

    free(buffer.data);
    buffer.data = NULL;
    buffer.capacity = 0U;
    puts("failure-safe resize tests passed");
    return 0;
}
`
    }
  ]
};
