window.COURSE_CODE_MODULE = {
  "title": "Cleanup Paths and Error Handling: code example",
  "codeIntro": "A single cleanup section can safely unwind any partially completed acquisition in reverse order.",
  "codeExamples": [
    {
      "title": "Unwind partial initialization through one cleanup path",
      "language": "c",
      "blurb": "Failure injection exercises every acquisition boundary and confirms that cleanup releases exactly the resources that became live. The caller zero-initializes the connection; repeated open is rejected without losing live resources.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>

struct connection {
    unsigned char *receive_buffer;
    unsigned char *send_buffer;
    bool callback_registered;
};

static size_t live_allocations = 0u;

static void *tracked_alloc(size_t size)
{
    void *memory = malloc(size);
    if (memory != NULL) {
        live_allocations++;
    }
    return memory;
}

static void tracked_free(void *memory)
{
    if (memory != NULL) {
        assert(live_allocations > 0u);
        live_allocations--;
        free(memory);
    }
}

static bool connection_open(struct connection *connection, size_t fail_step)
{
    bool ok = false;

    /* Caller starts with {NULL, NULL, false}; never discard live ownership. */
    if (connection == NULL || connection->receive_buffer != NULL ||
        connection->send_buffer != NULL || connection->callback_registered) {
        return false;
    }

    if (fail_step == 1u) {
        goto cleanup;
    }
    connection->receive_buffer = tracked_alloc(32u);
    if (connection->receive_buffer == NULL) {
        goto cleanup;
    }

    if (fail_step == 2u) {
        goto cleanup;
    }
    connection->send_buffer = tracked_alloc(64u);
    if (connection->send_buffer == NULL) {
        goto cleanup;
    }

    if (fail_step == 3u) {
        goto cleanup;
    }
    connection->callback_registered = true;
    ok = true;

cleanup:
    if (!ok) {
        /* IMPORTANT FIX: unwind in reverse acquisition order in one place. */
        connection->callback_registered = false;
        tracked_free(connection->send_buffer);
        connection->send_buffer = NULL;
        tracked_free(connection->receive_buffer);
        connection->receive_buffer = NULL;
    }
    return ok;
}

static void connection_close(struct connection *connection)
{
    if (connection == NULL) {
        return;
    }
    connection->callback_registered = false;
    tracked_free(connection->send_buffer);
    connection->send_buffer = NULL;
    tracked_free(connection->receive_buffer);
    connection->receive_buffer = NULL;
}

int main(void)
{
    struct connection connection = {NULL, NULL, false};
    size_t step = 0u;

    for (step = 1u; step <= 3u; step++) {
        /* TEST: every partial-initialization failure returns an empty state. */
        assert(!connection_open(&connection, step));
        assert(connection.receive_buffer == NULL);
        assert(connection.send_buffer == NULL);
        assert(!connection.callback_registered);
        assert(live_allocations == 0u);
    }

    assert(connection_open(&connection, 0u));
    assert(connection.callback_registered);
    assert(live_allocations == 2u);
    assert(!connection_open(&connection, 0u));
    assert(live_allocations == 2u);
    connection_close(&connection);
    assert(live_allocations == 0u);
    return 0;
}
`
    }
  ]
};
