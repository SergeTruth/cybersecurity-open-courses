window.COURSE_CODE_MODULE = {
  "title": "Testing, Logging, and Review Practices: code example",
  "codeIntro": "A protocol-state test makes unexpected order, authorization failure, disconnect cleanup, and normal session behavior repeatable.",
  "codeExamples": [
    {
      "title": "IPC session state and cleanup tests",
      "language": "c",
      "blurb": "The complete application verifies that privileged requests require authentication and disconnect always clears session authority.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum event { EVENT_AUTHENTICATE, EVENT_STATUS, EVENT_ADMIN, EVENT_DISCONNECT };
struct session { bool authenticated; size_t requests; };

static bool handle_event(struct session *session, enum event event)
{
    if (session == NULL) {
        return false;
    }
    if (event == EVENT_DISCONNECT) {
        *session = (struct session){ false, 0u };
        return true;
    }
    if (event == EVENT_AUTHENTICATE) {
        if (session->authenticated) {
            return false;
        }
        session->authenticated = true;
        return true;
    }
    if (event == EVENT_ADMIN && !session->authenticated) {
        return false;
    }
    if (event != EVENT_STATUS && event != EVENT_ADMIN) {
        return false;
    }
    session->requests++;
    return true;
}

int main(void)
{
    struct session session = { false, 0u };

    /* TEST: privileged work and repeated authentication fail safely. */
    assert(!handle_event(&session, EVENT_ADMIN));
    assert(handle_event(&session, EVENT_AUTHENTICATE));
    assert(!handle_event(&session, EVENT_AUTHENTICATE));
    assert(handle_event(&session, EVENT_ADMIN));
    assert(session.requests == 1u);
    assert(handle_event(&session, EVENT_DISCONNECT));
    /* TEST: disconnect cleanup removes all prior authority and accounting. */
    assert(!session.authenticated && session.requests == 0u);
    return 0;
}
`
    },
    {
      "title": "Strict IPC contract build",
      "language": "bash",
      "blurb": "Using ipc_session_test.c as an illustrative filename for the test above, compile with strict diagnostics and run under ASan and UBSan.",
      "code": String.raw`cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=address,undefined -fno-omit-frame-pointer \
  ipc_session_test.c -o ipc_session_test

ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
UBSAN_OPTIONS=halt_on_error=1 \
  ./ipc_session_test`
    }
  ]
};
