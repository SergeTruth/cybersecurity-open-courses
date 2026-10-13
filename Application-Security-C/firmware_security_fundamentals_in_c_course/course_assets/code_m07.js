window.COURSE_CODE_MODULE = {
  "title": "Firmware Updates and Rollback Planning",
  "codeIntro": "Validate update metadata before staging, then model the state decision that keeps the current slot active until commit conditions are satisfied.",
  "codeExamples": [
    {
      "title": "Commit a validated staged update in the state model",
      "language": "c",
      "blurb": "The structure models a transactional activation decision after authorization, compatibility, completeness, and rollback checks. Real power-fail-safe activation requires platform storage, boot metadata, and recovery mechanisms.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

typedef struct {
    uint32_t version;
    uint16_t hardware_revision;
    bool image_complete;
    bool authorization_passed;
} update_metadata;

typedef struct {
    uint32_t active_version;
    uint32_t minimum_version;
    uint32_t pending_version;
    uint16_t hardware_revision;
    uint8_t active_slot;
    uint8_t pending_slot;
    bool pending_valid;
} device_update_state;

static bool stage_update(device_update_state *device,
                         const update_metadata *update)
{
    if (device == NULL || update == NULL || device->active_slot > 1U ||
        !update->image_complete || !update->authorization_passed ||
        update->hardware_revision != device->hardware_revision ||
        update->version < device->minimum_version ||
        update->version <= device->active_version) {
        return false;
    }
    device->pending_slot = (uint8_t)(1U - device->active_slot);
    device->pending_version = update->version;
    device->pending_valid = true;
    return true;
}

static bool commit_update(device_update_state *device,
                          bool power_stable, bool health_check_passed)
{
    if (device == NULL || !device->pending_valid ||
        !power_stable || !health_check_passed) {
        return false;
    }

    /* MODEL: update the in-memory active state only at the commit point.
       Persistent atomicity depends on platform boot and storage mechanisms. */
    device->active_slot = device->pending_slot;
    device->active_version = device->pending_version;
    device->pending_valid = false;
    return true;
}

int main(void)
{
    device_update_state device = {
        UINT32_C(10), UINT32_C(9), 0U, 3U, 0U, 0U, false
    };
    const update_metadata valid = { UINT32_C(11), 3U, true, true };
    const update_metadata rollback = { UINT32_C(8), 3U, true, true };
    const update_metadata incompatible = { UINT32_C(12), 4U, true, true };
    const update_metadata incomplete = { UINT32_C(12), 3U, false, true };

    /* TEST: staging does not replace the running image. */
    assert(stage_update(&device, &valid));
    assert(device.active_slot == 0U && device.active_version == 10U);

    /* TEST: an unmet power-stability condition leaves model state unchanged. */
    assert(!commit_update(&device, false, true));
    assert(device.active_slot == 0U && device.pending_valid);
    assert(commit_update(&device, true, true));
    assert(device.active_slot == 1U && device.active_version == 11U);

    /* TEST: rollback, incompatibility, and incomplete storage reject. */
    assert(!stage_update(&device, &rollback));
    assert(!stage_update(&device, &incompatible));
    assert(!stage_update(&device, &incomplete));

    puts("update transaction tests passed");
    return 0;
}
`
    }
  ]
};
