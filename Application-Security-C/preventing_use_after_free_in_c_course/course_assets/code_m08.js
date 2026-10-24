window.COURSE_CODE_MODULE = {
  "title": "Defensive Coding Patterns: code example",
  "codeIntro": "A resource type keeps allocation state and metadata together, and all operations enforce that state through a small API.",
  "codeExamples": [
    {
      "title": "Encapsulate a buffer's valid states",
      "language": "c",
      "blurb": "Initialization, append, and cleanup maintain one reviewable invariant: an active buffer owns storage, while an empty buffer owns nothing.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

enum buffer_state {
    BUFFER_EMPTY,
    BUFFER_ACTIVE
};

struct owned_buffer {
    unsigned char *data;
    size_t count;
    size_t capacity;
    enum buffer_state state;
};

static bool owned_buffer_init(struct owned_buffer *buffer, size_t capacity)
{
    if (buffer == NULL || capacity == 0u || buffer->state != BUFFER_EMPTY) {
        return false;
    }
    buffer->data = malloc(capacity);
    if (buffer->data == NULL) {
        return false;
    }
    buffer->count = 0u;
    buffer->capacity = capacity;
    buffer->state = BUFFER_ACTIVE;
    return true;
}

static bool owned_buffer_append(struct owned_buffer *buffer,
                                const unsigned char *source, size_t length)
{
    if (buffer == NULL || source == NULL || buffer->state != BUFFER_ACTIVE) {
        return false;
    }
    if (length > buffer->capacity - buffer->count) {
        return false;
    }
    memmove(buffer->data + buffer->count, source, length);
    buffer->count += length;
    return true;
}

static void owned_buffer_cleanup(struct owned_buffer *buffer)
{
    if (buffer == NULL || buffer->state != BUFFER_ACTIVE) {
        return;
    }
    free(buffer->data);
    /* IMPORTANT FIX: cleanup restores the complete empty-state invariant. */
    buffer->data = NULL;
    buffer->count = 0u;
    buffer->capacity = 0u;
    buffer->state = BUFFER_EMPTY;
}

int main(void)
{
    const unsigned char first[] = {1u, 2u};
    const unsigned char too_long[] = {3u, 4u, 5u};
    struct owned_buffer buffer = {NULL, 0u, 0u, BUFFER_EMPTY};

    assert(owned_buffer_init(&buffer, 4u));
    assert(!owned_buffer_init(&buffer, 4u));
    assert(owned_buffer_append(&buffer, first, sizeof first));
    assert(buffer.count == 2u);
    /* TEST: capacity rejection preserves the prior valid state and contents. */
    assert(!owned_buffer_append(&buffer, too_long, sizeof too_long));
    assert(buffer.count == 2u);
    assert(buffer.data[0] == 1u);

    owned_buffer_cleanup(&buffer);
    assert(buffer.data == NULL);
    assert(buffer.state == BUFFER_EMPTY);
    assert(!owned_buffer_append(&buffer, first, sizeof first));
    owned_buffer_cleanup(&buffer);
    return 0;
}
`
    }
  ]
};
