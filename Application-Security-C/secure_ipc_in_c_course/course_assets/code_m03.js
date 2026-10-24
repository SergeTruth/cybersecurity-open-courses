window.COURSE_CODE_MODULE = {
  "title": "Channel Ownership, Permissions, and Exposure: code example",
  "codeIntro": "An IPC endpoint is usable only when ownership, permissions, inheritance, and stale-resource state match deployment policy.",
  "codeExamples": [
    {
      "title": "Vulnerable: endpoint name is treated as sufficient",
      "language": "c",
      "blurb": "The startup check accepts a discoverable endpoint even though it is stale, broadly accessible, and inheritable by child processes.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct endpoint {
    const char *name;
    uint32_t owner;
    unsigned int permissions;
    bool inheritable;
    bool stale;
};

static bool endpoint_usable(const struct endpoint *endpoint)
{
    /* IMPORTANT DEFECT: existence and a familiar name become the policy. */
    return endpoint != NULL && endpoint->name != NULL;
}

int main(void)
{
    const struct endpoint exposed =
        { "service-control", 999u, 0666u, true, true };

    assert(endpoint_usable(&exposed));
    /* TEST: a stale, public, inheritable endpoint was accepted. */
    return 0;
}
`
    },
    {
      "title": "Safer: validate the complete endpoint policy",
      "language": "c",
      "blurb": "The service requires its expected owner, private permissions, inheritance protection, and a fresh lifecycle state before use.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct endpoint {
    const char *name;
    uint32_t owner;
    unsigned int permissions;
    bool inheritable;
    bool stale;
};

static bool endpoint_usable(const struct endpoint *endpoint,
                            uint32_t expected_owner)
{
    /* IMPORTANT FIX: deployment and code enforce one endpoint contract. */
    return endpoint != NULL && endpoint->name != NULL &&
           endpoint->owner == expected_owner &&
           endpoint->permissions == 0600u &&
           !endpoint->inheritable && !endpoint->stale;
}

int main(void)
{
    const struct endpoint private_endpoint =
        { "service-control", 1001u, 0600u, false, false };
    const struct endpoint stale_endpoint =
        { "service-control", 1001u, 0600u, false, true };

    assert(endpoint_usable(&private_endpoint, 1001u));
    /* TEST: stale state and owner mismatch both fail closed. */
    assert(!endpoint_usable(&stale_endpoint, 1001u));
    assert(!endpoint_usable(&private_endpoint, 2002u));
    return 0;
}
`
    }
  ]
};
