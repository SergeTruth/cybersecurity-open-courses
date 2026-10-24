window.COURSE_CODE_MODULE = {
  "title": "Connection Handling and Peer Trust: code example",
  "codeIntro": "A connected peer is not automatically authorized. These applications compare network-location trust with authentication and per-action authorization.",
  "codeExamples": [
    {
      "title": "Vulnerable: internal address grants administrative access",
      "language": "c",
      "blurb": "The authorization decision treats an internal source address as proof that every requested action is trusted.",
      "code": `#include <assert.h>
#include <stdbool.h>

enum network_zone {
    ZONE_INTERNAL,
    ZONE_EXTERNAL
};

enum action {
    ACTION_READ_STATUS,
    ACTION_CHANGE_CONFIG
};

static bool authorize_request(enum network_zone source,
                              enum action requested_action)
{
    (void)requested_action;

    /* IMPORTANT DEFECT: network location substitutes for authorization. */
    return source == ZONE_INTERNAL;
}

int main(void)
{
    assert(authorize_request(ZONE_INTERNAL, ACTION_READ_STATUS));

    /* TEST: an internal peer receives an unrelated administrative right. */
    assert(authorize_request(ZONE_INTERNAL, ACTION_CHANGE_CONFIG));
    assert(!authorize_request(ZONE_EXTERNAL, ACTION_READ_STATUS));
    return 0;
}
`
    },
    {
      "title": "Safer: authorize the authenticated peer for each action",
      "language": "c",
      "blurb": "The service requires a current authenticated identity and maps its role to the specific operation being requested.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum role {
    ROLE_MONITOR,
    ROLE_ADMIN
};

enum action {
    ACTION_READ_STATUS,
    ACTION_CHANGE_CONFIG
};

struct peer_identity {
    bool authenticated;
    bool session_current;
    enum role role;
};

static bool authorize_request(const struct peer_identity *peer,
                              enum action requested_action)
{
    if (peer == NULL || !peer->authenticated || !peer->session_current) {
        return false;
    }

    /* IMPORTANT FIX: permission is tied to the requested action. */
    switch (requested_action) {
    case ACTION_READ_STATUS:
        return peer->role == ROLE_MONITOR || peer->role == ROLE_ADMIN;
    case ACTION_CHANGE_CONFIG:
        return peer->role == ROLE_ADMIN;
    default:
        return false;
    }
}

int main(void)
{
    const struct peer_identity monitor = { true, true, ROLE_MONITOR };
    const struct peer_identity admin = { true, true, ROLE_ADMIN };
    const struct peer_identity stale = { true, false, ROLE_ADMIN };

    assert(authorize_request(&monitor, ACTION_READ_STATUS));
    /* TEST: connection permission does not imply configuration permission. */
    assert(!authorize_request(&monitor, ACTION_CHANGE_CONFIG));
    assert(authorize_request(&admin, ACTION_CHANGE_CONFIG));
    assert(!authorize_request(&stale, ACTION_CHANGE_CONFIG));
    assert(!authorize_request(NULL, ACTION_READ_STATUS));
    return 0;
}
`
    }
  ]
};
