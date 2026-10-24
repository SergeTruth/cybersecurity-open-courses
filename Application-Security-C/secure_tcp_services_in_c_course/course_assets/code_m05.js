window.COURSE_CODE_MODULE = {
  "title": "Memory Safety in Network Parsers: code example",
  "codeIntro": "A length-prefixed network name is a byte range, not a trusted C string. The safer parser validates that range before constructing terminated text.",
  "codeExamples": [
    {
      "title": "Vulnerable: network bytes are scanned as a C string",
      "language": "c",
      "blurb": "The parser ignores both the declared field length and received-buffer length, relying on a terminator that happens to exist in physical test storage.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_NAME 8u

struct parsed_name {
    char text[MAX_NAME + 1u];
    size_t length;
};

static bool parse_name(const uint8_t *data, size_t logical_length,
                       struct parsed_name *out)
{
    size_t measured;

    if (data == NULL || out == NULL || logical_length < 1u) {
        return false;
    }
    /* IMPORTANT DEFECT: untrusted bytes are scanned for an assumed terminator. */
    measured = strlen((const char *)(data + 1u));
    if (measured > MAX_NAME) {
        return false;
    }
    memcpy(out->text, data + 1u, measured + 1u);
    out->length = measured;
    return true;
}

int main(void)
{
    /* X and the terminator are physical guards outside the logical frame. */
    const uint8_t wire[] = { 3u, 'b', 'o', 'b', 'X', 0u };
    struct parsed_name out = { { 0 }, 0u };

    /* TEST: the parser consumes guard data beyond the declared three bytes. */
    assert(parse_name(wire, 4u, &out));
    assert(out.length == 4u);
    assert(out.text[3] == 'X');
    return 0;
}
`
    },
    {
      "title": "Safer: convert a validated byte range to text",
      "language": "c",
      "blurb": "The parser checks the prefix against policy and remaining bytes, rejects embedded zeros, and commits a known-terminated result only after validation.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_NAME 8u

struct parsed_name {
    char text[MAX_NAME + 1u];
    size_t length;
};

static bool parse_name(const uint8_t *data, size_t length,
                       struct parsed_name *out)
{
    struct parsed_name parsed = { { 0 }, 0u };
    size_t declared;

    if (data == NULL || out == NULL || length < 1u) {
        return false;
    }
    declared = (size_t)data[0];

    /* IMPORTANT FIX: validate policy and remaining bytes before access. */
    if (declared == 0u || declared > MAX_NAME ||
        declared > length - 1u ||
        memchr(data + 1u, 0, declared) != NULL) {
        return false;
    }

    memcpy(parsed.text, data + 1u, declared);
    parsed.text[declared] = (char)0;
    parsed.length = declared;
    *out = parsed;
    return true;
}

int main(void)
{
    const uint8_t valid[] = { 3u, 'b', 'o', 'b' };
    const uint8_t truncated[] = { 3u, 'b', 'o', 'X' };
    const uint8_t embedded_zero[] = { 3u, 'b', 0u, 'b' };
    const uint8_t oversized[] = { 9u };
    struct parsed_name out = { { 'z', 0 }, 1u };

    assert(parse_name(valid, sizeof valid, &out));
    assert(out.length == 3u);
    assert(strcmp(out.text, "bob") == 0);

    /* TEST: rejection does not replace the last valid parsed value. */
    assert(!parse_name(truncated, 3u, &out));
    assert(out.length == 3u);
    assert(!parse_name(embedded_zero, sizeof embedded_zero, &out));
    assert(!parse_name(oversized, sizeof oversized, &out));
    assert(!parse_name(NULL, 0u, &out));
    return 0;
}
`
    }
  ]
};
