window.COURSE_CODE_MODULE = {
  "title": "Loading Configuration Safely: code example",
  "codeIntro": "The loader reads into temporary bounded storage, rejects oversized or binary input, and publishes configuration text only after a complete successful read.",
  "codeExamples": [
    {
      "title": "Load bounded text without publishing partial state",
      "language": "c",
      "blurb": "A fixed maximum bounds memory and parse time, while temporary storage keeps the prior configuration unchanged on every rejection path.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

#define MAX_CONFIG_BYTES 24u

struct config_text {
    char bytes[MAX_CONFIG_BYTES + 1u];
    size_t length;
};

static bool text_byte_allowed(unsigned char byte)
{
    return byte == (unsigned char)'\n' || byte == (unsigned char)'\r' ||
           byte == (unsigned char)'\t' ||
           (byte >= 0x20u && byte <= 0x7eu);
}

static bool load_config(FILE *stream, struct config_text *output)
{
    unsigned char scratch[MAX_CONFIG_BYTES + 1u] = {0u};
    size_t count = 0u;
    size_t index = 0u;

    if (stream == NULL || output == NULL) {
        return false;
    }
    count = fread(scratch, 1u, sizeof scratch, stream);
    if (ferror(stream) || count > MAX_CONFIG_BYTES) {
        return false;
    }
    for (index = 0u; index < count; index++) {
        if (!text_byte_allowed(scratch[index])) {
            return false;
        }
    }

    /* IMPORTANT FIX: publish only after the whole bounded input is accepted. */
    memcpy(output->bytes, scratch, count);
    output->bytes[count] = '\0';
    output->length = count;
    return true;
}

static FILE *open_test_stream(const unsigned char *bytes, size_t length)
{
    FILE *stream = tmpfile();

    if (stream == NULL) {
        return NULL;
    }
    if (length != 0u && fwrite(bytes, 1u, length, stream) != length) {
        (void)fclose(stream);
        return NULL;
    }
    if (fflush(stream) != 0 || fseek(stream, 0l, SEEK_SET) != 0) {
        (void)fclose(stream);
        return NULL;
    }
    return stream;
}

int main(void)
{
    const unsigned char valid[] = "mode=safe\n";
    const unsigned char binary[] = {'m', 'o', 'd', 'e', '=', 0u, 'x'};
    unsigned char oversized[MAX_CONFIG_BYTES + 1u];
    struct config_text active = {"known-good", 10u};
    FILE *stream = NULL;

    memset(oversized, (int)'x', sizeof oversized);
    stream = open_test_stream(valid, sizeof valid - 1u);
    assert(stream != NULL && load_config(stream, &active));
    assert(fclose(stream) == 0);
    assert(strcmp(active.bytes, "mode=safe\n") == 0);

    stream = open_test_stream(binary, sizeof binary);
    assert(stream != NULL && !load_config(stream, &active));
    assert(fclose(stream) == 0);
    /* TEST: rejected binary input leaves the prior known-good text unchanged. */
    assert(strcmp(active.bytes, "mode=safe\n") == 0);

    stream = open_test_stream(oversized, sizeof oversized);
    assert(stream != NULL && !load_config(stream, &active));
    assert(fclose(stream) == 0);
    assert(strcmp(active.bytes, "mode=safe\n") == 0);
    return 0;
}
`
    }
  ]
};
