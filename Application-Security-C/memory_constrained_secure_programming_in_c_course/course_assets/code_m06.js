window.COURSE_CODE_MODULE = {
  "title": "Streaming, Chunking, and Bounded Parsing",
  "codeIntro": "Retain only a small explicit parser state while accepting partial chunks, enforcing the frame maximum, and resetting after malformed input.",
  "codeExamples": [
    {
      "title": "Parse a length-prefixed frame incrementally",
      "language": "c",
      "blurb": "The state machine accepts a header and body across separate chunks without accumulating more than six payload bytes.",
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

#define MAX_PAYLOAD 6U

typedef enum {
    FEED_NEED_MORE,
    FEED_FRAME_READY,
    FEED_REJECTED
} feed_result;

typedef enum {
    WAIT_LENGTH,
    READ_BODY,
    FRAME_READY
} parser_phase;

typedef struct {
    parser_phase phase;
    uint8_t payload[MAX_PAYLOAD];
    size_t expected;
    size_t used;
} frame_parser;

static void parser_reset(frame_parser *parser)
{
    if (parser != NULL) {
        (void)memset(parser, 0, sizeof *parser);
        parser->phase = WAIT_LENGTH;
    }
}

static feed_result parser_feed(frame_parser *parser,
                               const uint8_t *chunk, size_t chunk_length)
{
    size_t i = 0U;

    if (parser == NULL || chunk == NULL || chunk_length == 0U ||
        parser->phase == FRAME_READY) {
        return FEED_REJECTED;
    }
    for (i = 0U; i < chunk_length; ++i) {
        if (parser->phase == WAIT_LENGTH) {
            parser->expected = (size_t)chunk[i];
            if (parser->expected == 0U || parser->expected > MAX_PAYLOAD) {
                parser_reset(parser);
                return FEED_REJECTED;
            }
            parser->phase = READ_BODY;
            continue;
        }
        if (parser->used >= parser->expected) {
            parser_reset(parser);
            return FEED_REJECTED;
        }
        parser->payload[parser->used] = chunk[i];
        parser->used += 1U;
        if (parser->used == parser->expected) {
            /* IMPORTANT FIX: reject trailing bytes in the completing chunk. */
            if (i + 1U != chunk_length) {
                parser_reset(parser);
                return FEED_REJECTED;
            }
            parser->phase = FRAME_READY;
            return FEED_FRAME_READY;
        }
    }
    return FEED_NEED_MORE;
}

static bool parser_take(frame_parser *parser, uint8_t *output,
                        size_t capacity, size_t *output_length)
{
    if (parser == NULL || output == NULL || output_length == NULL ||
        parser->phase != FRAME_READY || parser->expected > capacity) {
        return false;
    }
    (void)memcpy(output, parser->payload, parser->expected);
    *output_length = parser->expected;
    parser_reset(parser);
    return true;
}

int main(void)
{
    static const uint8_t first_chunk[] = { 4U, 'p' };
    static const uint8_t second_chunk[] = { 'i', 'n', 'g' };
    static const uint8_t oversized[] = { 7U };
    static const uint8_t trailing[] = { 1U, 'x', 'y' };
    frame_parser parser = { WAIT_LENGTH, { 0U }, 0U, 0U };
    uint8_t output[MAX_PAYLOAD] = { 0U };
    size_t output_length = 0U;

    /* TEST: a frame completes across inconvenient chunk boundaries. */
    CHECK(parser_feed(&parser, first_chunk, sizeof first_chunk) ==
           FEED_NEED_MORE);
    CHECK(parser_feed(&parser, second_chunk, sizeof second_chunk) ==
           FEED_FRAME_READY);
    CHECK(parser_take(&parser, output, sizeof output, &output_length));
    CHECK(output_length == 4U && memcmp(output, "ping", 4U) == 0);

    /* TEST: oversized and trailing input reject and reset parser state. */
    CHECK(parser_feed(&parser, oversized, sizeof oversized) == FEED_REJECTED);
    CHECK(parser.phase == WAIT_LENGTH && parser.used == 0U);
    CHECK(parser_feed(&parser, trailing, sizeof trailing) == FEED_REJECTED);
    CHECK(parser.phase == WAIT_LENGTH);

    puts("bounded streaming parser tests passed");
    return 0;
}
`
    }
  ]
};
