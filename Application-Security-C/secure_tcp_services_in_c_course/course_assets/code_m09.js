window.COURSE_CODE_MODULE = {
  "title": "Logging, Monitoring, and Failure Handling: code example",
  "codeIntro": "Failure telemetry should explain service behavior without turning rejected client data into a second data-exposure channel.",
  "codeExamples": [
    {
      "title": "Vulnerable: rejected frames are copied into logs",
      "language": "c",
      "blurb": "The logger records the raw client-controlled frame, exposing a credential that should have remained confined to request processing.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

static bool log_rejected_frame(const uint8_t *frame, size_t frame_length,
                               char *output, size_t capacity)
{
    if (frame == NULL || output == NULL || capacity == 0u ||
        frame_length >= capacity) {
        return false;
    }

    /* IMPORTANT DEFECT: sensitive client bytes become persistent log data. */
    memcpy(output, frame, frame_length);
    output[frame_length] = (char)0;
    return true;
}

int main(void)
{
    const uint8_t rejected[] = "token=client-secret";
    char log_line[32] = { 0 };

    assert(log_rejected_frame(rejected, sizeof rejected - 1u,
                              log_line, sizeof log_line));
    /* TEST: the credential is now present verbatim in the log. */
    assert(strstr(log_line, "client-secret") != NULL);
    return 0;
}
`
    },
    {
      "title": "Safer: record categories, counts, and service identifiers",
      "language": "c",
      "blurb": "The service emits a stable failure category and byte count, increments the matching metric, and never formats the rejected payload itself.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

enum failure_category {
    FAILURE_MALFORMED,
    FAILURE_AUTHENTICATION,
    FAILURE_TIMEOUT,
    FAILURE_RESOURCE_LIMIT,
    FAILURE_CATEGORY_COUNT
};

struct service_metrics {
    size_t failures[FAILURE_CATEGORY_COUNT];
};

static const char *category_text(enum failure_category category)
{
    switch (category) {
    case FAILURE_MALFORMED:
        return "malformed";
    case FAILURE_AUTHENTICATION:
        return "authentication";
    case FAILURE_TIMEOUT:
        return "timeout";
    case FAILURE_RESOURCE_LIMIT:
        return "resource-limit";
    case FAILURE_CATEGORY_COUNT:
    default:
        return NULL;
    }
}

static bool record_failure(struct service_metrics *metrics,
                           enum failure_category category,
                           size_t connection_id,
                           const uint8_t *frame, size_t frame_length,
                           char *output, size_t capacity)
{
    const char *label;
    int written;

    if (metrics == NULL || output == NULL || capacity == 0u ||
        (frame == NULL && frame_length != 0u)) {
        return false;
    }
    label = category_text(category);
    if (label == NULL) {
        return false;
    }

    /* IMPORTANT FIX: report metadata without formatting frame contents. */
    written = snprintf(output, capacity,
                       "connection=%zu failure=%s bytes=%zu",
                       connection_id, label, frame_length);
    if (written < 0 || (size_t)written >= capacity) {
        return false;
    }
    metrics->failures[(size_t)category] += 1u;
    return true;
}

int main(void)
{
    const uint8_t rejected[] = "token=client-secret";
    struct service_metrics metrics = { { 0u } };
    char log_line[64] = { 0 };
    volatile size_t runtime_small_capacity = 8u;

    assert(record_failure(&metrics, FAILURE_AUTHENTICATION, 42u,
                          rejected, sizeof rejected - 1u,
                          log_line, sizeof log_line));
    /* TEST: useful metadata is present while the credential is absent. */
    assert(strstr(log_line, "connection=42") != NULL);
    assert(strstr(log_line, "authentication") != NULL);
    assert(strstr(log_line, "client-secret") == NULL);
    assert(metrics.failures[FAILURE_AUTHENTICATION] == 1u);

    assert(!record_failure(&metrics, (enum failure_category)99, 42u,
                           rejected, sizeof rejected - 1u,
                           log_line, sizeof log_line));
    assert(!record_failure(&metrics, FAILURE_TIMEOUT, 42u,
                           rejected, sizeof rejected - 1u,
                           log_line, (size_t)runtime_small_capacity));
    assert(metrics.failures[FAILURE_TIMEOUT] == 0u);
    return 0;
}
`
    }
  ]
};
