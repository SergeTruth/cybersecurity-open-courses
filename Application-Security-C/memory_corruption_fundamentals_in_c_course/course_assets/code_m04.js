window.COURSE_CODE_MODULE = {
  "title": "Bounds Errors and Buffer Misuse",
  "codeIntro": "A multi-byte read must prove that the complete field lies inside the logical packet before decoding it.",
  "codeExamples": [
    {
      "title": "Vulnerable: validate only the starting offset",
      "language": "c",
      "blurb": "The first-byte check allows a two-byte read to consume a guard byte beyond the packet's declared logical length.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool read_u16_be(const uint8_t *packet, size_t packet_length,
                        size_t offset, uint16_t *result)
{
    if (packet == NULL || result == NULL || offset >= packet_length) {
        return false;
    }

    /* IMPORTANT DEFECT: the second byte is outside the checked range. */
    *result = (uint16_t)(((uint16_t)packet[offset] << 8) |
                         (uint16_t)packet[offset + 1]);
    return true;
}

int main(void)
{
    const uint8_t physical_packet[6] = {0U, 1U, 2U, 3U, 0xaaU, 0xbbU};
    uint16_t value = 0U;

    assert(read_u16_be(physical_packet, 4U, 3U, &value));

    /* TEST: decoding stayed allocated but consumed the logical guard. */
    assert(value == UINT16_C(0x03aa));
    return 0;
}
`
    },
    {
      "title": "Safer: validate the complete field width",
      "language": "c",
      "blurb": "Subtraction-based range validation proves both bytes fit and rejects the last-byte boundary without touching the guard.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool read_u16_be(const uint8_t *packet, size_t packet_length,
                        size_t offset, uint16_t *result)
{
    const size_t field_width = 2U;

    if (packet == NULL || result == NULL || offset > packet_length ||
        field_width > packet_length - offset) {
        return false;
    }

    /* IMPORTANT FIX: derive indexes only after the full range fits. */
    *result = (uint16_t)(((uint16_t)packet[offset] << 8) |
                         (uint16_t)packet[offset + 1]);
    return true;
}

int main(void)
{
    const uint8_t physical_packet[6] = {0U, 1U, 2U, 3U, 0xaaU, 0xbbU};
    uint16_t value = UINT16_MAX;

    assert(read_u16_be(physical_packet, 4U, 2U, &value));
    assert(value == UINT16_C(0x0203));

    /* TEST: the last-byte start is rejected without reading the guard. */
    value = UINT16_MAX;
    assert(!read_u16_be(physical_packet, 4U, 3U, &value));
    assert(value == UINT16_MAX);
    return 0;
}
`
    }
  ]
};
