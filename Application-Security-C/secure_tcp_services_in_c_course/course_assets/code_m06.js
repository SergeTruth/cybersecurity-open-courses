window.COURSE_CODE_MODULE = {
  "title": "Timeouts, Limits, and Backpressure: code example",
  "codeIntro": "Per-response size checks are not enough. A TCP service also needs an aggregate queue budget and a controlled response when a client stops draining output.",
  "codeExamples": [
    {
      "title": "Vulnerable: individually valid responses grow an unbounded queue",
      "language": "c",
      "blurb": "Each response fits the per-item limit, but the service never compares accumulated pending output with the connection's queue budget.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct output_queue {
    size_t queued_bytes;
    size_t max_response_bytes;
    size_t max_queue_bytes;
};

static bool queue_response(struct output_queue *queue, size_t response_bytes)
{
    if (queue == NULL || response_bytes == 0u ||
        response_bytes > queue->max_response_bytes) {
        return false;
    }

    /* IMPORTANT DEFECT: only the current response has a size check. */
    queue->queued_bytes += response_bytes;
    return true;
}

int main(void)
{
    struct output_queue queue = { 6u, 4u, 8u };

    /* TEST: a valid four-byte response pushes pending output over budget. */
    assert(queue_response(&queue, 4u));
    assert(queue.queued_bytes == 10u);
    assert(queue.queued_bytes > queue.max_queue_bytes);
    return 0;
}
`
    },
    {
      "title": "Safer: apply bounded backpressure and idle cleanup",
      "language": "c",
      "blurb": "The queue uses subtraction-based capacity checks, pauses reads under pressure, and releases pending output after the configured idle timeout.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum queue_result {
    QUEUE_ACCEPTED,
    QUEUE_BACKPRESSURE,
    QUEUE_TIMED_OUT,
    QUEUE_INVALID
};

struct output_queue {
    size_t queued_bytes;
    size_t max_response_bytes;
    size_t max_queue_bytes;
    size_t last_progress_tick;
    size_t idle_limit_ticks;
    bool reads_paused;
    bool closed;
};

static enum queue_result queue_response(struct output_queue *queue,
                                        size_t response_bytes,
                                        size_t current_tick)
{
    if (queue == NULL || queue->closed || response_bytes == 0u ||
        response_bytes > queue->max_response_bytes ||
        current_tick < queue->last_progress_tick) {
        return QUEUE_INVALID;
    }
    if (current_tick - queue->last_progress_tick > queue->idle_limit_ticks) {
        queue->queued_bytes = 0u;
        queue->closed = true;
        queue->reads_paused = true;
        return QUEUE_TIMED_OUT;
    }

    /* IMPORTANT FIX: reject pressure before overflow or state growth. */
    if (queue->queued_bytes > queue->max_queue_bytes ||
        response_bytes > queue->max_queue_bytes - queue->queued_bytes) {
        queue->reads_paused = true;
        return QUEUE_BACKPRESSURE;
    }

    queue->queued_bytes += response_bytes;
    return QUEUE_ACCEPTED;
}

int main(void)
{
    struct output_queue accepted = { 3u, 4u, 8u, 10u, 5u, false, false };
    struct output_queue pressured = { 6u, 4u, 8u, 10u, 5u, false, false };
    struct output_queue idle = { 5u, 4u, 8u, 10u, 5u, false, false };

    assert(queue_response(&accepted, 4u, 12u) == QUEUE_ACCEPTED);
    assert(accepted.queued_bytes == 7u);

    /* TEST: pressure pauses new reads without growing the queue. */
    assert(queue_response(&pressured, 4u, 12u) == QUEUE_BACKPRESSURE);
    assert(pressured.queued_bytes == 6u);
    assert(pressured.reads_paused);

    /* TEST: an expired idle connection releases queued output. */
    assert(queue_response(&idle, 1u, 16u) == QUEUE_TIMED_OUT);
    assert(idle.queued_bytes == 0u);
    assert(idle.closed);
    assert(queue_response(NULL, 1u, 1u) == QUEUE_INVALID);
    return 0;
}
`
    }
  ]
};
