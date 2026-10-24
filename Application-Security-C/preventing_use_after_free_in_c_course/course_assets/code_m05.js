window.COURSE_CODE_MODULE = {
  "title": "Aliasing, Shared References, and Borrowed Pointers: code example",
  "codeIntro": "A queue that retains a payload must define whether it borrows or takes ownership. The safer contract leaves exactly one owner after the handoff.",
  "codeExamples": [
    {
      "title": "Vulnerable: both caller and queue claim ownership",
      "language": "c",
      "blurb": "The queue stores the caller's allocation but does not invalidate the caller's owning handle, creating two future release paths.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

struct queued_message {
    unsigned char *payload;
    size_t length;
    bool owns_payload;
};

static bool queue_store_vulnerable(struct queued_message *message,
                                   unsigned char *payload,
                                   size_t length)
{
    if (message == NULL || payload == NULL || length == 0u) {
        return false;
    }
    message->payload = payload;
    message->length = length;
    message->owns_payload = true;
    /* IMPORTANT DEFECT: the caller's owning handle is unchanged. */
    return true;
}

int main(void)
{
    unsigned char *caller_payload = malloc(4u);
    bool caller_owns_payload = true;
    struct queued_message message = {NULL, 0u, false};

    assert(caller_payload != NULL);
    assert(queue_store_vulnerable(&message, caller_payload, 4u));

    /* TEST: two owners now claim the same live allocation. */
    assert(caller_owns_payload);
    assert(message.owns_payload);
    assert(message.payload == caller_payload);

    /* Release once only; the test demonstrates the defect without a double free. */
    message.owns_payload = false;
    message.payload = NULL;
    message.length = 0u;
    free(caller_payload);
    caller_payload = NULL;
    caller_owns_payload = false;
    assert(!caller_owns_payload);
    return 0;
}
`
    },
    {
      "title": "Safer: transfer the payload to one owner",
      "language": "c",
      "blurb": "The take operation accepts a pointer to the caller's handle and clears it only after the queue has accepted ownership.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

struct queued_message {
    unsigned char *payload;
    size_t length;
};

static bool queue_take(struct queued_message *message,
                       unsigned char **payload,
                       size_t *length)
{
    if (message == NULL || payload == NULL || length == NULL ||
        *payload == NULL || *length == 0u || message->payload != NULL) {
        return false;
    }

    message->payload = *payload;
    message->length = *length;
    /* IMPORTANT FIX: successful transfer invalidates the former owner's handle. */
    *payload = NULL;
    *length = 0u;
    return true;
}

static void queued_message_destroy(struct queued_message *message)
{
    if (message != NULL) {
        free(message->payload);
        message->payload = NULL;
        message->length = 0u;
    }
}

int main(void)
{
    unsigned char *caller_payload = malloc(4u);
    size_t caller_length = 4u;
    struct queued_message message = {NULL, 0u};

    assert(caller_payload != NULL);
    caller_payload[0] = 0x2au;
    assert(queue_take(&message, &caller_payload, &caller_length));

    /* TEST: the queue is the only remaining owner after a successful transfer. */
    assert(caller_payload == NULL);
    assert(caller_length == 0u);
    assert(message.payload != NULL);
    assert(message.payload[0] == 0x2au);
    assert(!queue_take(&message, &caller_payload, &caller_length));

    queued_message_destroy(&message);
    assert(message.payload == NULL);
    return 0;
}
`
    }
  ]
};
