window.COURSE_CODE_MODULE = {
  "title": "Message Framing and Input Validation: code example",
  "codeIntro": "A complete frame must satisfy version, command, declared length, available length, and payload schema before dispatch.",
  "codeExamples": [
    {
      "title": "Vulnerable: command dispatch ignores frame metadata",
      "language": "c",
      "blurb": "The parser recognizes the command byte and consumes payload even though the version and declared payload length are invalid.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { COMMAND_SET_LEVEL = 3 };

static bool parse_level(const uint8_t *frame, size_t length, uint8_t *level)
{
    if (frame == NULL || level == NULL || length < 4u ||
        frame[1] != COMMAND_SET_LEVEL) {
        return false;
    }
    /* IMPORTANT DEFECT: dispatch occurs before frame metadata is validated. */
    *level = frame[3];
    return true;
}

int main(void)
{
    const uint8_t malformed[] = { 9u, COMMAND_SET_LEVEL, 8u, 4u };
    uint8_t level = 0u;

    assert(parse_level(malformed, sizeof malformed, &level));
    /* TEST: bad version and impossible length still changed output. */
    assert(level == 4u);
    return 0;
}
`
    },
    {
      "title": "Safer: validate the complete frame before dispatch",
      "language": "c",
      "blurb": "The parser accepts exactly one supported four-byte frame and commits output only after every metadata and payload rule passes.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum { PROTOCOL_VERSION = 1, COMMAND_SET_LEVEL = 3, MAX_LEVEL = 5 };

static bool parse_level(const uint8_t *frame, size_t length, uint8_t *level)
{
    uint8_t parsed;

    if (frame == NULL || level == NULL || length != 4u ||
        frame[0] != PROTOCOL_VERSION || frame[1] != COMMAND_SET_LEVEL ||
        frame[2] != 1u || frame[3] > MAX_LEVEL) {
        return false;
    }
    parsed = frame[3];
    /* IMPORTANT FIX: publish only a completely validated request. */
    *level = parsed;
    return true;
}

int main(void)
{
    const uint8_t valid[] = { 1u, COMMAND_SET_LEVEL, 1u, 4u };
    const uint8_t truncated[] = { 1u, COMMAND_SET_LEVEL, 1u };
    const uint8_t oversized[] = { 1u, COMMAND_SET_LEVEL, 1u, 9u };
    uint8_t level = 2u;

    assert(!parse_level(truncated, sizeof truncated, &level));
    assert(!parse_level(oversized, sizeof oversized, &level));
    assert(level == 2u);
    assert(parse_level(valid, sizeof valid, &level));
    /* TEST: only the valid frame updates trusted output. */
    assert(level == 4u);
    return 0;
}
`
    }
  ]
};
