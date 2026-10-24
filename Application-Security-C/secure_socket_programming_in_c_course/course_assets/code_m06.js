window.COURSE_CODE_MODULE = {
  "title": "Partial I/O and Buffer Management: code example",
  "codeIntro": "A deterministic short-write transport shows why success means advancing by the returned byte count until the complete buffer is sent.",
  "codeExamples": [
    {
      "title": "Vulnerable: one write is treated as the whole message",
      "language": "c",
      "blurb": "The sender reports success after any positive write, even when the transport accepted only the first part of the application message.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

struct test_transport {
    uint8_t bytes[16];
    size_t length;
    size_t max_per_write;
};

static size_t transport_write(struct test_transport *transport,
                              const uint8_t *data, size_t length)
{
    size_t accepted = length;

    if (accepted > transport->max_per_write) {
        accepted = transport->max_per_write;
    }
    if (accepted > sizeof transport->bytes - transport->length) {
        accepted = sizeof transport->bytes - transport->length;
    }
    memmove(transport->bytes + transport->length, data, accepted);
    transport->length += accepted;
    return accepted;
}

static bool send_message(struct test_transport *transport,
                         const uint8_t *message, size_t message_length)
{
    size_t written;

    if (transport == NULL || message == NULL || message_length == 0u) {
        return false;
    }
    written = transport_write(transport, message, message_length);

    /* IMPORTANT DEFECT: a positive partial write is reported as success. */
    return written > 0u;
}

int main(void)
{
    const uint8_t message[] = { 'S', 'E', 'C', 'R', 'E', 'T' };
    struct test_transport transport = { { 0u }, 0u, 3u };

    /* TEST: success is returned although only half the message was sent. */
    assert(send_message(&transport, message, sizeof message));
    assert(transport.length == 3u);
    assert(memcmp(transport.bytes, "SEC", 3u) == 0);
    return 0;
}
`
    },
    {
      "title": "Safer: preserve progress across partial writes",
      "language": "c",
      "blurb": "The sender tracks the unsent offset, retries short writes, and fails if the transport stops making progress or lacks capacity.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

struct test_transport {
    uint8_t bytes[16];
    size_t length;
    size_t max_per_write;
};

static size_t transport_write(struct test_transport *transport,
                              const uint8_t *data, size_t length)
{
    size_t accepted = length;

    if (accepted > transport->max_per_write) {
        accepted = transport->max_per_write;
    }
    if (accepted > sizeof transport->bytes - transport->length) {
        accepted = sizeof transport->bytes - transport->length;
    }
    memmove(transport->bytes + transport->length, data, accepted);
    transport->length += accepted;
    return accepted;
}

static bool send_message(struct test_transport *transport,
                         const uint8_t *message, size_t message_length)
{
    size_t offset = 0u;

    if (transport == NULL || message == NULL || message_length == 0u) {
        return false;
    }

    while (offset < message_length) {
        const size_t written = transport_write(
            transport, message + offset, message_length - offset);

        /* IMPORTANT FIX: advance by the actual count and require progress. */
        if (written == 0u) {
            return false;
        }
        offset += written;
    }
    return true;
}

int main(void)
{
    const uint8_t message[] = { 'S', 'E', 'C', 'R', 'E', 'T' };
    struct test_transport short_writes = { { 0u }, 0u, 2u };
    struct test_transport no_progress = { { 0u }, 0u, 0u };
    struct test_transport too_small = { { 0u }, 14u, 4u };

    /* TEST: three partial writes produce one complete message. */
    assert(send_message(&short_writes, message, sizeof message));
    assert(short_writes.length == sizeof message);
    assert(memcmp(short_writes.bytes, message, sizeof message) == 0);

    assert(!send_message(&no_progress, message, sizeof message));
    assert(!send_message(&too_small, message, sizeof message));
    assert(!send_message(NULL, message, sizeof message));
    return 0;
}
`
    }
  ]
};
