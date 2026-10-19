window.COURSE_CODE_MODULE = {
  "title": "Heap Use, Fragmentation, and Allocation Failure",
  "codeIntro": "A fixed object pool makes the allocation limit, ownership transfer, exhaustion result, and reuse policy visible without general-heap fragmentation.",
  "codeExamples": [
    {
      "title": "Handle fixed-pool exhaustion explicitly",
      "language": "c",
      "blurb": "Three statically allocated work items can be borrowed and returned; the fourth request fails predictably until an owner releases a slot.",
      "code": `/* Test checks are active even with -DNDEBUG; each expression runs once. */
#define CHECK(condition) do { if (!(condition)) { \\
    (void)fprintf(stderr, "check failed: %s at line %d\\n", \\
                  #condition, __LINE__); return 1; \\
} } while (0)
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#define POOL_CAPACITY 3U

typedef struct {
    uint8_t bytes[8];
    size_t length;
} work_item;

typedef struct {
    work_item items[POOL_CAPACITY];
    bool in_use[POOL_CAPACITY];
} work_pool;

static bool pool_acquire(work_pool *pool, work_item **owned_item)
{
    size_t i = 0U;

    if (pool == NULL || owned_item == NULL || *owned_item != NULL) {
        return false;
    }
    for (i = 0U; i < POOL_CAPACITY; ++i) {
        if (!pool->in_use[i]) {
            pool->in_use[i] = true;
            (void)memset(&pool->items[i], 0, sizeof pool->items[i]);
            *owned_item = &pool->items[i];
            return true;
        }
    }

    /* IMPORTANT FIX: pool exhaustion is an explicit, non-mutating failure. */
    return false;
}

static bool pool_release(work_pool *pool, work_item **owned_item)
{
    size_t i = 0U;

    if (pool == NULL || owned_item == NULL || *owned_item == NULL) {
        return false;
    }
    for (i = 0U; i < POOL_CAPACITY; ++i) {
        if (*owned_item == &pool->items[i] && pool->in_use[i]) {
            (void)memset(&pool->items[i], 0, sizeof pool->items[i]);
            pool->in_use[i] = false;
            *owned_item = NULL;
            return true;
        }
    }
    return false;
}

int main(void)
{
    work_pool pool = { { { { 0U }, 0U } }, { false, false, false } };
    work_item *first = NULL;
    work_item *second = NULL;
    work_item *third = NULL;
    work_item *fourth = NULL;

    /* TEST: the documented number of objects can be owned concurrently. */
    CHECK(pool_acquire(&pool, &first));
    CHECK(pool_acquire(&pool, &second));
    CHECK(pool_acquire(&pool, &third));
    first->bytes[0] = 0x42U;
    first->length = 1U;

    /* TEST: exhaustion rejects, then a released slot can be reused cleanly. */
    CHECK(!pool_acquire(&pool, &fourth));
    CHECK(fourth == NULL && first->bytes[0] == 0x42U);
    CHECK(pool_release(&pool, &first));
    CHECK(first == NULL);
    CHECK(pool_acquire(&pool, &fourth));
    CHECK(fourth->length == 0U && fourth->bytes[0] == 0U);

    CHECK(pool_release(&pool, &second));
    CHECK(pool_release(&pool, &third));
    CHECK(pool_release(&pool, &fourth));

    puts("fixed pool tests passed");
    return 0;
}
`
    }
  ]
};
