window.COURSE_CODE_MODULE = {
  "title": "Secrets, Keys, and Device Identity: code example",
  "codeIntro": "Device code should receive an opaque provisioned identity handle, not expose reusable secret bytes embedded in firmware.",
  "codeExamples": [
    {
      "title": "Vulnerable: firmware exports a hardcoded device key",
      "language": "c",
      "blurb": "The interface returns a shared literal credential, making the same secret part of every firmware image and every caller's address space.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool get_device_key(const unsigned char **key, size_t *length)
{
    static const unsigned char embedded[] = "factory-key";

    if (key == NULL || length == NULL) {
        return false;
    }
    /* IMPORTANT DEFECT: production secret bytes are compiled into firmware. */
    *key = embedded;
    *length = sizeof embedded - 1u;
    return true;
}

int main(void)
{
    const unsigned char *key = NULL;
    size_t length = 0u;

    assert(get_device_key(&key, &length));
    /* TEST: callers can directly recover the reusable credential. */
    assert(length == 11u && memcmp(key, "factory-key", length) == 0);
    return 0;
}
`
    },
    {
      "title": "Safer: expose an opaque provisioned identity handle",
      "language": "c",
      "blurb": "The application receives a lifecycle-scoped handle to protected platform storage and never obtains the underlying key bytes.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct identity_slot {
    uint32_t handle;
    bool provisioned;
    bool revoked;
};

static bool get_device_identity(const struct identity_slot *slot,
                                uint32_t *handle)
{
    if (slot == NULL || handle == NULL || !slot->provisioned || slot->revoked) {
        return false;
    }
    /* IMPORTANT FIX: callers receive a reference, never secret material. */
    *handle = slot->handle;
    return true;
}

int main(void)
{
    const struct identity_slot active = { 7001u, true, false };
    const struct identity_slot revoked = { 7002u, true, true };
    uint32_t handle = 0u;

    assert(get_device_identity(&active, &handle));
    assert(handle == 7001u);
    /* TEST: revoked and unprovisioned identities fail closed. */
    assert(!get_device_identity(&revoked, &handle));
    assert(!get_device_identity(NULL, &handle));
    return 0;
}
`
    }
  ]
};
