window.COURSE_CODE_MODULE = {
  "title": "Format Consistency and Cross-Field Validation: code example",
  "codeIntro": "Individually plausible fields still need relationship checks that enforce the format's header, flag, and payload rules.",
  "codeExamples": [
    {
      "title": "Vulnerable: fields pass separately but conflict",
      "language": "c",
      "blurb": "The offset and payload length are each below the file size, yet the accepted payload begins inside the header.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { HEADER_SIZE = 8 };

static uint16_t read_u16_be(const uint8_t *data)
{
    return (uint16_t)(((uint16_t)data[0] << 8u) | (uint16_t)data[1]);
}

static bool validate_frame(const uint8_t *data, size_t length)
{
    uint16_t payload_offset;
    uint16_t payload_length;

    if (data == NULL || length < HEADER_SIZE || data[0] != 'B' ||
        data[1] != 'D' || data[2] != 1u) {
        return false;
    }
    payload_offset = read_u16_be(data + 4u);
    payload_length = read_u16_be(data + 6u);

    /* IMPORTANT DEFECT: no relationship between the fields is checked. */
    return (size_t)payload_offset < length &&
           (size_t)payload_length <= length;
}

int main(void)
{
    const uint8_t overlapping[] =
        { 'B', 'D', 1u, 0u, 0u, 4u, 0u, 4u, 1u, 2u, 3u, 4u };

    /* TEST: offset 4 points into the eight-byte header but is accepted. */
    assert(validate_frame(overlapping, sizeof overlapping));
    return 0;
}
`
    },
    {
      "title": "Safer: enforce cross-field format rules",
      "language": "c",
      "blurb": "The validator checks magic, version, supported flags, section placement, and the complete payload range as one contract.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { HEADER_SIZE = 8, KNOWN_FLAGS = 1 };

static uint16_t read_u16_be(const uint8_t *data)
{
    return (uint16_t)(((uint16_t)data[0] << 8u) | (uint16_t)data[1]);
}

static bool validate_frame(const uint8_t *data, size_t length)
{
    size_t payload_offset;
    size_t payload_length;

    if (data == NULL || length < HEADER_SIZE || data[0] != 'B' ||
        data[1] != 'D' || data[2] != 1u ||
        (data[3] & (uint8_t)~KNOWN_FLAGS) != 0u) {
        return false;
    }
    payload_offset = read_u16_be(data + 4u);
    payload_length = read_u16_be(data + 6u);

    /* IMPORTANT FIX: payload belongs after the header and wholly in input. */
    return payload_offset >= HEADER_SIZE && payload_offset <= length &&
           payload_length <= length - payload_offset;
}

int main(void)
{
    const uint8_t valid[] =
        { 'B', 'D', 1u, 1u, 0u, 8u, 0u, 4u, 1u, 2u, 3u, 4u };
    const uint8_t overlap[] =
        { 'B', 'D', 1u, 0u, 0u, 4u, 0u, 4u, 1u, 2u, 3u, 4u };
    const uint8_t unknown_flag[] =
        { 'B', 'D', 1u, 2u, 0u, 8u, 0u, 4u, 1u, 2u, 3u, 4u };

    assert(validate_frame(valid, sizeof valid));
    /* TEST: individually bounded but inconsistent fields fail closed. */
    assert(!validate_frame(overlap, sizeof overlap));
    assert(!validate_frame(unknown_flag, sizeof unknown_flag));
    return 0;
}
`
    }
  ]
};
