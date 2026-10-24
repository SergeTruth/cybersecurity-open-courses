window.COURSE_CODE_MODULE = {
  "title": "APIs That Make Lifetime Rules Clear: code example",
  "codeIntro": "A borrowed view records the owner's generation, so the API can reject use after internal storage cleanup while the document control object itself remains alive.",
  "codeExamples": [
    {
      "title": "Make a borrowed view's validity checkable",
      "language": "c",
      "blurb": "The document owns its bytes and must outlive every view. A generation check does not make view.owner safe after the document control object itself has been freed.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

struct document {
    unsigned char *bytes;
    size_t length;
    size_t generation;
    bool active;
};

struct document_view {
    /* CONTRACT: owner points to stable control storage that outlives the view. */
    const struct document *owner;
    const unsigned char *bytes;
    size_t length;
    size_t generation;
};

static bool document_init(struct document *document,
                          const unsigned char *source, size_t length)
{
    if (document == NULL || source == NULL || length == 0u ||
        document->active || document->bytes != NULL ||
        document->generation == SIZE_MAX) {
        return false;
    }
    document->bytes = malloc(length);
    if (document->bytes == NULL) {
        return false;
    }
    memcpy(document->bytes, source, length);
    document->length = length;
    document->active = true;
    return true;
}

static bool document_borrow(const struct document *document,
                            struct document_view *view)
{
    if (document == NULL || view == NULL || !document->active) {
        return false;
    }
    view->owner = document;
    view->bytes = document->bytes;
    view->length = document->length;
    view->generation = document->generation;
    return true;
}

static bool document_view_read(struct document_view view, size_t index,
                               unsigned char *value)
{
    if (view.owner == NULL || value == NULL || !view.owner->active ||
        view.generation != view.owner->generation || index >= view.length) {
        return false;
    }
    *value = view.bytes[index];
    return true;
}

static void document_cleanup(struct document *document)
{
    if (document == NULL || !document->active) {
        return;
    }
    free(document->bytes);
    document->bytes = NULL;
    document->length = 0u;
    document->active = false;
    /* IMPORTANT FIX: invalidate every previously issued borrowed view. */
    document->generation++;
}

int main(void)
{
    const unsigned char source[] = {'s', 'a', 'f', 'e'};
    struct document document = {NULL, 0u, 0u, false};
    struct document_view view = {NULL, NULL, 0u, 0u};
    struct document_view current_view = {NULL, NULL, 0u, 0u};
    unsigned char value = 0u;

    assert(document_init(&document, source, sizeof source));
    assert(document_borrow(&document, &view));
    assert(document_view_read(view, 2u, &value));
    assert(value == (unsigned char)'f');
    assert(!document_view_read(view, sizeof source, &value));

    document_cleanup(&document);
    /* TEST: storage cleanup is detected while the stack control object lives.
       A handle that can outlive that object needs a stable registry or ID. */
    assert(!document_view_read(view, 0u, &value));
    assert(!document_borrow(&document, &view));

    assert(document_init(&document, source, sizeof source));
    assert(document_borrow(&document, &current_view));
    assert(!document_view_read(view, 0u, &value));
    assert(document_view_read(current_view, 0u, &value));
    document_cleanup(&document);
    return 0;
}
`
    }
  ]
};
