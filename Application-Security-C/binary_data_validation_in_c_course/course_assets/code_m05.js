window.COURSE_CODE_MODULE = {
  "title": "Integers, Endianness, and Overflow: code example",
  "codeIntro": "The listing decodes a big-endian count explicitly, then shows why representability and multiplication need separate checks.",
  "codeExamples": [
    {
      "title": "Vulnerable: decoded count wraps the allocation size",
      "language": "c",
      "blurb": "Explicit byte order is not enough: converting the wire count and multiplying it without limits can produce a smaller size.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { RECORD_SIZE = 24 };

static uint64_t decode_u64_be(const uint8_t bytes[8])
{
    uint64_t value = 0u;
    size_t index;

    for (index = 0u; index < 8u; index++) {
        value = (value << 8u) | (uint64_t)bytes[index];
    }
    return value;
}

static bool record_bytes(const uint8_t *field, size_t length, size_t *out)
{
    size_t count;

    if (field == NULL || out == NULL || length < 8u) {
        return false;
    }
    count = (size_t)decode_u64_be(field);
    /* IMPORTANT DEFECT: the product can wrap to a smaller allocation. */
    *out = count * (size_t)RECORD_SIZE;
    return true;
}

int main(void)
{
    const uint8_t huge_count[8] =
        { 0xffu, 0xffu, 0xffu, 0xffu, 0xffu, 0xffu, 0xffu, 0xffu };
    size_t bytes = 0u;

    assert(record_bytes(huge_count, sizeof huge_count, &bytes));
    /* TEST: the wrapped result is smaller than the requested count. */
    assert(bytes < (size_t)UINT64_MAX);
    return 0;
}
`
    },
    {
      "title": "Safer: bound conversion and multiplication",
      "language": "c",
      "blurb": "The decoder rejects wire values that size_t cannot represent and counts that would overflow the record-size product.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { RECORD_SIZE = 24 };

static uint64_t decode_u64_be(const uint8_t bytes[8])
{
    uint64_t value = 0u;
    size_t index;

    for (index = 0u; index < 8u; index++) {
        value = (value << 8u) | (uint64_t)bytes[index];
    }
    return value;
}

static bool record_bytes(const uint8_t *field, size_t length, size_t *out)
{
    uint64_t wire_count;
    size_t count;

    if (field == NULL || out == NULL || length < 8u) {
        return false;
    }
    wire_count = decode_u64_be(field);
    /* IMPORTANT FIX: check conversion, then check multiplication. */
    if (wire_count > (uint64_t)SIZE_MAX) {
        return false;
    }
    count = (size_t)wire_count;
    if (count > SIZE_MAX / (size_t)RECORD_SIZE) {
        return false;
    }
    *out = count * (size_t)RECORD_SIZE;
    return true;
}

int main(void)
{
    const uint8_t two_records[8] = { 0u, 0u, 0u, 0u, 0u, 0u, 0u, 2u };
    const uint8_t huge_count[8] =
        { 0xffu, 0xffu, 0xffu, 0xffu, 0xffu, 0xffu, 0xffu, 0xffu };
    size_t bytes = 0u;

    assert(record_bytes(two_records, sizeof two_records, &bytes));
    assert(bytes == 48u);
    /* TEST: an unrepresentable allocation request fails closed. */
    assert(!record_bytes(huge_count, sizeof huge_count, &bytes));
    return 0;
}
`
    }
  ]
};
