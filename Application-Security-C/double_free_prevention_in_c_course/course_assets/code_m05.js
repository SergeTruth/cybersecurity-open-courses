window.COURSE_CODE_MODULE = {
  "title": "Ownership Transfer Across APIs",
  "codeIntro": "Compare an ambiguous queue insertion contract with one that changes caller-visible ownership only on success.",
  "codeExamples": [
    {
      "title": "Vulnerable: insertion leaves two apparent owners",
      "language": "c",
      "blurb": "The queue stores the allocation, but the caller's pointer is unchanged, so both sides can reasonably attempt cleanup.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

struct queue {
    char *items[1];
    size_t count;
};

static bool queue_push_ambiguous(struct queue *queue, char *message)
{
    if (queue == NULL || message == NULL || queue->count == 1U) {
        return false;
    }
    queue->items[queue->count] = message;
    queue->count++;
    /* IMPORTANT DEFECT: success does not reveal which side now owns message. */
    return true;
}

static void queue_destroy(struct queue *queue)
{
    if (queue != NULL && queue->count == 1U) {
        free(queue->items[0]);
        queue->items[0] = NULL;
        queue->count = 0U;
    }
}

int main(void)
{
    struct queue queue = {{NULL}, 0U};
    char *caller_message = malloc(6U);

    assert(caller_message != NULL);
    memcpy(caller_message, "ready", 6U);
    assert(queue_push_ambiguous(&queue, caller_message));
    /* TEST: the defect is proven without performing a second free. */
    assert(caller_message == queue.items[0]);

    caller_message = NULL; /* Test cleanup chooses the queue as sole owner. */
    queue_destroy(&queue);
    assert(caller_message == NULL && queue.count == 0U);
    return 0;
}
`
    },
    {
      "title": "Safer: transfer is explicit and conditional",
      "language": "c",
      "blurb": "A pointer-to-pointer API clears the caller's owner only after insertion; rejection leaves cleanup with the caller.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

struct queue {
    char *items[1];
    size_t count;
};

static bool queue_push_take(struct queue *queue, char **message)
{
    if (queue == NULL || message == NULL || *message == NULL ||
        queue->count >= 1U) {
        return false;
    }
    queue->items[queue->count] = *message;
    queue->count++;
    /* IMPORTANT FIX: clear the previous owner only after successful transfer. */
    *message = NULL;
    return true;
}

static void queue_destroy(struct queue *queue)
{
    if (queue != NULL && queue->count >= 1U) {
        free(queue->items[0]);
        queue->items[0] = NULL;
        queue->count = 0U;
    }
}

static char *make_message(const char text[6])
{
    char *message = malloc(6U);

    if (message != NULL) {
        memcpy(message, text, 6U);
    }
    return message;
}

int main(void)
{
    struct queue queue = {{NULL}, 0U};
    char *accepted = make_message("ready");
    char *rejected = make_message("later");

    assert(accepted != NULL && rejected != NULL);
    assert(queue_push_take(&queue, &accepted));
    assert(accepted == NULL);

    /* TEST: a full queue rejects insertion and preserves caller ownership. */
    assert(!queue_push_take(&queue, &rejected));
    assert(rejected != NULL && strcmp(rejected, "later") == 0);
    free(rejected);
    queue_destroy(&queue);
    return 0;
}
`
    }
  ]
};
