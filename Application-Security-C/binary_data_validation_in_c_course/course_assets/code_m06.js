window.COURSE_CODE_MODULE = {
  "title": "Struct Layout, Alignment, and Serialization Traps: code example",
  "codeIntro": "The pair contrasts copying wire bytes into a compiler-defined object representation with decoding the five-byte format explicitly.",
  "codeExamples": [
    {
      "title": "Vulnerable: wire data is treated as native layout",
      "language": "c",
      "blurb": "Copying sizeof(struct header) bytes imports compiler padding and host byte order that the five-byte format never defined.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

struct header {
    uint8_t kind;
    uint32_t length;
};

static bool parse_native(const uint8_t *data, size_t length,
                         struct header *out)
{
    if (data == NULL || out == NULL || length < sizeof *out) {
        return false;
    }

    /* IMPORTANT DEFECT: native padding and byte order become wire rules. */
    memcpy(out, data, sizeof *out);
    return true;
}

int main(void)
{
    const uint8_t wire[] = { 7u, 1u, 2u, 3u, 4u };
    struct header result = { 0u, 0u };
    bool accepted;

    accepted = parse_native(wire, sizeof wire, &result);
    /* TEST: acceptance changes with compiler-defined struct size. */
    assert(accepted == (sizeof(struct header) == sizeof wire));
    /* Accidental acceptance on one ABI does not define portable decoding. */
    return 0;
}
`
    },
    {
      "title": "Safer: decode fields into an internal struct",
      "language": "c",
      "blurb": "The parser requires at least the five-byte wire header, decodes its big-endian fields, and stores trusted values in a normal C struct.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { WIRE_HEADER_SIZE = 5 };

struct header {
    uint8_t kind;
    uint32_t length;
};

static bool parse_header(const uint8_t *data, size_t length,
                         struct header *out)
{
    if (data == NULL || out == NULL || length < WIRE_HEADER_SIZE) {
        return false;
    }

    /* IMPORTANT FIX: wire layout is decoded independently of the ABI. */
    out->kind = data[0];
    out->length = ((uint32_t)data[1] << 24u) |
                  ((uint32_t)data[2] << 16u) |
                  ((uint32_t)data[3] << 8u) |
                  (uint32_t)data[4];
    return true;
}

int main(void)
{
    const uint8_t wire[] = { 7u, 1u, 2u, 3u, 4u };
    struct header result = { 0u, 0u };

    assert(!parse_header(wire, 4u, &result));
    assert(parse_header(wire, sizeof wire, &result));
    /* TEST: field values no longer depend on padding or host endianness. */
    assert(result.kind == 7u && result.length == UINT32_C(0x01020304));
    return 0;
}
`
    }
  ]
};
