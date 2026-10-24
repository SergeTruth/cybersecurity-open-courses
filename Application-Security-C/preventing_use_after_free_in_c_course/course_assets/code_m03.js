window.COURSE_CODE_MODULE = {
  "title": "How Dangling Pointers Appear: code example",
  "codeIntro": "A retained callback context becomes stale when the owner is released. Compare local nulling with invalidating every retained reference first.",
  "codeExamples": [
    {
      "title": "Vulnerable: release while a callback remains registered",
      "language": "c",
      "blurb": "The owner is cleared, but the callback registry still claims that it can use the released session. The test detects the stale registration without dereferencing freed storage.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>

struct session {
    int socket_id;
};

struct callback_slot {
    const struct session *context;
    bool registered;
};

static void callback_register(struct callback_slot *slot,
                              const struct session *session)
{
    slot->context = session;
    slot->registered = true;
}

static void session_release_vulnerable(struct session **owner)
{
    if (owner == NULL || *owner == NULL) {
        return;
    }

    free(*owner);
    *owner = NULL;
    /* IMPORTANT DEFECT: another alias remains registered elsewhere. */
}

static void callback_clear(struct callback_slot *slot)
{
    slot->context = NULL;
    slot->registered = false;
}

int main(void)
{
    struct session *owner = malloc(sizeof *owner);
    struct callback_slot slot = {NULL, false};

    assert(owner != NULL);
    owner->socket_id = 17;
    callback_register(&slot, owner);
    assert(slot.registered);

    session_release_vulnerable(&owner);
    assert(owner == NULL);
    /* TEST: the pending callback proves a stale alias remains; do not dispatch it. */
    assert(slot.registered);

    callback_clear(&slot);
    assert(slot.context == NULL);
    return 0;
}
`
    },
    {
      "title": "Safer: unregister retained aliases before release",
      "language": "c",
      "blurb": "The release operation knows about the callback registry and invalidates its retained context before freeing the session.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>

struct session {
    int socket_id;
};

struct callback_slot {
    const struct session *context;
    bool registered;
};

static bool callback_register(struct callback_slot *slot,
                              const struct session *session)
{
    if (slot == NULL || session == NULL || slot->registered) {
        return false;
    }
    slot->context = session;
    slot->registered = true;
    return true;
}

static void callback_unregister(struct callback_slot *slot)
{
    if (slot != NULL) {
        slot->context = NULL;
        slot->registered = false;
    }
}

static void session_release(struct session **owner,
                            struct callback_slot *slot)
{
    if (owner == NULL || *owner == NULL) {
        return;
    }

    /* IMPORTANT FIX: invalidate the retained alias before ending the lifetime. */
    callback_unregister(slot);
    free(*owner);
    *owner = NULL;
}

int main(void)
{
    struct session *owner = malloc(sizeof *owner);
    struct callback_slot slot = {NULL, false};

    assert(owner != NULL);
    owner->socket_id = 17;
    assert(callback_register(&slot, owner));
    assert(!callback_register(&slot, owner));

    session_release(&owner, &slot);
    /* TEST: both the owner and the long-lived callback reference are invalidated. */
    assert(owner == NULL);
    assert(!slot.registered);
    assert(slot.context == NULL);

    session_release(&owner, &slot);
    return 0;
}
`
    }
  ]
};
