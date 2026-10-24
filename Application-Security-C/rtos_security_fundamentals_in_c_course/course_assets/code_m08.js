window.COURSE_CODE_MODULE = {
  "title": "Secure Configuration, Boot, and Updates: code example",
  "codeIntro": "An inactive update slot changes only after metadata and prior authorization checks pass, and the active version changes only after a healthy trial boot.",
  "codeExamples": [
    {
      "title": "Stage updates and roll back failed trial boots",
      "language": "c",
      "blurb": "The example models the application-side lifecycle around an authorization result without pretending to implement secure boot or cryptography.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define UPDATE_SLOT_SIZE 16u

struct update_manifest {
    size_t declared_length;
    uint32_t version;
    bool authorization_verified;
};

struct update_manager {
    uint8_t candidate_image[UPDATE_SLOT_SIZE];
    size_t candidate_length;
    uint32_t candidate_version;
    uint32_t active_version;
    bool candidate_staged;
};

static bool stage_candidate(struct update_manager *manager,
                            const struct update_manifest *manifest,
                            const uint8_t *image, size_t image_length)
{
    if (manager == NULL || manifest == NULL || image == NULL ||
        manager->candidate_staged || !manifest->authorization_verified ||
        manifest->version <= manager->active_version ||
        image_length == 0u || image_length > UPDATE_SLOT_SIZE ||
        manifest->declared_length != image_length) {
        return false;
    }

    /* IMPORTANT FIX: all policy and size checks finish before slot mutation. */
    memmove(manager->candidate_image, image, image_length);
    manager->candidate_length = image_length;
    manager->candidate_version = manifest->version;
    manager->candidate_staged = true;
    return true;
}

static bool record_trial_boot_health(struct update_manager *manager,
                                     bool healthy)
{
    if (manager == NULL || !manager->candidate_staged) {
        return false;
    }
    if (healthy) {
        manager->active_version = manager->candidate_version;
    }
    memset(manager->candidate_image, 0, sizeof manager->candidate_image);
    manager->candidate_length = 0u;
    manager->candidate_version = 0u;
    manager->candidate_staged = false;
    return true;
}

int main(void)
{
    const uint8_t image[] = {0x10u, 0x20u, 0x30u, 0x40u};
    struct update_manager manager = {{0u}, 0u, 0u, 5u, false};
    struct update_manifest unauthorized = {sizeof image, 6u, false};
    struct update_manifest wrong_length = {sizeof image - 1u, 6u, true};
    struct update_manifest version_six = {sizeof image, 6u, true};
    struct update_manifest version_seven = {sizeof image, 7u, true};

    assert(!stage_candidate(&manager, &unauthorized, image, sizeof image));
    assert(!stage_candidate(&manager, &wrong_length, image, sizeof image));
    assert(manager.active_version == 5u && !manager.candidate_staged);

    assert(stage_candidate(&manager, &version_six, image, sizeof image));
    assert(record_trial_boot_health(&manager, false));
    /* TEST: a failed trial boot preserves the known-good active version. */
    assert(manager.active_version == 5u);
    assert(!manager.candidate_staged);

    assert(stage_candidate(&manager, &version_seven, image, sizeof image));
    assert(record_trial_boot_health(&manager, true));
    assert(manager.active_version == 7u);
    assert(!stage_candidate(&manager, &version_six, image, sizeof image));
    assert(!record_trial_boot_health(&manager, true));
    return 0;
}
`
    }
  ]
};
