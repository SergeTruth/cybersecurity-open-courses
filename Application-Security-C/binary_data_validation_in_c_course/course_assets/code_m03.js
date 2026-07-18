window.COURSE_CODE_MODULE = {
  "title": "Reading Bytes Safely: code example",
  "codeIntro": "The comparison separates allocated capacity from the number of bytes that were actually received.",
  "codeExamples": [
    {
      "title": "Vulnerable: capacity is mistaken for data length",
      "language": "c",
      "blurb": "The reader accepts the allocation size, so stale guard bytes are decoded after a four-byte partial read.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool read_version(const uint8_t *buffer, size_t capacity,
                         uint16_t *out)
{
    if (buffer == NULL || out == NULL || capacity < 6u) {
        return false;
    }

    /* IMPORTANT DEFECT: capacity does not say how many bytes arrived. */
    *out = (uint16_t)(((uint16_t)buffer[4] << 8u) |
                      (uint16_t)buffer[5]);
    return true;
}

int main(void)
{
    const uint8_t storage[] = { 'B', 'I', 'N', '1', 0xaau, 0xbbu };
    const size_t bytes_received = 4u;
    uint16_t version = 0u;

    assert(bytes_received == 4u);
    /* TEST: the unused tail is physical storage, not valid input. */
    assert(read_version(storage, sizeof storage, &version));
    assert(version == 0xaabbu);
    return 0;
}
`
    },
    {
      "title": "Safer: validate the actual received length",
      "language": "c",
      "blurb": "The decoder receives the valid byte count and rejects a truncated prefix before touching the version field.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

static bool read_version(const uint8_t *data, size_t length, uint16_t *out)
{
    if (data == NULL || out == NULL || length < 6u) {
        return false;
    }

    /* IMPORTANT FIX: authorize both version bytes from valid input. */
    *out = (uint16_t)(((uint16_t)data[4] << 8u) | (uint16_t)data[5]);
    return true;
}

int main(void)
{
    const uint8_t input[] = { 'B', 'I', 'N', '1', 0u, 2u };
    uint16_t version = 0u;

    /* TEST: partial input fails even though the array has spare capacity. */
    assert(!read_version(input, 4u, &version));
    assert(read_version(input, sizeof input, &version));
    assert(version == 2u);
    return 0;
}
`
    }
  ]
};
