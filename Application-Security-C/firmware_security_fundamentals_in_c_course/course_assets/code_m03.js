window.COURSE_CODE_MODULE = {
  "title": "Secure Boot and Startup Integrity",
  "codeIntro": "Model startup as an ordered authorization decision: boot the primary image only when every required condition is established.",
  "codeExamples": [
    {
      "title": "Choose a controlled startup path",
      "language": "c",
      "blurb": "The decision consumes validation evidence without implementing boot cryptography and falls back predictably when the primary image is not authorized.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

typedef enum {
    BOOT_PRIMARY,
    ENTER_RECOVERY,
    STOP_STARTUP
} boot_action;

typedef struct {
    bool metadata_present;
    bool image_write_complete;
    bool signature_authorized;
    bool startup_configuration_locked;
    uint32_t image_version;
    uint32_t minimum_version;
    bool recovery_image_available;
} startup_evidence;

static boot_action choose_startup(const startup_evidence *evidence)
{
    bool primary_is_allowed = false;

    if (evidence == NULL) {
        return STOP_STARTUP;
    }

    primary_is_allowed = evidence->metadata_present &&
        evidence->image_write_complete &&
        evidence->signature_authorized &&
        evidence->startup_configuration_locked &&
        evidence->image_version >= evidence->minimum_version;

    /* IMPORTANT FIX: hand off control only after the entire policy passes. */
    if (primary_is_allowed) {
        return BOOT_PRIMARY;
    }
    if (evidence->recovery_image_available) {
        return ENTER_RECOVERY;
    }
    return STOP_STARTUP;
}

int main(void)
{
    startup_evidence evidence = {
        true, true, true, true, UINT32_C(42), UINT32_C(40), true
    };

    /* TEST: complete, authorized, current firmware may start. */
    assert(choose_startup(&evidence) == BOOT_PRIMARY);

    /* TEST: incomplete, rolled-back, or unauthorized images never start. */
    evidence.image_write_complete = false;
    assert(choose_startup(&evidence) == ENTER_RECOVERY);
    evidence.image_write_complete = true;
    evidence.image_version = UINT32_C(39);
    assert(choose_startup(&evidence) == ENTER_RECOVERY);
    evidence.image_version = UINT32_C(42);
    evidence.signature_authorized = false;
    evidence.recovery_image_available = false;
    assert(choose_startup(&evidence) == STOP_STARTUP);
    assert(choose_startup(NULL) == STOP_STARTUP);

    puts("startup decision tests passed");
    return 0;
}
`
    }
  ]
};
