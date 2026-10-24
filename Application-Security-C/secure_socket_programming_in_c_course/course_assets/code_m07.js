window.COURSE_CODE_MODULE = {
  "title": "Timeouts, Limits, and Availability: code example",
  "codeIntro": "Admission control must account for message size, connection count, idle time, queue capacity, and arithmetic before committing service state.",
  "codeExamples": [
    {
      "title": "Vulnerable: per-message checks ignore aggregate pressure",
      "language": "c",
      "blurb": "Each request fits the message limit, but the service accepts work without checking its connection count, idle age, or total queued bytes.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct service_policy {
    size_t max_message_bytes;
    size_t max_queued_bytes;
};

struct service_state {
    size_t active_connections;
    size_t queued_bytes;
};

static bool admit_request(const struct service_policy *policy,
                          struct service_state *state,
                          size_t message_bytes, size_t idle_seconds)
{
    (void)idle_seconds;

    if (policy == NULL || state == NULL ||
        message_bytes > policy->max_message_bytes) {
        return false;
    }

    /* IMPORTANT DEFECT: aggregate queue pressure is never governed. */
    state->active_connections += 1u;
    state->queued_bytes += message_bytes;
    return true;
}

int main(void)
{
    const struct service_policy policy = { 8u, 10u };
    struct service_state state = { 4u, 8u };

    /* TEST: a small request pushes the queue beyond its documented cap. */
    assert(admit_request(&policy, &state, 4u, 300u));
    assert(state.queued_bytes == 12u);
    assert(state.queued_bytes > policy.max_queued_bytes);
    return 0;
}
`
    },
    {
      "title": "Safer: enforce resource limits before admission",
      "language": "c",
      "blurb": "The service validates all policy dimensions with subtraction-based capacity checks and changes state only after the request is accepted.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct service_policy {
    size_t max_connections;
    size_t max_message_bytes;
    size_t max_queued_bytes;
    size_t max_idle_seconds;
};

struct service_state {
    size_t active_connections;
    size_t queued_bytes;
};

static bool admit_connection(const struct service_policy *policy,
                             struct service_state *state)
{
    if (policy == NULL || state == NULL ||
        state->active_connections >= policy->max_connections) {
        return false;
    }
    state->active_connections += 1u;
    return true;
}

static bool queue_request(const struct service_policy *policy,
                          struct service_state *state,
                          size_t message_bytes, size_t idle_seconds)
{
    if (policy == NULL || state == NULL ||
        state->active_connections == 0u ||
        message_bytes > policy->max_message_bytes ||
        idle_seconds > policy->max_idle_seconds ||
        state->queued_bytes > policy->max_queued_bytes ||
        message_bytes > policy->max_queued_bytes - state->queued_bytes) {
        return false;
    }

    /* IMPORTANT FIX: commit state only after every resource check passes. */
    state->queued_bytes += message_bytes;
    return true;
}

int main(void)
{
    const struct service_policy policy = { 5u, 8u, 12u, 30u };
    struct service_state accepted = { 3u, 6u };
    struct service_state full_queue = { 2u, 10u };
    struct service_state full_connections = { 5u, 0u };

    assert(admit_connection(&policy, &accepted));
    assert(accepted.active_connections == 4u);
    assert(queue_request(&policy, &accepted, 4u, 5u));
    assert(accepted.queued_bytes == 10u);
    assert(queue_request(&policy, &accepted, 2u, 5u));
    assert(accepted.active_connections == 4u);
    assert(accepted.queued_bytes == 12u);

    /* TEST: rejected work leaves service accounting unchanged. */
    assert(!queue_request(&policy, &full_queue, 4u, 5u));
    assert(full_queue.queued_bytes == 10u);
    assert(!admit_connection(&policy, &full_connections));
    assert(!queue_request(&policy, &accepted, 1u, 31u));
    assert(!queue_request(NULL, &accepted, 1u, 1u));
    return 0;
}
`
    }
  ]
};
