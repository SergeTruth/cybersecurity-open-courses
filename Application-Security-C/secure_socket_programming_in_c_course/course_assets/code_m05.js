window.COURSE_CODE_MODULE = {
  "title": "Protocol Framing and Message Validation: code example",
  "codeIntro": "The pair parses the same length-prefixed command frame and makes the difference between a policy limit and the bytes actually available explicit.",
  "codeExamples": [
    {
      "title": "Vulnerable: declared length outruns the received frame",
      "language": "c",
      "blurb": "The parser enforces the payload maximum but never proves that the complete declared payload arrived before copying it.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_PAYLOAD 8u

struct message {
    uint8_t command;
    uint8_t payload[MAX_PAYLOAD];
    size_t payload_length;
};

static bool parse_frame(const uint8_t *data, size_t logical_length,
                        struct message *out)
{
    size_t declared_length;

    if (data == NULL || out == NULL || logical_length < 2u) {
        return false;
    }
    declared_length = (size_t)data[0];
    if (declared_length > MAX_PAYLOAD) {
        return false;
    }

    /* IMPORTANT DEFECT: declared length is not checked against available data. */
    out->command = data[1];
    memcpy(out->payload, data + 2u, declared_length);
    out->payload_length = declared_length;
    return true;
}

int main(void)
{
    /* The last physical byte is a guard outside the four-byte logical frame. */
    const uint8_t wire[5] = { 3u, 0x20u, 'A', 'B', 0xEEu };
    struct message parsed = { 0u, { 0u }, 0u };

    /* TEST: the flawed parser consumes the guard while remaining in the array. */
    assert(parse_frame(wire, 4u, &parsed));
    assert(parsed.payload_length == 3u);
    assert(parsed.payload[2] == 0xEEu);
    return 0;
}
`
    },
    {
      "title": "Safer: validate the complete frame before committing",
      "language": "c",
      "blurb": "This one-frame parser checks the supported command, policy maximum, and exact remaining frame length before copying into a temporary result.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_PAYLOAD 8u
#define COMMAND_STORE 0x20u

struct message {
    uint8_t command;
    uint8_t payload[MAX_PAYLOAD];
    size_t payload_length;
};

static bool parse_frame(const uint8_t *data, size_t length,
                        struct message *out)
{
    struct message parsed = { 0u, { 0u }, 0u };
    size_t declared_length;

    if (data == NULL || out == NULL || length < 2u) {
        return false;
    }

    declared_length = (size_t)data[0];
    /* IMPORTANT FIX: validate policy and availability before any copy. */
    if (data[1] != COMMAND_STORE ||
        declared_length > MAX_PAYLOAD ||
        declared_length != length - 2u) {
        return false;
    }

    parsed.command = data[1];
    if (declared_length > 0u) {
        memcpy(parsed.payload, data + 2u, declared_length);
    }
    parsed.payload_length = declared_length;
    *out = parsed;
    return true;
}

int main(void)
{
    const uint8_t valid[] = { 3u, COMMAND_STORE, 'A', 'B', 'C' };
    const uint8_t truncated[] = { 3u, COMMAND_STORE, 'A', 'B' };
    const uint8_t trailing[] = { 1u, COMMAND_STORE, 'A', 'B' };
    const uint8_t oversized[] = { 9u, COMMAND_STORE };
    const uint8_t unsupported[] = { 0u, 0x99u };
    struct message out = { 0xFFu, { 0xAAu }, 7u };

    assert(parse_frame(valid, sizeof valid, &out));
    assert(out.command == COMMAND_STORE);
    assert(out.payload_length == 3u);
    assert(out.payload[2] == (uint8_t)'C');

    /* TEST: invalid frames fail without partially replacing the output. */
    assert(!parse_frame(truncated, sizeof truncated, &out));
    assert(out.payload_length == 3u);
    assert(!parse_frame(trailing, sizeof trailing, &out));
    assert(!parse_frame(oversized, sizeof oversized, &out));
    assert(!parse_frame(unsupported, sizeof unsupported, &out));
    assert(!parse_frame(NULL, 0u, &out));
    return 0;
}
`
    }
  ]
};
