window.COURSE_CODE_MODULE = {
  "title": "Memory Safety in RTOS C Code: code example",
  "codeIntro": "A fixed memory pool bounds allocation, makes exhaustion predictable, and uses generation-tagged handles to reject stale references.",
  "codeExamples": [
    {
      "title": "Bound allocation with a generation-safe memory pool",
      "language": "c",
      "blurb": "Pool handles identify both a slot and its lifecycle generation, so returning and reusing a block cannot revive an old handle.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define POOL_CAPACITY 2u
#define BLOCK_SIZE 8u

struct pool_slot {
    uint8_t bytes[BLOCK_SIZE];
    size_t generation;
    bool in_use;
    bool retired;
};

struct block_pool {
    struct pool_slot slots[POOL_CAPACITY];
};

struct pool_handle {
    size_t index;
    size_t generation;
};

static void pool_init(struct block_pool *pool)
{
    size_t index = 0u;

    assert(pool != NULL);
    memset(pool, 0, sizeof *pool);
    for (index = 0u; index < POOL_CAPACITY; index++) {
        pool->slots[index].generation = 1u;
    }
}

static bool pool_acquire(struct block_pool *pool, struct pool_handle *handle)
{
    size_t index = 0u;

    if (pool == NULL || handle == NULL) {
        return false;
    }
    for (index = 0u; index < POOL_CAPACITY; index++) {
        struct pool_slot *slot = &pool->slots[index];
        if (!slot->in_use && !slot->retired) {
            slot->in_use = true;
            handle->index = index;
            handle->generation = slot->generation;
            return true;
        }
    }
    return false;
}

static bool pool_write(struct block_pool *pool, struct pool_handle handle,
                       size_t offset, const uint8_t *source, size_t length)
{
    struct pool_slot *slot = NULL;

    if (pool == NULL || source == NULL || handle.index >= POOL_CAPACITY) {
        return false;
    }
    slot = &pool->slots[handle.index];
    if (!slot->in_use || slot->generation != handle.generation ||
        offset > BLOCK_SIZE || length > BLOCK_SIZE - offset) {
        return false;
    }
    memmove(slot->bytes + offset, source, length);
    return true;
}

static bool pool_release(struct block_pool *pool, struct pool_handle handle)
{
    struct pool_slot *slot = NULL;

    if (pool == NULL || handle.index >= POOL_CAPACITY) {
        return false;
    }
    slot = &pool->slots[handle.index];
    if (!slot->in_use || slot->generation != handle.generation) {
        return false;
    }
    memset(slot->bytes, 0, sizeof slot->bytes);
    slot->in_use = false;
    /* IMPORTANT FIX: advance the lifecycle tag or retire the exhausted slot. */
    if (slot->generation == SIZE_MAX) {
        slot->retired = true;
    } else {
        slot->generation++;
    }
    return true;
}

int main(void)
{
    struct block_pool pool;
    struct pool_handle first = {0u, 0u};
    struct pool_handle second = {0u, 0u};
    struct pool_handle reused = {0u, 0u};
    const uint8_t data[] = {1u, 2u, 3u};

    pool_init(&pool);
    assert(pool_acquire(&pool, &first));
    assert(pool_acquire(&pool, &second));
    assert(!pool_acquire(&pool, &reused));
    assert(pool_write(&pool, first, 5u, data, sizeof data));
    assert(!pool_write(&pool, first, 6u, data, sizeof data));

    assert(pool_release(&pool, first));
    /* TEST: a returned block rejects its stale handle after reuse. */
    assert(!pool_write(&pool, first, 0u, data, sizeof data));
    assert(pool_acquire(&pool, &reused));
    assert(reused.index == first.index);
    assert(reused.generation != first.generation);

    assert(pool_release(&pool, second));
    assert(pool_release(&pool, reused));
    return 0;
}
`
    }
  ]
};
