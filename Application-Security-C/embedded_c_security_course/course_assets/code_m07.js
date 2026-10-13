window.COURSE_CODE_MODULE = {
  "title": "Debug, Manufacturing, and Maintenance Interfaces: code example",
  "codeIntro": "Sensitive service commands need an explicit build profile and device-state policy, not a hidden field shortcut.",
  "codeExamples": [
    {
      "title": "Vulnerable: hardcoded PIN unlocks factory erase",
      "language": "c",
      "blurb": "A production-accessible command trusts a fixed numeric PIN, so knowledge copied from one device unlocks every device.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stdint.h>

enum command { COMMAND_STATUS, COMMAND_FACTORY_ERASE };

static bool command_allowed(enum command command, uint32_t pin)
{
    if (command == COMMAND_STATUS) {
        return true;
    }
    /* IMPORTANT DEFECT: a universal runtime secret replaces access policy. */
    return command == COMMAND_FACTORY_ERASE && pin == 1234u;
}

int main(void)
{
    assert(command_allowed(COMMAND_STATUS, 0u));
    /* TEST: the copied factory PIN enables destructive field behavior. */
    assert(command_allowed(COMMAND_FACTORY_ERASE, 1234u));
    return 0;
}
`
    },
    {
      "title": "Safer: bind commands to profile and lifecycle state",
      "language": "c",
      "blurb": "The policy permits destructive factory behavior only in a manufacturing build while the device remains unprovisioned.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>

enum build_profile { PROFILE_PRODUCTION, PROFILE_MANUFACTURING };
enum device_state { DEVICE_UNPROVISIONED, DEVICE_PROVISIONED };
enum command { COMMAND_STATUS, COMMAND_FACTORY_ERASE };

static bool command_allowed(enum build_profile profile,
                            enum device_state state,
                            enum command command)
{
    if (command == COMMAND_STATUS) {
        return true;
    }
    /* IMPORTANT FIX: capability follows explicit release and lifecycle policy. */
    return command == COMMAND_FACTORY_ERASE &&
           profile == PROFILE_MANUFACTURING &&
           state == DEVICE_UNPROVISIONED;
}

int main(void)
{
    assert(command_allowed(PROFILE_PRODUCTION, DEVICE_PROVISIONED,
                           COMMAND_STATUS));
    assert(!command_allowed(PROFILE_PRODUCTION, DEVICE_UNPROVISIONED,
                            COMMAND_FACTORY_ERASE));
    assert(!command_allowed(PROFILE_MANUFACTURING, DEVICE_PROVISIONED,
                            COMMAND_FACTORY_ERASE));
    /* TEST: only the intended factory state receives erase authority. */
    assert(command_allowed(PROFILE_MANUFACTURING, DEVICE_UNPROVISIONED,
                           COMMAND_FACTORY_ERASE));
    return 0;
}
`
    }
  ]
};
