window.COURSE_CODE_MODULE = {
  "title": "Interrupts, Timing, and Concurrency: code example",
  "codeIntro": "A single-producer/single-consumer event ring keeps interrupt work bounded only on targets that guarantee lock-free atomics of the selected index width; otherwise use the RTOS or platform's documented ISR-safe queue primitive.",
  "codeExamples": [
    {
      "title": "Capture in the ISR and validate in deferred work",
      "language": "c",
      "blurb": "This is a single-producer/single-consumer ring: exactly one non-reentrant ISR produces and one task consumes. Initialization checks lock-free indexes before enabling the interrupt. Multiple/nested producers or consumers require a different platform-approved queue or serialization.",
      "code": String.raw`#include <assert.h>
#include <stdatomic.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define EVENT_CAPACITY 4u

/* CONTRACT: exactly one non-reentrant producer and one consumer per ring.
   Lock-free indexes alone do not make this an MPMC queue. */
struct event_ring {
    uint8_t status[EVENT_CAPACITY];
    _Atomic size_t write_index;
    _Atomic size_t read_index;
};

struct processed_event {
    uint8_t code;
    bool valid;
};

static bool event_ring_init(struct event_ring *ring)
{
    if (ring == NULL) {
        return false;
    }
    atomic_init(&ring->write_index, 0u);
    atomic_init(&ring->read_index, 0u);
    /* TARGET REQUIREMENT: do not use this ISR path if either operation can
       fall back to a library lock. Select the platform ISR-safe primitive. */
    return atomic_is_lock_free(&ring->write_index) &&
           atomic_is_lock_free(&ring->read_index);
}

static bool interrupt_capture_status(struct event_ring *ring, uint8_t status)
{
    size_t write_index = 0u;
    size_t next_index = 0u;
    size_t read_index = 0u;

    if (ring == NULL) {
        return false;
    }
    write_index = atomic_load_explicit(&ring->write_index,
                                       memory_order_relaxed);
    read_index = atomic_load_explicit(&ring->read_index,
                                      memory_order_acquire);
    next_index = (write_index + 1u) % EVENT_CAPACITY;
    if (next_index == read_index) {
        return false;
    }

    /* IMPORTANT FIX: the ISR only captures and publishes essential status. */
    ring->status[write_index] = status;
    atomic_store_explicit(&ring->write_index, next_index,
                          memory_order_release);
    return true;
}

static bool deferred_process_one(struct event_ring *ring,
                                 struct processed_event *event)
{
    size_t read_index = 0u;
    size_t write_index = 0u;
    uint8_t status = 0u;

    if (ring == NULL || event == NULL) {
        return false;
    }
    read_index = atomic_load_explicit(&ring->read_index,
                                      memory_order_relaxed);
    write_index = atomic_load_explicit(&ring->write_index,
                                       memory_order_acquire);
    if (read_index == write_index) {
        return false;
    }

    status = ring->status[read_index];
    atomic_store_explicit(&ring->read_index,
                          (read_index + 1u) % EVENT_CAPACITY,
                          memory_order_release);
    event->code = (uint8_t)(status & 0x0fu);
    event->valid = (status & 0xf0u) == 0u && event->code != 0u;
    return true;
}

int main(void)
{
    struct event_ring ring;
    struct processed_event event = {0u, false};

    assert(event_ring_init(&ring));
    assert(!deferred_process_one(&ring, &event));
    assert(interrupt_capture_status(&ring, 0x01u));
    assert(interrupt_capture_status(&ring, 0x80u));
    assert(interrupt_capture_status(&ring, 0x02u));
    /* TEST: the bounded ISR queue reports full instead of overwriting events. */
    assert(!interrupt_capture_status(&ring, 0x03u));

    assert(deferred_process_one(&ring, &event));
    assert(event.valid && event.code == 1u);
    assert(deferred_process_one(&ring, &event));
    assert(!event.valid);
    assert(deferred_process_one(&ring, &event));
    assert(event.valid && event.code == 2u);
    assert(!deferred_process_one(&ring, &event));
    return 0;
}
`
    }
  ]
};
