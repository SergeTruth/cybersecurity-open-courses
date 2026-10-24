window.COURSE_CODE_MODULE = {
  "title": "Error Handling and Fail-Safe Behavior: code example",
  "codeIntro": "Compare an in-place reload that leaves mixed state with a transactional reload that validates a candidate and commits once.",
  "codeExamples": [
    {
      "title": "Vulnerable: mutate active state while parsing",
      "language": "c",
      "blurb": "The timeout is applied before the later TLS value is validated, so failure leaves a partly updated runtime configuration.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <string.h>

struct runtime_config {
    unsigned int timeout_seconds;
    bool tls_required;
};

static bool reload_vulnerable(struct runtime_config *active,
                              unsigned int parsed_timeout,
                              const char *tls_text)
{
    if (active == NULL || tls_text == NULL ||
        parsed_timeout < 1u || parsed_timeout > 300u) {
        return false;
    }
    /* IMPORTANT DEFECT: active state changes before all fields are valid. */
    active->timeout_seconds = parsed_timeout;
    if (strcmp(tls_text, "true") == 0) {
        active->tls_required = true;
        return true;
    }
    if (strcmp(tls_text, "false") == 0) {
        active->tls_required = false;
        return true;
    }
    return false;
}

int main(void)
{
    struct runtime_config active = {30u, true};

    assert(!reload_vulnerable(&active, 120u, "maybe"));
    /* TEST: failure leaves a deterministic mixture of new and old settings. */
    assert(active.timeout_seconds == 120u);
    assert(active.tls_required);
    return 0;
}
`
    },
    {
      "title": "Safer: validate a candidate and commit once",
      "language": "c",
      "blurb": "All fields are parsed into temporary state; invalid reloads preserve the known-good configuration and successful reloads publish the complete candidate. This is a single-threaded example: struct assignment is not atomic, so concurrent readers and reloaders need a shared synchronization policy.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <string.h>

struct runtime_config {
    unsigned int timeout_seconds;
    bool tls_required;
};

static bool parse_tls(const char *text, bool *value)
{
    if (text == NULL || value == NULL) {
        return false;
    }
    if (strcmp(text, "true") == 0) {
        *value = true;
        return true;
    }
    if (strcmp(text, "false") == 0) {
        *value = false;
        return true;
    }
    return false;
}

static bool reload_config(struct runtime_config *active,
                          unsigned int parsed_timeout,
                          const char *tls_text)
{
    struct runtime_config candidate = {0u, false};

    if (active == NULL || parsed_timeout < 1u || parsed_timeout > 300u ||
        !parse_tls(tls_text, &candidate.tls_required)) {
        return false;
    }
    candidate.timeout_seconds = parsed_timeout;
    /* IMPORTANT FIX: one commit follows complete candidate validation. */
    *active = candidate;
    return true;
}

int main(void)
{
    struct runtime_config active = {30u, true};

    /* TEST: a rejected reload preserves the prior known-good configuration. */
    assert(!reload_config(&active, 120u, "maybe"));
    assert(active.timeout_seconds == 30u && active.tls_required);
    assert(!reload_config(&active, 0u, "false"));
    assert(active.timeout_seconds == 30u && active.tls_required);

    assert(reload_config(&active, 120u, "false"));
    assert(active.timeout_seconds == 120u && !active.tls_required);
    return 0;
}
`
    }
  ]
};
