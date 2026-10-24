window.COURSE_CODE_MODULE = {
  "title": "Connection Lifecycle Management: code example",
  "codeIntro": "A connection must be releasable after every setup step, including failures that occur before the connection reaches its ready state.",
  "codeExamples": [
    {
      "title": "Vulnerable: partial setup bypasses cleanup",
      "language": "c",
      "blurb": "Cleanup is gated on full initialization, so a descriptor and input buffer remain owned when output-buffer setup fails.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct connection {
    bool descriptor_open;
    bool input_owned;
    bool output_owned;
    bool ready;
};

static bool initialize_connection(struct connection *connection,
                                  bool fail_output_setup)
{
    if (connection == NULL) {
        return false;
    }
    connection->descriptor_open = true;
    connection->input_owned = true;
    if (fail_output_setup) {
        return false;
    }
    connection->output_owned = true;
    connection->ready = true;
    return true;
}

static void release_connection(struct connection *connection)
{
    /* IMPORTANT DEFECT: partially initialized state is considered unowned. */
    if (connection == NULL || !connection->ready) {
        return;
    }
    connection->output_owned = false;
    connection->input_owned = false;
    connection->descriptor_open = false;
    connection->ready = false;
}

int main(void)
{
    struct connection connection = { false, false, false, false };

    assert(!initialize_connection(&connection, true));
    release_connection(&connection);

    /* TEST: failure leaves acquired resources marked as owned. */
    assert(connection.descriptor_open);
    assert(connection.input_owned);
    assert(!connection.output_owned);
    return 0;
}
`
    },
    {
      "title": "Safer: cleanup follows individual ownership flags",
      "language": "c",
      "blurb": "Every acquired resource has explicit state, and one idempotent release function handles partial setup, normal completion, and repeated cleanup.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct connection {
    bool descriptor_open;
    bool input_owned;
    bool output_owned;
    bool ready;
};

static bool initialize_connection(struct connection *connection,
                                  bool fail_output_setup)
{
    if (connection == NULL) {
        return false;
    }
    connection->descriptor_open = true;
    connection->input_owned = true;
    if (fail_output_setup) {
        return false;
    }
    connection->output_owned = true;
    connection->ready = true;
    return true;
}

static void release_connection(struct connection *connection)
{
    if (connection == NULL) {
        return;
    }

    /* IMPORTANT FIX: release each resource according to its own ownership. */
    connection->output_owned = false;
    connection->input_owned = false;
    connection->descriptor_open = false;
    connection->ready = false;
}

static bool is_released(const struct connection *connection)
{
    return connection != NULL && !connection->descriptor_open &&
           !connection->input_owned && !connection->output_owned &&
           !connection->ready;
}

int main(void)
{
    struct connection partial = { false, false, false, false };
    struct connection complete = { false, false, false, false };

    assert(!initialize_connection(&partial, true));
    release_connection(&partial);
    /* TEST: partial setup and repeated cleanup are both safe. */
    assert(is_released(&partial));
    release_connection(&partial);
    assert(is_released(&partial));

    assert(initialize_connection(&complete, false));
    release_connection(&complete);
    assert(is_released(&complete));
    return 0;
}
`
    }
  ]
};
