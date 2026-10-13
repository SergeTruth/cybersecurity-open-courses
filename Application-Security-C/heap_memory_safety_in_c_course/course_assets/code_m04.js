window.COURSE_CODE_MODULE = {
  "title": "Ownership and Lifetime Contracts",
  "codeIntro": "Use API shapes that make ownership transfer, borrowing, failed transfer, and returned ownership observable in code.",
  "codeExamples": [
    {
      "title": "Transfer a packet through an owning queue",
      "language": "c",
      "blurb": "The queue consumes a caller-owned pointer only on success, exposes a const borrow, and returns ownership explicitly when popped.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    uint8_t *bytes;
    size_t length;
} packet;

typedef struct {
    packet *owned_item;
} packet_queue;

static bool packet_create(const uint8_t *bytes, size_t length, packet **output)
{
    packet *item = NULL;

    if (bytes == NULL || length == 0U || output == NULL || *output != NULL) {
        return false;
    }
    item = malloc(sizeof *item);
    if (item == NULL) {
        return false;
    }
    item->bytes = malloc(length);
    if (item->bytes == NULL) {
        free(item);
        return false;
    }
    (void)memcpy(item->bytes, bytes, length);
    item->length = length;
    *output = item;
    return true;
}

static void packet_destroy(packet **owner)
{
    if (owner != NULL && *owner != NULL) {
        free((*owner)->bytes);
        free(*owner);
        *owner = NULL;
    }
}

static bool queue_take(packet_queue *queue, packet **caller_owner)
{
    if (queue == NULL || caller_owner == NULL || *caller_owner == NULL ||
        queue->owned_item != NULL) {
        return false;
    }

    /* IMPORTANT FIX: consume the caller's ownership only on success. */
    queue->owned_item = *caller_owner;
    *caller_owner = NULL;
    return true;
}

static const packet *queue_borrow(const packet_queue *queue)
{
    return queue == NULL ? NULL : queue->owned_item;
}

static packet *queue_pop_owned(packet_queue *queue)
{
    packet *result = NULL;

    if (queue != NULL) {
        result = queue->owned_item;
        queue->owned_item = NULL;
    }
    return result;
}

int main(void)
{
    static const uint8_t bytes[] = { 0x31U, 0x00U, 0xa4U };
    packet_queue queue = { NULL };
    packet *owner = NULL;
    packet *second = NULL;
    const packet *borrowed = NULL;

    assert(packet_create(bytes, sizeof bytes, &owner));
    assert(packet_create(bytes, sizeof bytes, &second));

    /* TEST: successful transfer clears the caller's owning pointer. */
    assert(queue_take(&queue, &owner));
    assert(owner == NULL);
    borrowed = queue_borrow(&queue);
    assert(borrowed != NULL && borrowed->bytes[1] == 0x00U);

    /* TEST: failed transfer leaves the second packet with its caller. */
    assert(!queue_take(&queue, &second));
    assert(second != NULL);
    owner = queue_pop_owned(&queue);
    assert(owner != NULL && queue_borrow(&queue) == NULL);

    packet_destroy(&owner);
    packet_destroy(&second);
    assert(owner == NULL && second == NULL);

    puts("ownership transfer tests passed");
    return 0;
}
`
    }
  ]
};
