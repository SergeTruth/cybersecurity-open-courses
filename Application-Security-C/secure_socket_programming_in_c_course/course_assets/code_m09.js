window.COURSE_CODE_MODULE = {
  "title": "Testing, Logging, and Review Practices: code example",
  "codeIntro": "The test application checks operational event logging without exposing payloads, followed by strict warning and sanitizer commands for the exact listing.",
  "codeExamples": [
    {
      "title": "Test bounded, payload-free socket diagnostics",
      "language": "c",
      "blurb": "Table-driven assertions cover malformed input, timeouts, peer-validation failures, invalid categories, and small output buffers while ensuring sensitive payloads never enter the log.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

enum event_category {
    EVENT_MALFORMED_MESSAGE,
    EVENT_IDLE_TIMEOUT,
    EVENT_PEER_VALIDATION_FAILED,
    EVENT_DISCONNECTED
};

struct socket_event {
    size_t peer_id;
    enum event_category category;
    const char *sensitive_payload;
};

static const char *event_text(enum event_category category)
{
    switch (category) {
    case EVENT_MALFORMED_MESSAGE:
        return "malformed-message";
    case EVENT_IDLE_TIMEOUT:
        return "idle-timeout";
    case EVENT_PEER_VALIDATION_FAILED:
        return "peer-validation-failed";
    case EVENT_DISCONNECTED:
        return "disconnected";
    default:
        return NULL;
    }
}

static bool format_audit_event(const struct socket_event *event,
                               char *output, size_t capacity)
{
    const char *category;
    int written;

    if (event == NULL || output == NULL || capacity == 0u) {
        return false;
    }
    category = event_text(event->category);
    if (category == NULL) {
        return false;
    }

    /* IMPORTANT FIX: log metadata and outcome, never the sensitive payload. */
    written = snprintf(output, capacity, "peer=%zu event=%s",
                       event->peer_id, category);
    return written >= 0 && (size_t)written < capacity;
}

int main(void)
{
    const struct socket_event cases[] = {
        { 17u, EVENT_MALFORMED_MESSAGE, "token=alpha-secret" },
        { 18u, EVENT_IDLE_TIMEOUT, "private request body" },
        { 19u, EVENT_PEER_VALIDATION_FAILED, "certificate details" },
        { 20u, EVENT_DISCONNECTED, "session data" }
    };
    size_t index;

    for (index = 0u; index < sizeof cases / sizeof cases[0]; ++index) {
        char output[64] = { 0 };

        /* TEST: every operational category logs without copying payload data. */
        assert(format_audit_event(&cases[index], output, sizeof output));
        assert(strstr(output, "peer=") != NULL);
        assert(strstr(output, "event=") != NULL);
        assert(strstr(output, cases[index].sensitive_payload) == NULL);
    }

    {
        const struct socket_event invalid = {
            21u, (enum event_category)99, "do-not-log"
        };
        char small[8] = { 0 };

        assert(!format_audit_event(&invalid, small, sizeof small));
        assert(!format_audit_event(&cases[0], small, sizeof small));
        assert(!format_audit_event(NULL, small, sizeof small));
    }
    return 0;
}
`
    },
    {
      "title": "Build and run the socket review tests",
      "language": "bash",
      "blurb": "Strict warnings reject questionable C, while AddressSanitizer and UndefinedBehaviorSanitizer exercise the embedded assertions and cleanup paths.",
      "code": `set -eu

gcc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \\
  -Werror -Wno-unused-function -fsanitize=address,undefined \\
  -fno-omit-frame-pointer socket_review_tests.c -o socket_review_tests

ASAN_OPTIONS=detect_leaks=1 ./socket_review_tests
`
    }
  ]
};
