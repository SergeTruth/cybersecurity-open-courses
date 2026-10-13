window.COURSE_CODE_MODULE = {
  "title": "Aliasing, Shared References, and API Design",
  "codeIntro": "Avoid exporting interior pointers across mutation; use owner-mediated handles that can reject references invalidated by storage replacement.",
  "codeExamples": [
    {
      "title": "Reject stale handles after storage moves",
      "language": "c",
      "blurb": "A generation-tagged index remains non-owning and becomes detectably stale whenever the owner replaces its allocation.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int *items;
    size_t length;
    size_t capacity;
    size_t generation;
} int_vector;

typedef struct {
    size_t index;
    size_t generation;
} element_handle;

static bool vector_replace_storage(int_vector *vector, size_t new_capacity)
{
    int *replacement = NULL;

    if (vector == NULL || new_capacity == 0U ||
        new_capacity < vector->length || vector->generation == SIZE_MAX ||
        new_capacity > SIZE_MAX / sizeof vector->items[0]) {
        return false;
    }
    replacement = malloc(new_capacity * sizeof vector->items[0]);
    if (replacement == NULL) {
        return false;
    }
    if (vector->length != 0U) {
        (void)memcpy(replacement, vector->items,
                     vector->length * sizeof vector->items[0]);
    }
    free(vector->items);
    vector->items = replacement;
    vector->capacity = new_capacity;
    vector->generation += 1U;
    return true;
}

static bool vector_handle_at(const int_vector *vector, size_t index,
                             element_handle *handle)
{
    if (vector == NULL || handle == NULL || index >= vector->length) {
        return false;
    }
    handle->index = index;
    handle->generation = vector->generation;
    return true;
}

static bool vector_read(const int_vector *vector, element_handle handle,
                        int *value)
{
    /* IMPORTANT FIX: owner state decides whether a borrowed handle is live. */
    if (vector == NULL || value == NULL ||
        handle.generation != vector->generation ||
        handle.index >= vector->length) {
        return false;
    }
    *value = vector->items[handle.index];
    return true;
}

int main(void)
{
    int_vector vector = { NULL, 0U, 0U, 0U };
    element_handle old_handle = { 0U, 0U };
    element_handle current_handle = { 0U, 0U };
    int value = 0;

    assert(vector_replace_storage(&vector, 2U));
    vector.length = 2U;
    vector.items[0] = 11;
    vector.items[1] = 22;
    assert(vector_handle_at(&vector, 1U, &old_handle));
    assert(vector_read(&vector, old_handle, &value) && value == 22);

    /* TEST: replacing storage invalidates the old non-owning handle. */
    assert(vector_replace_storage(&vector, 4U));
    assert(!vector_read(&vector, old_handle, &value));

    /* TEST: a fresh handle reads through the current owner safely. */
    assert(vector_handle_at(&vector, 1U, &current_handle));
    assert(vector_read(&vector, current_handle, &value) && value == 22);

    free(vector.items);
    vector.items = NULL;
    vector.length = 0U;
    vector.capacity = 0U;
    puts("alias lifetime tests passed");
    return 0;
}
`
    }
  ]
};
