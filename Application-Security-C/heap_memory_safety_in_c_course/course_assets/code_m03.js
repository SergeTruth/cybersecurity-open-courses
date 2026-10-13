window.COURSE_CODE_MODULE = {
  "title": "Allocation, Initialization, and Failure Handling",
  "codeIntro": "Construct the object transactionally: either every invariant is established and ownership transfers, or all partial allocations are released.",
  "codeExamples": [
    {
      "title": "Clean up a partially constructed message",
      "language": "c",
      "blurb": "A controlled allocator makes each failure stage deterministic while the constructor keeps its output unchanged until full success.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    size_t calls;
    size_t fail_on_call;
    size_t live_blocks;
} allocation_fixture;

typedef struct {
    char *topic;
    uint8_t *payload;
    size_t payload_length;
} message;

static void *fixture_allocate(allocation_fixture *fixture, size_t size)
{
    void *block = NULL;

    if (fixture == NULL || size == 0U) {
        return NULL;
    }
    fixture->calls += 1U;
    if (fixture->calls == fixture->fail_on_call) {
        return NULL;
    }
    block = calloc(1U, size);
    if (block != NULL) {
        fixture->live_blocks += 1U;
    }
    return block;
}

static void fixture_release(allocation_fixture *fixture, void *block)
{
    if (fixture != NULL && block != NULL) {
        free(block);
        assert(fixture->live_blocks > 0U);
        fixture->live_blocks -= 1U;
    }
}

static bool message_create(allocation_fixture *fixture,
                           const char *topic, size_t topic_length,
                           const uint8_t *payload, size_t payload_length,
                           message **output)
{
    message *item = NULL;

    if (fixture == NULL || topic == NULL || payload == NULL ||
        output == NULL || *output != NULL || topic_length == SIZE_MAX) {
        return false;
    }
    item = fixture_allocate(fixture, sizeof *item);
    if (item == NULL) {
        return false;
    }
    item->topic = fixture_allocate(fixture, topic_length + 1U);
    if (item->topic == NULL) {
        goto fail;
    }
    item->payload = fixture_allocate(fixture, payload_length);
    if (item->payload == NULL) {
        goto fail;
    }
    (void)memcpy(item->topic, topic, topic_length);
    item->topic[topic_length] = '\\0';
    (void)memcpy(item->payload, payload, payload_length);
    item->payload_length = payload_length;

    /* IMPORTANT FIX: transfer ownership only after full initialization. */
    *output = item;
    return true;

fail:
    fixture_release(fixture, item->payload);
    fixture_release(fixture, item->topic);
    fixture_release(fixture, item);
    return false;
}

static void message_destroy(allocation_fixture *fixture, message **owner)
{
    if (fixture != NULL && owner != NULL && *owner != NULL) {
        fixture_release(fixture, (*owner)->payload);
        fixture_release(fixture, (*owner)->topic);
        fixture_release(fixture, *owner);
        *owner = NULL;
    }
}

int main(void)
{
    static const uint8_t payload[] = { 0x10U, 0x00U, 0x7fU };
    allocation_fixture heap = { 0U, 0U, 0U };
    message *item = NULL;

    /* TEST: full construction establishes fields and transfers ownership. */
    assert(message_create(&heap, "alert", sizeof "alert" - 1U,
                          payload, sizeof payload, &item));
    assert(item != NULL && item->payload_length == sizeof payload);
    assert(item->topic[5] == '\\0' && item->payload[1] == 0x00U);
    message_destroy(&heap, &item);
    assert(item == NULL && heap.live_blocks == 0U);

    /* TEST: failure after the outer allocation releases every partial field. */
    heap.calls = 0U;
    heap.fail_on_call = 2U;
    assert(!message_create(&heap, "alert", sizeof "alert" - 1U,
                           payload, sizeof payload, &item));
    assert(item == NULL && heap.live_blocks == 0U);

    puts("transactional construction tests passed");
    return 0;
}
`
    }
  ]
};
