window.COURSE_CODE_MODULE = {
  "title": "Aliases, Stale Pointers, and NULL Assignment",
  "codeIntro": "Nulling an owning pointer is useful, but a registered borrowed handle must be revoked before the allocation is released.",
  "codeExamples": [
    {
      "title": "Revoke a borrow before destroying its owner",
      "language": "c",
      "blurb": "The registered handle must outlive the owner. The owner can revoke that one controlled handle, but it cannot invalidate independent raw pointer copies.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>

struct session_borrow;

struct session {
    int account_id;
    struct session_borrow *active_borrow;
};

struct session_borrow {
    struct session *view;
    bool valid;
};

static bool session_borrow(struct session *owner,
                           struct session_borrow *borrow)
{
    if (owner == NULL || borrow == NULL || owner->active_borrow != NULL ||
        borrow->valid || borrow->view != NULL) {
        return false;
    }
    borrow->view = owner;
    borrow->valid = true;
    owner->active_borrow = borrow;
    return true;
}

static bool session_account(const struct session_borrow *borrow, int *out)
{
    if (borrow == NULL || !borrow->valid || borrow->view == NULL || out == NULL) {
        return false;
    }
    *out = borrow->view->account_id;
    return true;
}

static bool session_destroy(struct session **owner)
{
    struct session_borrow *borrow;

    if (owner == NULL || *owner == NULL) {
        return false;
    }
    /* IMPORTANT FIX: revoke the handle registered by this owner. */
    borrow = (*owner)->active_borrow;
    if (borrow != NULL) {
        borrow->view = NULL;
        borrow->valid = false;
        (*owner)->active_borrow = NULL;
    }
    free(*owner);
    *owner = NULL;
    return true;
}

int main(void)
{
    struct session *owner = malloc(sizeof *owner);
    struct session_borrow first = {NULL, false};
    struct session_borrow second = {NULL, false};
    int account_id = 0;

    assert(owner != NULL);
    owner->account_id = 42;
    owner->active_borrow = NULL;
    assert(session_borrow(owner, &first));
    assert(!session_borrow(owner, &second));
    assert(!second.valid && second.view == NULL);
    assert(session_account(&first, &account_id));
    assert(account_id == 42);

    assert(session_destroy(&owner));
    /* TEST: destruction revokes the registered handle before release. */
    assert(owner == NULL);
    assert(!first.valid && first.view == NULL);
    assert(!session_account(&first, &account_id));
    assert(!session_destroy(&owner));
    return 0;
}
`
    }
  ]
};
