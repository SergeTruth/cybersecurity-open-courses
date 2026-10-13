window.COURSE_CODE_MODULE = {
  "title": "Communications, Peripherals, and Isolation: code example",
  "codeIntro": "A DMA-backed buffer may transition to CPU ownership only after the platform driver reports transfer completion and performs its required barriers, cache maintenance, and descriptor handling.",
  "codeExamples": [
    {
      "title": "Vulnerable: CPU reads a hardware-owned buffer",
      "language": "c",
      "blurb": "The handler checks only length and processes bytes while the DMA engine still owns and may be changing the buffer.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum buffer_owner { OWNER_HARDWARE, OWNER_CPU };
struct dma_buffer { uint8_t data[4]; size_t length; enum buffer_owner owner; };

static bool frame_sum(const struct dma_buffer *buffer, uint16_t *sum)
{
    size_t index;

    if (buffer == NULL || sum == NULL || buffer->length > 4u) {
        return false;
    }
    /* IMPORTANT DEFECT: ownership is ignored before shared memory is read. */
    *sum = 0u;
    for (index = 0u; index < buffer->length; index++) {
        *sum = (uint16_t)(*sum + buffer->data[index]);
    }
    return true;
}

int main(void)
{
    const struct dma_buffer buffer =
        { { 1u, 2u, 3u, 4u }, 4u, OWNER_HARDWARE };
    uint16_t sum = 0u;

    assert(frame_sum(&buffer, &sum));
    /* TEST: data was consumed before hardware released ownership. */
    assert(sum == 10u && buffer.owner == OWNER_HARDWARE);
    return 0;
}
`
    },
    {
      "title": "Safer: require an explicit DMA ownership handoff",
      "language": "c",
      "blurb": "The enum models policy after platform-specific synchronization; it is not itself a DMA barrier or cache-maintenance operation. The application rejects every hardware-owned buffer.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum buffer_owner { OWNER_HARDWARE, OWNER_CPU };
struct dma_buffer { uint8_t data[4]; size_t length; enum buffer_owner owner; };

static bool dma_complete(struct dma_buffer *buffer, size_t received,
                         bool platform_sync_complete)
{
    if (buffer == NULL || buffer->owner != OWNER_HARDWARE ||
        !platform_sync_complete || received > 4u) {
        return false;
    }
    buffer->length = received;
    /* POLICY MODEL: the platform completion handler has already synchronized
       the transfer, applied memory barriers and cache maintenance as needed,
       and processed the hardware descriptor before publishing CPU ownership. */
    buffer->owner = OWNER_CPU;
    return true;
}

static bool frame_sum(const struct dma_buffer *buffer, uint16_t *sum)
{
    size_t index;

    if (buffer == NULL || sum == NULL || buffer->owner != OWNER_CPU ||
        buffer->length > 4u) {
        return false;
    }
    *sum = 0u;
    for (index = 0u; index < buffer->length; index++) {
        *sum = (uint16_t)(*sum + buffer->data[index]);
    }
    return true;
}

int main(void)
{
    struct dma_buffer buffer =
        { { 1u, 2u, 3u, 4u }, 0u, OWNER_HARDWARE };
    uint16_t sum = 0u;

    assert(!frame_sum(&buffer, &sum));
    assert(!dma_complete(&buffer, 4u, false));
    assert(dma_complete(&buffer, 4u, true));
    /* TEST: access begins only after synchronization and policy handoff. */
    assert(frame_sum(&buffer, &sum));
    assert(sum == 10u && buffer.owner == OWNER_CPU);
    return 0;
}
`
    }
  ]
};
