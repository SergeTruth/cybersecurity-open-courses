window.COURSE_CODE_MODULE = {
  "title": "Peer Identity and Trust Decisions: code example",
  "codeIntro": "A connected peer still needs action-specific authorization based on an identity property established by the IPC platform.",
  "codeExamples": [
    {
      "title": "Vulnerable: connection authorizes every command",
      "language": "c",
      "blurb": "The dispatcher treats successful connection as administrator identity, allowing an ordinary local client to change configuration.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>

enum action { ACTION_STATUS, ACTION_SUBMIT, ACTION_CONFIGURE };

static bool action_allowed(bool connected, enum action action)
{
    (void)action;
    /* IMPORTANT DEFECT: channel access is mistaken for authorization. */
    return connected;
}

int main(void)
{
    assert(action_allowed(true, ACTION_STATUS));
    /* TEST: any connected peer receives configuration authority. */
    assert(action_allowed(true, ACTION_CONFIGURE));
    return 0;
}
`
    },
    {
      "title": "Safer: authorize each action by peer role",
      "language": "c",
      "blurb": "A role derived from platform peer identity is checked against the requested operation instead of granting connection-wide trust.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>

enum peer_role { ROLE_GENERAL, ROLE_WORKER, ROLE_ADMIN };
enum action { ACTION_STATUS, ACTION_SUBMIT, ACTION_CONFIGURE };

static bool action_allowed(enum peer_role role, enum action action)
{
    if (action == ACTION_STATUS) {
        return true;
    }
    if (action == ACTION_SUBMIT) {
        return role == ROLE_WORKER || role == ROLE_ADMIN;
    }
    /* IMPORTANT FIX: high-impact action requires the administrator role. */
    return action == ACTION_CONFIGURE && role == ROLE_ADMIN;
}

int main(void)
{
    assert(action_allowed(ROLE_GENERAL, ACTION_STATUS));
    assert(action_allowed(ROLE_WORKER, ACTION_SUBMIT));
    /* TEST: ordinary and worker peers cannot change configuration. */
    assert(!action_allowed(ROLE_GENERAL, ACTION_CONFIGURE));
    assert(!action_allowed(ROLE_WORKER, ACTION_CONFIGURE));
    assert(action_allowed(ROLE_ADMIN, ACTION_CONFIGURE));
    return 0;
}
`
    }
  ]
};
