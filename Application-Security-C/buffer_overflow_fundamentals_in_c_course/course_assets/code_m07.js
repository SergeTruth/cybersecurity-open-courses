window.COURSE_CODE_MODULE = {
  "title": "Defensive Interfaces and Safer Design Patterns: code example",
  "codeIntro": "A structured binary-buffer interface keeps data, current length, capacity, and failure status in one visible contract.",
  "codeExamples": [
    {
      "title": "Vulnerable: append interface has no capacity",
      "language": "c",
      "blurb": "The helper receives current length but no destination extent, so it accepts a record that crosses the caller's logical boundary.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

static bool append_record(uint8_t *data, size_t *length,
                          const uint8_t *record, size_t record_length)
{
    if (data == NULL || length == NULL || record == NULL ||
        record_length > SIZE_MAX - *length) {
        return false;
    }

    /* IMPORTANT DEFECT: no destination capacity is available to check. */
    memmove(data + *length, record, record_length);
    *length += record_length;
    return true;
}

int main(void)
{
    uint8_t storage[32] = { 1u, 2u, 3u, 4u, 5u, 6u };
    const uint8_t record[] = { 7u, 8u, 9u, 10u };
    const size_t logical_capacity = 8u;
    size_t length = 6u;

    assert(append_record(storage, &length, record, sizeof record));
    /* TEST: the hidden eight-byte contract was crossed. */
    assert(length > logical_capacity && storage[8] == 9u);
    return 0;
}
`
    },
    {
      "title": "Safer: buffer state travels as one object",
      "language": "c",
      "blurb": "The append operation returns an explicit status and leaves length and contents unchanged when the record does not fit.",
      "code": String.raw`#include <assert.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

struct buffer {
    uint8_t *data;
    size_t length;
    size_t capacity;
};

enum append_result { APPEND_OK, APPEND_NO_SPACE, APPEND_INVALID };

static enum append_result append_record(struct buffer *buffer,
                                        const uint8_t *record,
                                        size_t record_length)
{
    if (buffer == NULL || buffer->data == NULL || record == NULL ||
        buffer->length > buffer->capacity) {
        return APPEND_INVALID;
    }
    /* IMPORTANT FIX: failure is decided before data or length changes. */
    if (record_length > buffer->capacity - buffer->length) {
        return APPEND_NO_SPACE;
    }
    memmove(buffer->data + buffer->length, record, record_length);
    buffer->length += record_length;
    return APPEND_OK;
}

int main(void)
{
    uint8_t storage[8] = { 1u, 2u, 3u, 4u, 5u, 6u, 0u, 0u };
    const uint8_t too_large[] = { 7u, 8u, 9u };
    const uint8_t fits[] = { 7u, 8u };
    struct buffer buffer = { storage, 6u, sizeof storage };
    uint8_t overlap_storage[8] = { 1u, 2u, 3u, 4u, 5u, 6u, 7u, 8u };
    struct buffer overlapping = { overlap_storage, 4u, sizeof overlap_storage };

    assert(append_record(&buffer, too_large, sizeof too_large) ==
           APPEND_NO_SPACE);
    assert(buffer.length == 6u && storage[6] == 0u);
    /* TEST: a fitting record commits both bytes and length. */
    assert(append_record(&buffer, fits, sizeof fits) == APPEND_OK);
    assert(buffer.length == 8u && storage[7] == 8u);
    /* TEST: a record may safely refer to an overlapping buffer region. */
    assert(append_record(&overlapping, overlap_storage + 2u, 4u) == APPEND_OK);
    assert(overlap_storage[4] == 3u && overlap_storage[7] == 6u);
    return 0;
}
`
    }
  ]
};
