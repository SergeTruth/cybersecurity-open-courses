window.COURSE_CODE_MODULE = {
  "title": "Dynamic String Libraries",
  "codeIntro": "Model the essential dynamic-string contract: owned storage, bounded growth, stable failure state, explicit transfer, and cleanup.",
  "codeExamples": [
    {
      "title": "Grow an owned string under a maximum-length policy",
      "language": "c",
      "blurb": "The object bounds growth, snapshots appended bytes before realloc so self-append is safe, preserves content on allocation failure, and transfers ownership explicitly. Only this API may mutate initialized metadata; callers supply a readable byte range and externally serialize access.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *data;
    size_t length;
    size_t capacity;
    size_t maximum_length;
} DynamicString;

static bool string_init(DynamicString *string, size_t maximum_length)
{
    /* Initialize a zeroed or previously transferred object, never a live owner. */
    if (string == NULL || string->data != NULL || maximum_length == SIZE_MAX) {
        return false;
    }
    string->data = malloc(1u);
    if (string->data == NULL) {
        return false;
    }
    string->data[0] = '\0';
    string->length = 0u;
    string->capacity = 1u;
    string->maximum_length = maximum_length;
    return true;
}

static bool string_append(DynamicString *string, const char *text,
                          size_t text_length)
{
    size_t required = 0u;
    size_t new_capacity = 0u;
    size_t capacity_limit = 0u;
    char *resized = NULL;
    char *snapshot = NULL;

    if (string == NULL || string->data == NULL || text == NULL) {
        return false;
    }
    if (text_length > string->maximum_length - string->length) {
        return false;
    }
    if (text_length == 0u) {
        return true;
    }
    /* Snapshot before any growth: text can point inside string->data.
       This teaching implementation uses up to text_length extra bytes. */
    snapshot = malloc(text_length);
    if (snapshot == NULL) {
        return false;
    }
    memcpy(snapshot, text, text_length);
    required = string->length + text_length + 1u;
    if (required > string->capacity) {
        capacity_limit = string->maximum_length + 1u;
        new_capacity = string->capacity;
        while (new_capacity < required) {
            new_capacity = new_capacity > capacity_limit / 2u
                               ? capacity_limit : new_capacity * 2u;
        }

        /* IMPORTANT FIX: preserve the owned pointer if realloc fails. */
        resized = realloc(string->data, new_capacity);
        if (resized == NULL) {
            free(snapshot);
            return false;
        }
        string->data = resized;
        string->capacity = new_capacity;
    }

    memcpy(string->data + string->length, snapshot, text_length);
    free(snapshot);
    string->length += text_length;
    string->data[string->length] = '\0';
    return true;
}

static char *string_take(DynamicString *string)
{
    char *owned = NULL;

    if (string == NULL) {
        return NULL;
    }
    owned = string->data;
    string->data = NULL;
    string->length = 0u;
    string->capacity = 0u;
    return owned;
}

int main(void)
{
    DynamicString builder = {0};
    char *owned = NULL;

    assert(string_init(&builder, 12u));
    assert(!string_init(&builder, 32u));
    assert(string_append(&builder, "alpha", 5u));
    assert(string_append(&builder, "-beta", 5u));
    assert(strcmp(builder.data, "alpha-beta") == 0);

    /* TEST: maximum-size rejection leaves the usable object unchanged. */
    assert(!string_append(&builder, "-toolong", 8u));
    assert(builder.length == 10u);
    assert(strcmp(builder.data, "alpha-beta") == 0);

    /* TEST: ownership transfer is visible and the caller frees exactly once. */
    owned = string_take(&builder);
    assert(owned != NULL && builder.data == NULL);
    assert(strcmp(owned, "alpha-beta") == 0);
    free(owned);

    /* TEST: self-append grows storage without retaining a freed source. */
    assert(string_init(&builder, 32u));
    assert(string_append(&builder, "abcd", 4u));
    assert(string_append(&builder, builder.data, builder.length));
    assert(strcmp(builder.data, "abcdabcd") == 0);
    assert(string_append(&builder, builder.data + 2, 2u));
    assert(strcmp(builder.data, "abcdabcdcd") == 0);
    assert(string_append(&builder, builder.data, 0u));
    free(string_take(&builder));
    return 0;
}
`
    }
  ]
};
