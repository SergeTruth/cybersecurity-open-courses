window.COURSE_CODE_MODULE = {
  "title": "Secrets, Keys, and Device Identity",
  "codeIntro": "Represent provisioned keys by opaque slots and require an exact purpose and lifecycle match before granting access.",
  "codeExamples": [
    {
      "title": "Open only a purpose-scoped key slot",
      "language": "c",
      "blurb": "Application code receives a non-exportable handle, never secret bytes, and rejects retired, exportable, or wrong-purpose material.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

typedef enum {
    PURPOSE_DEVICE_AUTHENTICATION,
    PURPOSE_UPDATE_VERIFICATION,
    PURPOSE_PAIRING
} key_purpose;

typedef enum {
    KEY_ACTIVE,
    KEY_RETIRED
} key_state;

typedef struct {
    size_t slot_id;
    key_purpose purpose;
    key_state state;
    bool hardware_protected;
    bool exportable;
} provisioned_slot;

typedef struct {
    size_t slot_id;
    key_purpose purpose;
} key_handle;

static bool open_key(const provisioned_slot *slots, size_t slot_count,
                     size_t requested_slot, key_purpose required_purpose,
                     key_handle *handle)
{
    size_t i = 0U;

    if (slots == NULL || handle == NULL) {
        return false;
    }
    for (i = 0U; i < slot_count; ++i) {
        if (slots[i].slot_id != requested_slot) {
            continue;
        }

        /* IMPORTANT FIX: expose a handle only for the exact protected role. */
        if (slots[i].purpose != required_purpose ||
            slots[i].state != KEY_ACTIVE ||
            !slots[i].hardware_protected || slots[i].exportable) {
            return false;
        }
        handle->slot_id = slots[i].slot_id;
        handle->purpose = slots[i].purpose;
        return true;
    }
    return false;
}

int main(void)
{
    const provisioned_slot slots[] = {
        { 4U, PURPOSE_DEVICE_AUTHENTICATION, KEY_ACTIVE, true, false },
        { 7U, PURPOSE_UPDATE_VERIFICATION, KEY_ACTIVE, true, false },
        { 9U, PURPOSE_PAIRING, KEY_RETIRED, true, false },
        { 12U, PURPOSE_DEVICE_AUTHENTICATION, KEY_ACTIVE, false, true }
    };
    const size_t slot_count = sizeof slots / sizeof slots[0];
    key_handle handle = { 0U, PURPOSE_PAIRING };

    /* TEST: the provisioned device-identity slot yields only an opaque handle. */
    assert(open_key(slots, slot_count, 4U,
                    PURPOSE_DEVICE_AUTHENTICATION, &handle));
    assert(handle.slot_id == 4U);
    assert(handle.purpose == PURPOSE_DEVICE_AUTHENTICATION);

    /* TEST: wrong purpose, retired, exportable, and unknown slots reject. */
    assert(!open_key(slots, slot_count, 4U,
                     PURPOSE_UPDATE_VERIFICATION, &handle));
    assert(!open_key(slots, slot_count, 9U, PURPOSE_PAIRING, &handle));
    assert(!open_key(slots, slot_count, 12U,
                     PURPOSE_DEVICE_AUTHENTICATION, &handle));
    assert(!open_key(slots, slot_count, 99U,
                     PURPOSE_DEVICE_AUTHENTICATION, &handle));

    puts("purpose-scoped key tests passed");
    return 0;
}
`
    }
  ]
};
