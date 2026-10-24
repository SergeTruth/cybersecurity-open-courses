window.COURSE_CODE_MODULE = {
  "title": "Concurrency and Shared State: code example",
  "codeIntro": "A deterministic interleaving demonstrates how two workers can lose a shared counter update, followed by an atomic implementation suited to independent completion events.",
  "codeExamples": [
    {
      "title": "Vulnerable: split read-modify-write loses a worker update",
      "language": "c",
      "blurb": "Two workers read the same shared value before either stores its increment, so both completions collapse into one recorded result.",
      "code": `#include <assert.h>
#include <stddef.h>

struct service_metrics {
    size_t completed_requests;
};

static size_t begin_increment(const struct service_metrics *metrics)
{
    return metrics->completed_requests;
}

static void finish_increment(struct service_metrics *metrics,
                             size_t observed_value)
{
    /* IMPORTANT DEFECT: the stale observation is written back unconditionally. */
    metrics->completed_requests = observed_value + 1u;
}

int main(void)
{
    struct service_metrics metrics = { 0u };
    const size_t worker_a = begin_increment(&metrics);
    const size_t worker_b = begin_increment(&metrics);

    finish_increment(&metrics, worker_a);
    finish_increment(&metrics, worker_b);

    /* TEST: two completed requests are recorded as only one. */
    assert(worker_a == 0u);
    assert(worker_b == 0u);
    assert(metrics.completed_requests == 1u);
    return 0;
}
`
    },
    {
      "title": "Safer: update the shared metric atomically",
      "language": "c",
      "blurb": "Each completion performs one indivisible relaxed atomic increment because the counter needs uniqueness of updates, not ordering of unrelated connection state.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdatomic.h>

struct service_metrics {
    _Atomic size_t completed_requests;
};

static bool record_completion(struct service_metrics *metrics)
{
    if (metrics == NULL) {
        return false;
    }

    /* IMPORTANT FIX: no worker can overwrite another worker's increment. */
    (void)atomic_fetch_add_explicit(&metrics->completed_requests, 1u,
                                    memory_order_relaxed);
    return true;
}

int main(void)
{
    struct service_metrics metrics;

    atomic_init(&metrics.completed_requests, 0u);
    /* TEST: independent worker completions remain distinct. */
    assert(record_completion(&metrics));
    assert(record_completion(&metrics));
    assert(atomic_load_explicit(&metrics.completed_requests,
                                memory_order_relaxed) == 2u);
    assert(!record_completion(NULL));
    return 0;
}
`
    }
  ]
};
