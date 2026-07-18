window.COURSE_CODE_MODULE = {
  "title": "Defensive Parser Design and Failure Behavior: code example",
  "codeIntro": "The comparison shows why parsing into temporary state and committing once is safer than mutating caller-owned output in stages.",
  "codeExamples": [
    {
      "title": "Vulnerable: failure leaves a partial object",
      "language": "c",
      "blurb": "The parser updates and allocates caller-visible state before checking the version, so rejection still leaves cleanup obligations.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

struct message {
    uint8_t version;
    unsigned char *payload;
    size_t payload_length;
};

static bool parse_message(const uint8_t *data, size_t length,
                          struct message *out)
{
    if (data == NULL || out == NULL || length < 2u) {
        return false;
    }
    out->version = data[0];
    out->payload_length = data[1];
    if (out->payload_length > length - 2u) {
        return false;
    }
    out->payload = malloc(out->payload_length);
    if (out->payload == NULL) {
        return false;
    }
    memcpy(out->payload, data + 2u, out->payload_length);

    /* IMPORTANT DEFECT: validation occurs after caller state changed. */
    return out->version == 1u;
}

int main(void)
{
    const uint8_t unsupported[] = { 2u, 2u, 'O', 'K' };
    struct message result = { 0u, NULL, 0u };

    assert(!parse_message(unsupported, sizeof unsupported, &result));
    /* TEST: failure still exposed an allocation and partial fields. */
    assert(result.version == 2u && result.payload != NULL);
    free(result.payload);
    return 0;
}
`
    },
    {
      "title": "Safer: validate, build, then commit",
      "language": "c",
      "blurb": "The caller supplies an initialized message; temporary state is built privately, then safely replaces any previously owned payload.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

struct message {
    uint8_t version;
    unsigned char *payload;
    size_t payload_length;
};

static void message_destroy(struct message *message)
{
    if (message != NULL) {
        free(message->payload);
        *message = (struct message){ 0u, NULL, 0u };
    }
}

static bool parse_message(const uint8_t *data, size_t length,
                          struct message *out)
{
    struct message candidate = { 0u, NULL, 0u };

    /* API CONTRACT: out points to an initialized struct message. */
    if (data == NULL || out == NULL || length < 2u || data[0] != 1u ||
        (size_t)data[1] > length - 2u) {
        return false;
    }
    candidate.version = data[0];
    candidate.payload_length = data[1];
    if (candidate.payload_length > 0u) {
        candidate.payload = malloc(candidate.payload_length);
        if (candidate.payload == NULL) {
            return false;
        }
        memcpy(candidate.payload, data + 2u, candidate.payload_length);
    }

    /* IMPORTANT FIX: release old ownership only after candidate succeeds. */
    message_destroy(out);
    *out = candidate;
    return true;
}

int main(void)
{
    const uint8_t unsupported[] = { 2u, 2u, 'N', 'O' };
    const uint8_t first[] = { 1u, 2u, 'O', 'K' };
    const uint8_t second[] = { 1u, 3u, 'N', 'E', 'W' };
    struct message result = { 0u, NULL, 0u };

    assert(!parse_message(unsupported, sizeof unsupported, &result));
    assert(result.payload == NULL && result.payload_length == 0u);
    assert(parse_message(first, sizeof first, &result));
    assert(result.payload_length == 2u && result.payload[1] == 'K');
    /* TEST: a second success releases and replaces the first payload. */
    assert(parse_message(second, sizeof second, &result));
    assert(result.payload_length == 3u);
    assert(memcmp(result.payload, "NEW", 3u) == 0);
    message_destroy(&result);
    assert(result.payload == NULL && result.payload_length == 0u);
    return 0;
}
`
    }
  ]
};
