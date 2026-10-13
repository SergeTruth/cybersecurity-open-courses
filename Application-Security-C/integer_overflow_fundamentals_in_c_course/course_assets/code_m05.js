window.COURSE_CODE_MODULE = {
  "title": "Allocation Size and Buffer Math",
  "codeIntro": "Establish every multiplication and addition—including terminator space—before allocating a header, trailing records, and label as one object.",
  "codeExamples": [
    {
      "title": "Allocate a catalog with checked layout math",
      "language": "c",
      "blurb": "The object follows its real types with `sizeof`, rejects unrepresentable layouts, and initializes only the bytes actually allocated.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    uint32_t identifier;
    uint16_t flags;
} catalog_record;

typedef struct {
    size_t record_count;
    size_t label_length;
    catalog_record records[];
} catalog;

static bool catalog_create(size_t record_count,
                           const char *label, size_t label_length,
                           catalog **output)
{
    catalog *item = NULL;
    size_t records_bytes = 0U;
    size_t total_bytes = 0U;
    char *stored_label = NULL;

    if (label == NULL || output == NULL || *output != NULL ||
        label_length == SIZE_MAX ||
        record_count > SIZE_MAX / sizeof(catalog_record)) {
        return false;
    }
    records_bytes = record_count * sizeof(catalog_record);
    if (records_bytes > SIZE_MAX - sizeof(catalog) ||
        label_length + 1U > SIZE_MAX - sizeof(catalog) - records_bytes) {
        return false;
    }

    /* IMPORTANT FIX: validate multiplication and both additions first. */
    total_bytes = sizeof(catalog) + records_bytes + label_length + 1U;
    item = calloc(1U, total_bytes);
    if (item == NULL) {
        return false;
    }
    item->record_count = record_count;
    item->label_length = label_length;
    stored_label = (char *)(item->records + record_count);
    (void)memcpy(stored_label, label, label_length);
    stored_label[label_length] = '\\0';
    *output = item;
    return true;
}

static const char *catalog_label(const catalog *item)
{
    if (item == NULL) {
        return NULL;
    }
    return (const char *)(item->records + item->record_count);
}

int main(void)
{
    catalog *item = NULL;
    const size_t impossible_count = SIZE_MAX / sizeof(catalog_record) + 1U;

    /* TEST: the exact combined layout stores records and a terminated label. */
    assert(catalog_create(2U, "alpha", sizeof "alpha" - 1U, &item));
    assert(item != NULL && item->record_count == 2U);
    item->records[1].identifier = UINT32_C(42);
    assert(item->records[1].identifier == UINT32_C(42));
    assert(strcmp(catalog_label(item), "alpha") == 0);
    free(item);
    item = NULL;

    /* TEST: multiplication and terminator-addition overflow reject. */
    assert(!catalog_create(impossible_count, "x", 1U, &item));
    assert(!catalog_create(1U, "x", SIZE_MAX, &item));
    assert(item == NULL);

    puts("allocation layout tests passed");
    return 0;
}
`
    }
  ]
};
