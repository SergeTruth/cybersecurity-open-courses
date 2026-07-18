window.COURSE_CODE_MODULE = {
  "title": "Allocation Lifetimes and Valid States",
  "codeIntro": "Track construction state so cleanup releases only initialized members and later operations reject dead objects.",
  "codeExamples": [
    {
      "title": "State-aware partial construction",
      "language": "c",
      "blurb": "A document moves through explicit states; its destroy routine safely handles both partial and complete initialization.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

enum document_state {
    DOCUMENT_EMPTY,
    DOCUMENT_HEADER_READY,
    DOCUMENT_COMPLETE,
    DOCUMENT_DESTROYED
};

struct document {
    unsigned char *header;
    unsigned char *body;
    size_t body_len;
    enum document_state state;
};

static void document_init(struct document *doc)
{
    doc->header = NULL;
    doc->body = NULL;
    doc->body_len = 0U;
    doc->state = DOCUMENT_EMPTY;
}

static bool document_add_header(struct document *doc)
{
    static const unsigned char magic[4] = {'D', 'O', 'C', '1'};

    if (doc == NULL || doc->state != DOCUMENT_EMPTY) {
        return false;
    }
    doc->header = malloc(sizeof magic);
    if (doc->header == NULL) {
        return false;
    }
    memcpy(doc->header, magic, sizeof magic);
    doc->state = DOCUMENT_HEADER_READY;
    return true;
}

static bool document_add_body(struct document *doc, size_t body_len)
{
    if (doc == NULL || doc->state != DOCUMENT_HEADER_READY || body_len == 0U) {
        return false;
    }
    doc->body = malloc(body_len);
    if (doc->body == NULL) {
        return false;
    }
    memset(doc->body, 0x2a, body_len);
    doc->body_len = body_len;
    doc->state = DOCUMENT_COMPLETE;
    return true;
}

static bool document_destroy(struct document *doc)
{
    if (doc == NULL || doc->state == DOCUMENT_DESTROYED) {
        return false;
    }
    /* IMPORTANT FIX: NULL fields identify members that were never acquired. */
    free(doc->body);
    free(doc->header);
    doc->body = NULL;
    doc->header = NULL;
    doc->body_len = 0U;
    doc->state = DOCUMENT_DESTROYED;
    return true;
}

int main(void)
{
    struct document partial;
    struct document complete;

    document_init(&partial);
    assert(!document_add_body(&partial, 8U));
    assert(document_add_header(&partial));
    /* TEST: cleanup accepts a header-only, partially initialized object. */
    assert(document_destroy(&partial));
    assert(!document_destroy(&partial));

    document_init(&complete);
    assert(document_add_header(&complete));
    assert(document_add_body(&complete, 8U));
    assert(complete.state == DOCUMENT_COMPLETE);
    assert(document_destroy(&complete));
    return 0;
}
`
    }
  ]
};
