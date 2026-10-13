window.COURSE_CODE_MODULE={"title":"Cleanup Paths and Error Handling","codeIntro":"Initialize every owner to NULL and route partial failure through one reverse-order cleanup path.","codeExamples":[{"title":"Clean partial setup from one exit","language":"c","blurb":"A forced second-stage failure proves that acquired memory is released and output remains NULL.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct { void *header; void *body; } document;

static void document_destroy(document **owner)
{
    if (owner != NULL && *owner != NULL) {
        free((*owner)->body); free((*owner)->header); free(*owner); *owner = NULL;
    }
}

static bool document_create(bool fail_body, document **output)
{
    document *item = NULL;
    bool ok = false;
    if (output == NULL || *output != NULL) return false;
    item = calloc(1U, sizeof *item);
    if (item == NULL) goto done;
    item->header = malloc(8U);
    if (item->header == NULL) goto done;
    if (fail_body) goto done;
    item->body = malloc(16U);
    if (item->body == NULL) goto done;
    *output = item; item = NULL; ok = true;
done:
    /* IMPORTANT FIX: cleanup accepts every documented partial state. */
    document_destroy(&item);
    return ok;
}

int main(void)
{
    document *item = NULL;
    /* TEST: partial failure returns no half-owned output. */
    assert(!document_create(true, &item) && item == NULL);
    assert(document_create(false, &item) && item != NULL);
    document_destroy(&item);
    assert(item == NULL);
    puts("partial cleanup tests passed");
    return 0;
}
`} ]};
