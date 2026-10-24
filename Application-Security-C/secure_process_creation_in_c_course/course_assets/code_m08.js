window.COURSE_CODE_MODULE = {
  "title": "Child Lifecycle, Errors, and Timeouts: code example",
  "codeIntro": "Process completion needs distinct startup, timeout, exit-status, reaping, and pipe-cleanup outcomes.",
  "codeExamples": [
    {
      "title": "Vulnerable: any child exit is called success",
      "language": "c",
      "blurb": "The parent reports success whenever the child terminates, ignoring a nonzero exit status and leaving pipe cleanup outside the result.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>

static bool child_succeeded(bool exited, int exit_status)
{
    (void)exit_status;
    /* IMPORTANT DEFECT: termination is confused with successful work. */
    return exited;
}

int main(void)
{
    assert(child_succeeded(true, 0));
    /* TEST: exit status 7 is incorrectly reported as success. */
    assert(child_succeeded(true, 7));
    return 0;
}
`
    },
    {
      "title": "Safer: classify outcome and clean launch resources",
      "language": "c",
      "blurb": "The lifecycle helper distinguishes startup failure, timeout, abnormal exit, and success while closing owned pipes on every final path.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum child_result { CHILD_OK, CHILD_START_FAILED, CHILD_TIMEOUT,
                    CHILD_EXIT_FAILED, CHILD_INCOMPLETE };
struct child_state {
    bool started;
    bool reaped;
    bool timed_out;
    int exit_status;
    bool pipes_open;
};

static enum child_result finish_child(struct child_state *child)
{
    enum child_result result;

    if (child == NULL) {
        return CHILD_INCOMPLETE;
    }
    if (!child->started) {
        result = CHILD_START_FAILED;
    } else if (child->timed_out) {
        result = CHILD_TIMEOUT;
    } else if (!child->reaped) {
        result = CHILD_INCOMPLETE;
    } else {
        result = child->exit_status == 0 ? CHILD_OK : CHILD_EXIT_FAILED;
    }
    /* IMPORTANT FIX: every final result closes parent-owned pipe state. */
    child->pipes_open = false;
    return result;
}

int main(void)
{
    struct child_state failed = { true, true, false, 7, true };
    struct child_state timeout = { true, true, true, 0, true };
    struct child_state success = { true, true, false, 0, true };

    assert(finish_child(&failed) == CHILD_EXIT_FAILED && !failed.pipes_open);
    assert(finish_child(&timeout) == CHILD_TIMEOUT && !timeout.pipes_open);
    /* TEST: only a reaped zero-status child produces success. */
    assert(finish_child(&success) == CHILD_OK && !success.pipes_open);
    return 0;
}
`
    }
  ]
};
