window.COURSE_CODE_MODULE = {
  "title": "Carrying Size Information Correctly: code example",
  "codeIntro": "The safer interface carries the byte count with the pointer so callers cannot silently discard the extent.",
  "codeExamples": [
    {
      "title": "Vulnerable: raw pointer hides the extent",
      "language": "c",
      "blurb": "The function receives an offset but no byte count, so it must assume that two readable bytes follow the pointer.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool read_field(const uint8_t *data, size_t offset, uint16_t *out)
{
    if (data == NULL || out == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: the API cannot prove that two bytes exist. */
    *out = (uint16_t)(((uint16_t)data[offset] << 8u) |
                      (uint16_t)data[offset + 1u]);
    return true;
}

int main(void)
{
    const uint8_t storage[] = { 0x12u, 0xaau };
    uint16_t result = 0u;

    /* TEST: only the first byte is logically valid; no length travels here. */
    assert(read_field(storage, 0u, &result));
    assert(result == 0x12aau); /* The guard byte became field data. */
    return 0;
}
`
    },
    {
      "title": "Safer: carry bytes and length as a view",
      "language": "c",
      "blurb": "A byte_view keeps the extent attached to the pointer, and the reader proves that the complete two-byte field fits.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct byte_view {
    const uint8_t *data;
    size_t len;
};

static bool read_field(struct byte_view view, size_t offset, uint16_t *out)
{
    const size_t width = 2u;

    /* IMPORTANT FIX: the pointer and its extent arrive together. */
    if (view.data == NULL || out == NULL || offset > view.len ||
        width > view.len - offset) {
        return false;
    }

    *out = (uint16_t)(((uint16_t)view.data[offset] << 8u) |
                      (uint16_t)view.data[offset + 1u]);
    return true;
}

int main(void)
{
    const uint8_t bytes[] = { 0x12u, 0x34u };
    uint16_t result = 0u;

    assert(read_field((struct byte_view){ bytes, 2u }, 0u, &result));
    assert(result == 0x1234u);
    /* TEST: the same operation is rejected when the view exposes one byte. */
    assert(!read_field((struct byte_view){ bytes, 1u }, 0u, &result));
    return 0;
}
`
    }
  ]
};
