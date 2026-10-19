window.COURSE_CODE_MODULE = {
  "title": "Sensitive Data in Small Memory Spaces",
  "codeIntro": "Give the shared secret buffer one owner, minimize its live interval, expose only bounded metadata to diagnostics, and clear it before reuse.",
  "codeExamples": [
    {
      "title": "Clear a fixed secret buffer before release",
      "language": "c",
      "blurb": "The owner accepts one bounded secret, reports only its length, and uses volatile byte stores to reduce accidental retention before reuse.",
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

#define SECRET_CAPACITY 16U

typedef struct {
    uint8_t bytes[SECRET_CAPACITY];
    size_t length;
    bool occupied;
} secret_buffer;

static void clear_bytes(void *memory, size_t length)
{
    volatile uint8_t *bytes = memory;
    size_t i = 0U;

    if (bytes != NULL) {
        for (i = 0U; i < length; ++i) {
            bytes[i] = 0U;
        }
    }
}

static bool secret_load(secret_buffer *buffer,
                        const uint8_t *secret, size_t secret_length)
{
    if (buffer == NULL || secret == NULL || buffer->occupied ||
        secret_length == 0U || secret_length > SECRET_CAPACITY) {
        return false;
    }
    (void)memcpy(buffer->bytes, secret, secret_length);
    buffer->length = secret_length;
    buffer->occupied = true;
    return true;
}

static size_t diagnostic_secret_length(const secret_buffer *buffer)
{
    return buffer != NULL && buffer->occupied ? buffer->length : 0U;
}

static void secret_release(secret_buffer *buffer)
{
    if (buffer != NULL && buffer->occupied) {
        /* IMPORTANT FIX: clear the full reusable storage before release. */
        clear_bytes(buffer->bytes, sizeof buffer->bytes);
        buffer->length = 0U;
        buffer->occupied = false;
    }
}

int main(void)
{
    static const uint8_t secret[] = {
        0x91U, 0x00U, 0x42U, 0x7eU, 0x18U
    };
    secret_buffer buffer = { { 0U }, 0U, false };
    size_t i = 0U;

    /* TEST: diagnostics expose length, not raw secret bytes. */
    CHECK(secret_load(&buffer, secret, sizeof secret));
    CHECK(diagnostic_secret_length(&buffer) == sizeof secret);
    CHECK(!secret_load(&buffer, secret, sizeof secret));

    /* TEST: release clears every byte before the buffer can be reused. */
    secret_release(&buffer);
    CHECK(!buffer.occupied && diagnostic_secret_length(&buffer) == 0U);
    for (i = 0U; i < sizeof buffer.bytes; ++i) {
        CHECK(buffer.bytes[i] == 0U);
    }

    puts("sensitive buffer lifetime tests passed");
    return 0;
}
`
    }
  ]
};
