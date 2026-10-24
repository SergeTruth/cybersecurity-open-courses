window.COURSE_CODE_MODULE = {
  "title": "Inter-Task Communication and Shared State: code example",
  "codeIntro": "A small by-value queue gives every message a type, source, length, value range, and explicit full/empty behavior.",
  "codeExamples": [
    {
      "title": "Enforce a typed queue message contract",
      "language": "c",
      "blurb": "This single-threaded contract model validates messages before enqueue and copies their payload. Concurrent producers/consumers must use a platform-approved RTOS queue or serialize both operations; the shown storage is not a concurrent queue.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define QUEUE_CAPACITY 2u
#define PAYLOAD_CAPACITY 4u

enum message_source {
    SOURCE_GATEWAY = 1,
    SOURCE_DIAGNOSTIC = 2
};

enum message_type {
    MESSAGE_SET_LIMIT = 1,
    MESSAGE_HEARTBEAT = 2
};

struct message {
    enum message_source source;
    enum message_type type;
    uint8_t payload[PAYLOAD_CAPACITY];
    size_t length;
};

struct message_queue {
    struct message items[QUEUE_CAPACITY];
    size_t head;
    size_t count;
};

static bool message_contract_valid(const struct message *message)
{
    uint16_t limit = 0u;

    if (message == NULL || message->source != SOURCE_GATEWAY ||
        message->length > PAYLOAD_CAPACITY) {
        return false;
    }
    if (message->type == MESSAGE_HEARTBEAT) {
        return message->length == 0u;
    }
    if (message->type != MESSAGE_SET_LIMIT || message->length != 2u) {
        return false;
    }
    limit = (uint16_t)((uint16_t)message->payload[0] << 8) |
            (uint16_t)message->payload[1];
    return limit <= 1000u;
}

static bool queue_send(struct message_queue *queue,
                       const struct message *message)
{
    size_t tail = 0u;

    if (queue == NULL || !message_contract_valid(message) ||
        queue->count == QUEUE_CAPACITY) {
        return false;
    }
    tail = (queue->head + queue->count) % QUEUE_CAPACITY;
    /* IMPORTANT FIX: validate, then transfer an owned value into the queue. */
    queue->items[tail] = *message;
    queue->count++;
    return true;
}

static bool queue_receive(struct message_queue *queue, struct message *message)
{
    if (queue == NULL || message == NULL || queue->count == 0u) {
        return false;
    }
    *message = queue->items[queue->head];
    queue->head = (queue->head + 1u) % QUEUE_CAPACITY;
    queue->count--;
    return true;
}

int main(void)
{
    struct message_queue queue = {{{0}}, 0u, 0u};
    struct message limit = {
        SOURCE_GATEWAY, MESSAGE_SET_LIMIT, {0x01u, 0xf4u, 0u, 0u}, 2u
    };
    struct message heartbeat = {
        SOURCE_GATEWAY, MESSAGE_HEARTBEAT, {0u, 0u, 0u, 0u}, 0u
    };
    struct message wrong_source = {
        SOURCE_DIAGNOSTIC, MESSAGE_SET_LIMIT, {0u, 1u, 0u, 0u}, 2u
    };
    struct message received = {
        SOURCE_GATEWAY, MESSAGE_HEARTBEAT, {0u, 0u, 0u, 0u}, 0u
    };

    assert(!queue_receive(&queue, &received));
    assert(!queue_send(&queue, &wrong_source));
    assert(queue_send(&queue, &limit));
    assert(queue_send(&queue, &heartbeat));
    /* TEST: a full queue rejects another valid message without overwriting data. */
    assert(!queue_send(&queue, &heartbeat));

    assert(queue_receive(&queue, &received));
    assert(received.type == MESSAGE_SET_LIMIT);
    assert(queue_receive(&queue, &received));
    assert(received.type == MESSAGE_HEARTBEAT);
    assert(!queue_receive(&queue, &received));
    return 0;
}
`
    }
  ]
};
