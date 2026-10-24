window.COURSE_CODE_MODULE = {
  "title": "Protocol Framing and Input Boundaries: code example",
  "codeIntro": "TCP read boundaries are not message boundaries. These applications compare per-read parsing with a bounded delimiter state machine that survives split input.",
  "codeExamples": [
    {
      "title": "Vulnerable: one read is accepted as one command",
      "language": "c",
      "blurb": "The handler copies and dispatches whatever arrived in one read, even when the protocol's newline delimiter has not arrived.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_COMMAND 8u

static bool receive_command(const uint8_t *chunk, size_t chunk_length,
                            char output[MAX_COMMAND + 1u])
{
    if (chunk == NULL || output == NULL ||
        chunk_length == 0u || chunk_length > MAX_COMMAND) {
        return false;
    }

    /* IMPORTANT DEFECT: the end of a read is treated as the end of a frame. */
    memcpy(output, chunk, chunk_length);
    output[chunk_length] = (char)0;
    return true;
}

int main(void)
{
    const uint8_t partial[] = { 'S', 'E', 'T', ' ', 'k', 'e', 'y' };
    char command[MAX_COMMAND + 1u] = { 0 };

    /* TEST: a command with no protocol delimiter is dispatched as complete. */
    assert(receive_command(partial, sizeof partial, command));
    assert(strcmp(command, "SET key") == 0);
    assert(command[sizeof partial - 1u] != (char)10);
    return 0;
}
`
    },
    {
      "title": "Safer: retain bounded framing state across reads",
      "language": "c",
      "blurb": "A byte-at-a-time state machine emits a command only at the documented newline delimiter, requires explicit frame consumption, and discards an overlong frame through its next delimiter.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define MAX_COMMAND 8u

enum feed_result {
    FEED_INCOMPLETE,
    FEED_FRAME_READY,
    FEED_REJECTED
};

struct line_reader {
    char bytes[MAX_COMMAND + 1u];
    size_t used;
    bool frame_ready;
    bool discarding;
};

static enum feed_result feed_byte(struct line_reader *reader, uint8_t byte)
{
    if (reader == NULL) {
        return FEED_REJECTED;
    }
    if (reader->frame_ready) {
        return FEED_REJECTED;
    }
    if (reader->discarding) {
        if (byte == 10u) {
            reader->discarding = false;
        }
        return FEED_REJECTED;
    }
    if (byte == 10u) {
        if (reader->used == 0u) {
            return FEED_REJECTED;
        }
        reader->bytes[reader->used] = (char)0;
        reader->frame_ready = true;
        return FEED_FRAME_READY;
    }
    if (reader->used >= MAX_COMMAND) {
        reader->used = 0u;
        reader->discarding = true;
        return FEED_REJECTED;
    }

    /* IMPORTANT FIX: preserve only bounded frame state between reads. */
    reader->bytes[reader->used] = (char)byte;
    reader->used += 1u;
    return FEED_INCOMPLETE;
}

static bool consume_frame(struct line_reader *reader,
                          char output[MAX_COMMAND + 1u])
{
    if (reader == NULL || output == NULL || !reader->frame_ready) {
        return false;
    }
    memcpy(output, reader->bytes, reader->used + 1u);
    reader->used = 0u;
    reader->frame_ready = false;
    return true;
}

int main(void)
{
    const uint8_t first_read[] = { 'G', 'E', 'T', ' ' };
    const uint8_t second_read[] = { 'k', 'e', 'y', 10u };
    const uint8_t next_frame[] = { 'P', 'I', 'N', 'G', 10u };
    const uint8_t overlong[] = {
        '1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', 'y', 10u
    };
    const uint8_t recovered[] = { 'O', 'K', 10u };
    struct line_reader reader = { { 0 }, 0u, false, false };
    char command[MAX_COMMAND + 1u] = {0};
    size_t index;

    for (index = 0u; index < sizeof first_read; ++index) {
        assert(feed_byte(&reader, first_read[index]) == FEED_INCOMPLETE);
    }
    /* TEST: a partial read does not produce a command. */
    assert(reader.used == sizeof first_read);

    for (index = 0u; index + 1u < sizeof second_read; ++index) {
        assert(feed_byte(&reader, second_read[index]) == FEED_INCOMPLETE);
    }
    assert(feed_byte(&reader, second_read[3]) == FEED_FRAME_READY);
    assert(consume_frame(&reader, command));
    assert(strcmp(command, "GET key") == 0);

    for (index = 0u; index + 1u < sizeof next_frame; ++index) {
        assert(feed_byte(&reader, next_frame[index]) == FEED_INCOMPLETE);
    }
    assert(feed_byte(&reader, next_frame[4]) == FEED_FRAME_READY);
    assert(consume_frame(&reader, command));
    assert(strcmp(command, "PING") == 0);

    for (index = 0u; index + 1u < sizeof overlong; ++index) {
        enum feed_result result = feed_byte(&reader, overlong[index]);

        if (index < MAX_COMMAND) {
            assert(result == FEED_INCOMPLETE);
        } else {
            assert(result == FEED_REJECTED);
        }
    }
    /* TEST: the first byte beyond the maximum is rejected. */
    assert(feed_byte(&reader, overlong[sizeof overlong - 1u]) ==
           FEED_REJECTED);
    assert(reader.used == 0u);
    assert(!reader.discarding);
    for (index = 0u; index + 1u < sizeof recovered; ++index) {
        assert(feed_byte(&reader, recovered[index]) == FEED_INCOMPLETE);
    }
    assert(feed_byte(&reader, recovered[2]) == FEED_FRAME_READY);
    assert(consume_frame(&reader, command));
    assert(strcmp(command, "OK") == 0);
    return 0;
}
`
    }
  ]
};
