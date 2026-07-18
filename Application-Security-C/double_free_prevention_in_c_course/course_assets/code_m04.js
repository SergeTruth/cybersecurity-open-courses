window.COURSE_CODE_MODULE = {
  "title": "Cleanup Path Design",
  "codeIntro": "A single cleanup section keeps ownership and output state predictable across every failure path.",
  "codeExamples": [
    {
      "title": "Centralized cleanup with a stable output contract",
      "language": "c",
      "blurb": "The caller must pass a pointer to a NULL owner slot. The builder publishes only after success, and every earlier exit reaches one teardown path.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

struct report {
    unsigned char *heading;
    int *rows;
    size_t row_count;
};

static void report_destroy(struct report **slot)
{
    if (slot == NULL || *slot == NULL) {
        return;
    }
    free((*slot)->rows);
    free((*slot)->heading);
    free(*slot);
    *slot = NULL;
}

static bool report_build(size_t row_count, size_t fail_stage,
                         struct report **out)
{
    struct report *report = NULL;
    bool ok = false;

    if (out == NULL || *out != NULL || row_count == 0U ||
        row_count > SIZE_MAX / sizeof *report->rows) {
        return false;
    }

    report = calloc(1U, sizeof *report);
    if (report == NULL || fail_stage == 1U) {
        goto cleanup;
    }
    report->heading = malloc(4U);
    if (report->heading == NULL || fail_stage == 2U) {
        goto cleanup;
    }
    report->rows = calloc(row_count, sizeof *report->rows);
    if (report->rows == NULL) {
        goto cleanup;
    }
    report->row_count = row_count;

    *out = report;
    report = NULL;
    ok = true;

cleanup:
    /* IMPORTANT FIX: unpublished partial state has one cleanup authority. */
    report_destroy(&report);
    return ok;
}

int main(void)
{
    struct report *report = NULL;
    struct report *existing;

    /* TEST: each simulated construction failure leaves the output NULL. */
    assert(!report_build(3U, 1U, &report));
    assert(report == NULL);
    assert(!report_build(3U, 2U, &report));
    assert(report == NULL);
    assert(!report_build(0U, 0U, &report));

    assert(report_build(3U, 0U, &report));
    assert(report != NULL && report->row_count == 3U);
    existing = report;
    /* TEST: a nonempty owner slot is rejected without modification. */
    assert(!report_build(2U, 0U, &report));
    assert(report == existing && report->row_count == 3U);
    report_destroy(&report);
    assert(report == NULL);
    return 0;
}
`
    }
  ]
};
