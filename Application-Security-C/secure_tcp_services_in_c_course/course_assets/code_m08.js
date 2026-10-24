window.COURSE_CODE_MODULE = {
  "title": "Authentication, Encryption, and Trust Boundaries: code example",
  "codeIntro": "A protected, authenticated connection still needs command-level authorization. The safer dispatcher makes public, user, and administrative boundaries explicit.",
  "codeExamples": [
    {
      "title": "Vulnerable: authentication grants every protocol command",
      "language": "c",
      "blurb": "Once a channel is encrypted and a client is authenticated, the dispatcher approves administrative actions without considering the client's role.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum command {
    COMMAND_HEALTH,
    COMMAND_READ_ACCOUNT,
    COMMAND_ROTATE_KEY
};

struct request_context {
    bool channel_encrypted;
    bool authenticated;
};

static bool authorize_command(const struct request_context *context,
                              enum command command)
{
    (void)command;
    if (context == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: authentication is treated as universal permission. */
    return context->channel_encrypted && context->authenticated;
}

int main(void)
{
    const struct request_context ordinary_user = { true, true };

    assert(authorize_command(&ordinary_user, COMMAND_READ_ACCOUNT));
    /* TEST: an ordinary authenticated client can rotate service keys. */
    assert(authorize_command(&ordinary_user, COMMAND_ROTATE_KEY));
    return 0;
}
`
    },
    {
      "title": "Safer: enforce the trust requirement of each command",
      "language": "c",
      "blurb": "The dispatcher allows public health checks separately, then requires a verified channel, authentication, and the appropriate role for protected operations.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum role {
    ROLE_USER,
    ROLE_ADMIN
};

enum command {
    COMMAND_HEALTH,
    COMMAND_READ_ACCOUNT,
    COMMAND_ROTATE_KEY
};

struct request_context {
    bool peer_identity_verified;
    bool authenticated;
    enum role role;
};

static bool authorize_command(const struct request_context *context,
                              enum command command)
{
    if (command == COMMAND_HEALTH) {
        return true;
    }
    if (context == NULL || !context->peer_identity_verified ||
        !context->authenticated) {
        return false;
    }

    /* IMPORTANT FIX: authorization follows the command's trust boundary. */
    switch (command) {
    case COMMAND_READ_ACCOUNT:
        return context->role == ROLE_USER || context->role == ROLE_ADMIN;
    case COMMAND_ROTATE_KEY:
        return context->role == ROLE_ADMIN;
    case COMMAND_HEALTH:
        return true;
    default:
        return false;
    }
}

int main(void)
{
    const struct request_context user = { true, true, ROLE_USER };
    const struct request_context admin = { true, true, ROLE_ADMIN };
    const struct request_context unverified = { false, true, ROLE_ADMIN };

    assert(authorize_command(NULL, COMMAND_HEALTH));
    assert(authorize_command(&user, COMMAND_READ_ACCOUNT));
    /* TEST: sensitive actions require both peer assurance and admin role. */
    assert(!authorize_command(&user, COMMAND_ROTATE_KEY));
    assert(authorize_command(&admin, COMMAND_ROTATE_KEY));
    assert(!authorize_command(&unverified, COMMAND_ROTATE_KEY));
    assert(!authorize_command(&admin, (enum command)99));
    return 0;
}
`
    }
  ]
};
