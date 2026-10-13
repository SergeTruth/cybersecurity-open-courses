window.COURSE_CODE_MODULE = {
  "title": "Diagnostics, Faults, and Operational Readiness",
  "codeIntro": "Record a small, bounded fault taxonomy instead of dumping raw buffers or sensitive device state.",
  "codeExamples": [
    {
      "title": "Keep a bounded chronological fault log",
      "language": "c",
      "blurb": "A fixed ring retains recent reset evidence using stable categories, task markers, and counters suitable for runbooks.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

#define FAULT_LOG_CAPACITY 4U

typedef enum {
    FAULT_WATCHDOG,
    FAULT_STORAGE,
    FAULT_UPDATE,
    FAULT_COMMUNICATION
} fault_category;

typedef struct {
    fault_category category;
    unsigned int task_marker;
    unsigned int occurrence_count;
} fault_event;

typedef struct {
    fault_event events[FAULT_LOG_CAPACITY];
    size_t next;
    size_t count;
} fault_log;

static bool record_fault(fault_log *log, fault_category category,
                         unsigned int task_marker,
                         unsigned int occurrence_count)
{
    if (log == NULL || log->next >= FAULT_LOG_CAPACITY ||
        log->count > FAULT_LOG_CAPACITY ||
        category < FAULT_WATCHDOG || category > FAULT_COMMUNICATION ||
        task_marker > 31U || occurrence_count == 0U) {
        return false;
    }

    /* IMPORTANT FIX: retain bounded categories, never arbitrary raw input. */
    log->events[log->next].category = category;
    log->events[log->next].task_marker = task_marker;
    log->events[log->next].occurrence_count = occurrence_count;
    log->next = (log->next + 1U) % FAULT_LOG_CAPACITY;
    if (log->count < FAULT_LOG_CAPACITY) {
        log->count += 1U;
    }
    return true;
}

static bool fault_at(const fault_log *log, size_t chronological_index,
                     fault_event *event)
{
    size_t oldest = 0U;
    size_t slot = 0U;

    if (log == NULL || event == NULL || log->count > FAULT_LOG_CAPACITY ||
        chronological_index >= log->count) {
        return false;
    }
    oldest = log->count == FAULT_LOG_CAPACITY ? log->next : 0U;
    slot = (oldest + chronological_index) % FAULT_LOG_CAPACITY;
    *event = log->events[slot];
    return true;
}

int main(void)
{
    fault_log log = { { { FAULT_WATCHDOG, 0U, 0U } }, 0U, 0U };
    fault_event event = { FAULT_WATCHDOG, 0U, 0U };

    /* TEST: the ring accepts stable, bounded operational evidence. */
    assert(record_fault(&log, FAULT_WATCHDOG, 3U, 1U));
    assert(record_fault(&log, FAULT_STORAGE, 4U, 1U));
    assert(record_fault(&log, FAULT_UPDATE, 5U, 2U));
    assert(record_fault(&log, FAULT_COMMUNICATION, 6U, 3U));
    assert(record_fault(&log, FAULT_STORAGE, 7U, 2U));
    assert(log.count == FAULT_LOG_CAPACITY);

    /* TEST: the oldest event is dropped and invalid evidence is rejected. */
    assert(fault_at(&log, 0U, &event));
    assert(event.category == FAULT_STORAGE && event.task_marker == 4U);
    assert(fault_at(&log, 3U, &event));
    assert(event.task_marker == 7U && event.occurrence_count == 2U);
    assert(!record_fault(&log, FAULT_UPDATE, 99U, 1U));
    assert(!fault_at(&log, FAULT_LOG_CAPACITY, &event));

    puts("bounded fault log tests passed");
    return 0;
}
`
    }
  ]
};
