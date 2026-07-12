window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validate Binary Length Fields",
  "codeExamples": [
    {
      "title": "Validate Binary Length Fields",
      "language": "c",
      "code": String.raw`#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_PAYLOAD UINT32_C(4096)

static uint32_t read_u32_le(const unsigned char bytes[4])
{
    return ((uint32_t)bytes[0]) |
           ((uint32_t)bytes[1] << 8) |
           ((uint32_t)bytes[2] << 16) |
           ((uint32_t)bytes[3] << 24);
}

int parse_packet(const unsigned char *input, size_t input_len,
                 const unsigned char **payload, size_t *payload_len)
{
    uint32_t declared_len;

    if (input == NULL || payload == NULL || payload_len == NULL) {
        return -1;
    }
    if (input_len < 8U || memcmp(input, "PKT1", 4U) != 0) {
        return -1;
    }

    declared_len = read_u32_le(input + 4U);
    if (declared_len > MAX_PAYLOAD ||
        (size_t)declared_len != input_len - 8U) {
        return -1;
    }

    /*
     * The returned payload is borrowed from input. It remains valid only
     * while input remains alive and unmodified.
     */
    *payload = input + 8U;
    *payload_len = (size_t)declared_len;
    return 0;
}
`
    }
  ]
};
