window.COURSE_CODE_MODULE = {
  "title": "Testing, Review, and Lifecycle Practices: code example",
  "codeIntro": "A compact update-state test makes malformed order, power interruption, recovery, verification, and commit behavior repeatable.",
  "codeExamples": [
    {
      "title": "Firmware update lifecycle transition tests",
      "language": "c",
      "blurb": "The complete application tests forbidden commit order, power-loss recovery, verification failure, and the successful update path.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum update_state {
    UPDATE_IDLE,
    UPDATE_RECEIVING,
    UPDATE_VERIFYING,
    UPDATE_READY,
    UPDATE_RECOVERY
};

enum update_event {
    EVENT_BEGIN,
    EVENT_IMAGE_COMPLETE,
    EVENT_VERIFY_OK,
    EVENT_VERIFY_FAILED,
    EVENT_COMMIT,
    EVENT_POWER_LOSS
};

static bool apply_event(enum update_state *state, enum update_event event)
{
    if (state == NULL) {
        return false;
    }
    if (event == EVENT_POWER_LOSS && *state != UPDATE_IDLE) {
        *state = UPDATE_RECOVERY;
        return true;
    }
    if (*state == UPDATE_IDLE && event == EVENT_BEGIN) {
        *state = UPDATE_RECEIVING;
    } else if (*state == UPDATE_RECEIVING && event == EVENT_IMAGE_COMPLETE) {
        *state = UPDATE_VERIFYING;
    } else if (*state == UPDATE_VERIFYING && event == EVENT_VERIFY_OK) {
        *state = UPDATE_READY;
    } else if (*state == UPDATE_VERIFYING && event == EVENT_VERIFY_FAILED) {
        *state = UPDATE_RECOVERY;
    } else if (*state == UPDATE_READY && event == EVENT_COMMIT) {
        *state = UPDATE_IDLE;
    } else {
        return false;
    }
    return true;
}

int main(void)
{
    enum update_state state = UPDATE_IDLE;

    /* TEST: commit cannot occur before receive and verification. */
    assert(!apply_event(&state, EVENT_COMMIT));
    assert(apply_event(&state, EVENT_BEGIN));
    assert(apply_event(&state, EVENT_POWER_LOSS));
    assert(state == UPDATE_RECOVERY);
    state = UPDATE_IDLE;
    assert(apply_event(&state, EVENT_BEGIN));
    assert(apply_event(&state, EVENT_IMAGE_COMPLETE));
    assert(apply_event(&state, EVENT_VERIFY_FAILED));
    assert(state == UPDATE_RECOVERY);
    state = UPDATE_IDLE;
    assert(apply_event(&state, EVENT_BEGIN));
    assert(apply_event(&state, EVENT_IMAGE_COMPLETE));
    assert(apply_event(&state, EVENT_VERIFY_OK));
    assert(apply_event(&state, EVENT_COMMIT));
    assert(state == UPDATE_IDLE);
    return 0;
}
`
    },
    {
      "title": "Strict lifecycle-test build",
      "language": "bash",
      "blurb": "Using update_lifecycle_test.c as an illustrative filename for the test above, compile with strict diagnostics and run under ASan and UBSan.",
      "code": String.raw`set -eu

cc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror \
  -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer \
  update_lifecycle_test.c -o update_lifecycle_test

ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
UBSAN_OPTIONS=halt_on_error=1 \
  ./update_lifecycle_test`
    }
  ]
};
