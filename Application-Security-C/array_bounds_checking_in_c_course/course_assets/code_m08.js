window.COURSE_CODE_MODULE = {
  "title": "Defensive Refactoring Patterns: code example",
  "codeIntro": "A checked cursor replaces scattered position arithmetic with small operations that fail before reading or advancing.",
  "codeExamples": [
    {
      "title": "Vulnerable: parser advances by hand",
      "language": "c",
      "blurb": "The parser checks the first byte of the two-byte value but then reads a second byte that may lie beyond the record.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct record {
    uint8_t type;
    uint16_t value;
};

static bool parse_record(const uint8_t *data, size_t length,
                         struct record *out)
{
    size_t position = 0u;

    if (data == NULL || out == NULL || position >= length) {
        return false;
    }
    out->type = data[position++];
    if (position >= length) {
        return false;
    }

    /* IMPORTANT DEFECT: position + 1 was not checked. */
    out->value = (uint16_t)(((uint16_t)data[position] << 8u) |
                            (uint16_t)data[position + 1u]);
    return true;
}

int main(void)
{
    const uint8_t storage[] = { 1u, 0x12u, 0xeeu };
    struct record result = { 0u, 0u };

    /* TEST: logical length is 2; the third physical byte is a guard. */
    assert(parse_record(storage, 2u, &result));
    assert(result.type == 1u && result.value == 0x12eeu);
    return 0;
}
`
    },
    {
      "title": "Safer: parse through a checked cursor",
      "language": "c",
      "blurb": "Reusable cursor operations centralize width checks, while a temporary record keeps caller output unchanged unless every field succeeds.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct cursor { const uint8_t *data; size_t length; size_t position; };
struct record { uint8_t type; uint16_t value; };

static bool cursor_take_u8(struct cursor *cursor, uint8_t *out)
{
    /* IMPORTANT FIX: check width before reading or advancing. */
    if (cursor == NULL || out == NULL || cursor->data == NULL ||
        cursor->position >= cursor->length) {
        return false;
    }
    *out = cursor->data[cursor->position];
    cursor->position++;
    return true;
}

static bool cursor_take_u16_be(struct cursor *cursor, uint16_t *out)
{
    const size_t width = 2u;
    size_t position;

    if (cursor == NULL || out == NULL || cursor->data == NULL ||
        cursor->position > cursor->length ||
        width > cursor->length - cursor->position) {
        return false;
    }
    position = cursor->position;
    *out = (uint16_t)(((uint16_t)cursor->data[position] << 8u) |
                      (uint16_t)cursor->data[position + 1u]);
    cursor->position += width;
    return true;
}

static bool parse_record(const uint8_t *data, size_t length,
                         struct record *out)
{
    struct cursor cursor = { data, length, 0u };
    struct record parsed;

    if (out == NULL || !cursor_take_u8(&cursor, &parsed.type) ||
        !cursor_take_u16_be(&cursor, &parsed.value)) {
        return false;
    }

    /* IMPORTANT FIX: publish only a completely parsed record. */
    *out = parsed;
    return true;
}

int main(void)
{
    const uint8_t complete[] = { 1u, 0x12u, 0x34u };
    const uint8_t short_record[] = { 1u, 0x12u };
    struct record result = { 0u, 0u };
    struct record unchanged = { 9u, 0x9999u };

    assert(parse_record(complete, sizeof complete, &result));
    assert(result.type == 1u && result.value == 0x1234u);
    /* TEST: an incomplete field fails without partially changing output. */
    assert(!parse_record(short_record, sizeof short_record, &unchanged));
    assert(unchanged.type == 9u && unchanged.value == 0x9999u);
    return 0;
}
`
    }
  ]
};
