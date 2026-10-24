window.COURSE_CODE_MODULE = {
  "title": "Shared Memory and Synchronization Safety: code example",
  "codeIntro": "A sequence counter lets readers reject a shared-memory snapshot while a writer is updating related fields. The protocol requires a single writer (or externally serialized writers), an odd publication before modification, and the next even publication after the field updates.",
  "codeExamples": [
    {
      "title": "Vulnerable: reader ignores an update in progress",
      "language": "c",
      "blurb": "The reader loads related atomic fields without checking the odd sequence value that marks an incomplete writer transaction.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdatomic.h>
#include <stdint.h>

struct shared_region {
    atomic_uint sequence;
    atomic_uint count;
    atomic_uint total;
};

static bool read_average(const struct shared_region *region, uint32_t *average)
{
    unsigned int count;
    unsigned int total;

    if (region == NULL || average == NULL) {
        return false;
    }
    /* IMPORTANT DEFECT: sequence is ignored while related fields are read. */
    count = atomic_load(&region->count);
    total = atomic_load(&region->total);
    if (count == 0u) {
        return false;
    }
    *average = total / count;
    return true;
}

int main(void)
{
    struct shared_region region;
    uint32_t average = 0u;

    atomic_init(&region.sequence, 1u); /* Odd means writer active. */
    atomic_init(&region.count, 2u);
    atomic_init(&region.total, 10u);
    assert(read_average(&region, &average));
    /* TEST: an incomplete shared transaction was accepted. */
    assert(average == 5u && atomic_load(&region.sequence) == 1u);
    return 0;
}
`
    },
    {
      "title": "Safer: accept only a stable shared snapshot",
      "language": "c",
      "blurb": "A serialized writer publishes odd, updates the fields, and publishes the next even value. Sequentially consistent atomic operations make that contract explicit; the reader accepts only the same even version before and after its snapshot.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <limits.h>
#include <stddef.h>
#include <stdatomic.h>
#include <stdint.h>

struct shared_region {
    atomic_uint sequence;
    atomic_uint count;
    atomic_uint total;
};

static bool write_values(struct shared_region *region,
                         unsigned int count, unsigned int total)
{
    unsigned int version;

    if (region == NULL || count == 0u) {
        return false;
    }
    /* Writers must be single-threaded or externally serialized. */
    version = atomic_load_explicit(&region->sequence,
                                   memory_order_seq_cst);
    if ((version & 1u) != 0u || version > UINT_MAX - 2u) {
        return false;
    }
    /* IMPORTANT FIX: odd is visible before the related fields change. */
    atomic_store_explicit(&region->sequence, version + 1u,
                          memory_order_seq_cst);
    atomic_store_explicit(&region->count, count, memory_order_seq_cst);
    atomic_store_explicit(&region->total, total, memory_order_seq_cst);
    /* Publish the completed snapshot with the next even version. */
    atomic_store_explicit(&region->sequence, version + 2u,
                          memory_order_seq_cst);
    return true;
}

static bool read_average(const struct shared_region *region, uint32_t *average)
{
    unsigned int before;
    unsigned int after;
    unsigned int count;
    unsigned int total;

    if (region == NULL || average == NULL) {
        return false;
    }
    before = atomic_load_explicit(&region->sequence, memory_order_seq_cst);
    if ((before & 1u) != 0u) {
        return false;
    }
    count = atomic_load_explicit(&region->count, memory_order_seq_cst);
    total = atomic_load_explicit(&region->total, memory_order_seq_cst);
    after = atomic_load_explicit(&region->sequence, memory_order_seq_cst);
    /* IMPORTANT FIX: related fields belong to one stable writer version. */
    if (before != after || count == 0u) {
        return false;
    }
    *average = total / count;
    return true;
}

int main(void)
{
    struct shared_region region;
    uint32_t average = 0u;

    atomic_init(&region.sequence, 0u);
    atomic_init(&region.count, 0u);
    atomic_init(&region.total, 0u);
    assert(write_values(&region, 2u, 10u));
    assert(atomic_load(&region.sequence) == 2u);
    /* TEST: the writer-published even snapshot is accepted. */
    assert(read_average(&region, &average));
    assert(average == 5u);
    atomic_store(&region.sequence, 3u);
    assert(!read_average(&region, &average));
    assert(!write_values(&region, 4u, 20u));
    return 0;
}
`
    }
  ]
};
