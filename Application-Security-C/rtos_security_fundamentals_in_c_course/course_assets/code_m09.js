window.COURSE_CODE_MODULE = {
  "title": "Diagnostics, Logging, and Operational Readiness: code example",
  "codeIntro": "A bounded structured fault log records actionable categories and counters without accepting arbitrary external text or exposing records to an unauthorized service session.",
  "codeExamples": [
    {
      "title": "Record bounded, controlled diagnostic evidence",
      "language": "c",
      "blurb": "The log has fixed storage, validates its taxonomy, counts dropped events, and gates field reads on service authorization.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define DIAGNOSTIC_CAPACITY 3u
#define MAX_TASK_ID 8u

enum fault_code {
    FAULT_WATCHDOG = 1,
    FAULT_STACK_MARGIN = 2,
    FAULT_DRIVER_TIMEOUT = 3
};

struct fault_record {
    enum fault_code code;
    uint8_t task_id;
    uint32_t tick;
};

struct diagnostic_log {
    struct fault_record records[DIAGNOSTIC_CAPACITY];
    size_t count;
    size_t dropped;
};

static bool fault_code_allowed(enum fault_code code)
{
    return code == FAULT_WATCHDOG || code == FAULT_STACK_MARGIN ||
           code == FAULT_DRIVER_TIMEOUT;
}

static bool diagnostic_record(struct diagnostic_log *log,
                              enum fault_code code, uint8_t task_id,
                              uint32_t tick)
{
    if (log == NULL || !fault_code_allowed(code) ||
        task_id == 0u || task_id > MAX_TASK_ID) {
        return false;
    }
    if (log->count == DIAGNOSTIC_CAPACITY) {
        if (log->dropped != SIZE_MAX) {
            log->dropped++;
        }
        return false;
    }

    /* IMPORTANT FIX: store bounded taxonomy fields, never arbitrary raw input. */
    log->records[log->count] = (struct fault_record){code, task_id, tick};
    log->count++;
    return true;
}

static bool diagnostic_read(const struct diagnostic_log *log, size_t index,
                            bool service_authorized,
                            struct fault_record *record)
{
    if (log == NULL || record == NULL || !service_authorized ||
        index >= log->count) {
        return false;
    }
    *record = log->records[index];
    return true;
}

int main(void)
{
    struct diagnostic_log log = {{{0}}, 0u, 0u};
    struct fault_record record = {FAULT_WATCHDOG, 0u, 0u};

    assert(!diagnostic_record(&log, (enum fault_code)99, 1u, 10u));
    assert(!diagnostic_record(&log, FAULT_WATCHDOG, 0u, 10u));
    assert(diagnostic_record(&log, FAULT_WATCHDOG, 2u, 100u));
    assert(diagnostic_record(&log, FAULT_STACK_MARGIN, 3u, 110u));
    assert(diagnostic_record(&log, FAULT_DRIVER_TIMEOUT, 4u, 120u));
    /* TEST: saturation is explicit and cannot consume unbounded storage. */
    assert(!diagnostic_record(&log, FAULT_WATCHDOG, 2u, 130u));
    assert(log.count == DIAGNOSTIC_CAPACITY);
    assert(log.dropped == 1u);

    assert(!diagnostic_read(&log, 0u, false, &record));
    assert(diagnostic_read(&log, 2u, true, &record));
    assert(record.code == FAULT_DRIVER_TIMEOUT);
    assert(record.task_id == 4u);
    assert(!diagnostic_read(&log, DIAGNOSTIC_CAPACITY, true, &record));
    return 0;
}
`
    }
  ]
};
