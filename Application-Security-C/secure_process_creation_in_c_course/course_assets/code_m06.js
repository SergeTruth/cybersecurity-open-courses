window.COURSE_CODE_MODULE = {
  "title": "File Descriptors, Handles, and I/O Redirection: code example",
  "codeIntro": "Child standard streams and inherited resources should come from an explicit I/O plan rather than every open parent descriptor.",
  "codeExamples": [
    {
      "title": "Vulnerable: every open descriptor is inherited",
      "language": "c",
      "blurb": "The inheritance rule exposes a privileged service socket to a helper simply because the parent still has it open.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum descriptor_purpose { PURPOSE_INPUT, PURPOSE_OUTPUT, PURPOSE_ERROR,
                          PURPOSE_ADMIN_SOCKET };
struct descriptor { int value; enum descriptor_purpose purpose; bool open; };

static bool child_inherits(const struct descriptor *descriptor)
{
    /* IMPORTANT DEFECT: open state alone grants the child a capability. */
    return descriptor != NULL && descriptor->open;
}

int main(void)
{
    const struct descriptor admin = { 41, PURPOSE_ADMIN_SOCKET, true };

    assert(child_inherits(&admin));
    /* TEST: an unrelated helper inherited the privileged service socket. */
    return 0;
}
`
    },
    {
      "title": "Safer: allowlist explicit child I/O handles",
      "language": "c",
      "blurb": "The launch plan names standard input, output, and error handles; every other parent descriptor remains non-inheritable.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct io_plan { int input; int output; int error; };

static bool handle_allowed(const struct io_plan *plan, int handle)
{
    if (plan == NULL || handle < 0) {
        return false;
    }
    /* IMPORTANT FIX: inheritance is limited to three reviewed streams. */
    return handle == plan->input || handle == plan->output ||
           handle == plan->error;
}

int main(void)
{
    const struct io_plan plan = { 10, 11, 12 };
    const int admin_socket = 41;

    assert(handle_allowed(&plan, 10));
    assert(handle_allowed(&plan, 11));
    assert(handle_allowed(&plan, 12));
    /* TEST: the unrelated administrative socket is not inherited. */
    assert(!handle_allowed(&plan, admin_socket));
    return 0;
}
`
    }
  ]
};
