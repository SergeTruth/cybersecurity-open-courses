window.COURSE_CODE_MODULE = {
  "title": "Validating External Inputs: code example",
  "codeIntro": "A command frame is valid only when its version, length, command, payload, and current device state agree.",
  "codeExamples": [
    {
      "title": "Vulnerable: command byte bypasses frame and state rules",
      "language": "c",
      "blurb": "The handler recognizes an activate command but ignores the bad protocol version, inconsistent payload length, and unconfigured state.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum device_state { STATE_NEW, STATE_CONFIGURED, STATE_ACTIVE };
enum { COMMAND_ACTIVATE = 2 };

static bool handle_frame(const uint8_t *data, size_t length,
                         enum device_state *state)
{
    if (data == NULL || state == NULL || length < 4u ||
        data[1] != COMMAND_ACTIVATE) {
        return false;
    }
    /* IMPORTANT DEFECT: command recognition substitutes for validation. */
    *state = STATE_ACTIVE;
    return true;
}

int main(void)
{
    const uint8_t malformed[] = { 9u, COMMAND_ACTIVATE, 8u, 1u };
    enum device_state state = STATE_NEW;

    assert(handle_frame(malformed, sizeof malformed, &state));
    /* TEST: malformed input activated a device that was never configured. */
    assert(state == STATE_ACTIVE);
    return 0;
}
`
    },
    {
      "title": "Safer: validate frame and transition together",
      "language": "c",
      "blurb": "The handler checks the complete format and prerequisite state before committing the single allowed transition.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum device_state { STATE_NEW, STATE_CONFIGURED, STATE_ACTIVE };
enum { PROTOCOL_VERSION = 1, COMMAND_ACTIVATE = 2 };

static bool handle_frame(const uint8_t *data, size_t length,
                         enum device_state *state)
{
    enum device_state next;

    if (data == NULL || state == NULL || length != 4u ||
        data[0] != PROTOCOL_VERSION || data[1] != COMMAND_ACTIVATE ||
        data[2] != 1u || data[3] != 1u ||
        *state != STATE_CONFIGURED) {
        return false;
    }
    next = STATE_ACTIVE;
    /* IMPORTANT FIX: commit state only after every frame rule passes. */
    *state = next;
    return true;
}

int main(void)
{
    const uint8_t valid[] = { 1u, COMMAND_ACTIVATE, 1u, 1u };
    const uint8_t bad_version[] = { 9u, COMMAND_ACTIVATE, 1u, 1u };
    enum device_state state = STATE_CONFIGURED;

    assert(!handle_frame(bad_version, sizeof bad_version, &state));
    assert(state == STATE_CONFIGURED);
    assert(handle_frame(valid, sizeof valid, &state));
    /* TEST: only the complete valid frame reaches active state. */
    assert(state == STATE_ACTIVE);
    return 0;
}
`
    }
  ]
};
