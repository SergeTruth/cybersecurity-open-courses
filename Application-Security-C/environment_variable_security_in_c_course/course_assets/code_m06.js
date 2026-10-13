window.COURSE_CODE_MODULE = {
  "title": "Secrets and Sensitive Configuration",
  "codeIntro": "Report only safe metadata about sensitive configuration; never place the environment value itself in diagnostics.",
  "codeExamples": [
    {
      "title": "Redacted secret-status logging",
      "language": "c",
      "blurb": "The formatter distinguishes missing, invalid, and present state using fixed messages that cannot expose the token.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool format_token_status(const char *token_env,
                                char *out, size_t out_size)
{
    const char *message;
    int written;

    if (out == NULL || out_size == 0U) {
        return false;
    }
    if (token_env == NULL) {
        message = "API token: missing";
    } else if (token_env[0] == '\\0') {
        message = "API token: invalid";
    } else {
        /* IMPORTANT FIX: diagnostics record state, never the secret value. */
        message = "API token: present";
    }
    written = snprintf(out, out_size, "%s", message);
    return written >= 0 && (size_t)written < out_size;
}

int main(void)
{
    static const char secret[] = "s3cr3t-value";
    char status[32];

    assert(format_token_status(secret, status, sizeof status));
    assert(strcmp(status, "API token: present") == 0);
    /* TEST: the diagnostic output contains no part of the secret. */
    assert(strstr(status, secret) == NULL);

    assert(format_token_status(NULL, status, sizeof status));
    assert(strcmp(status, "API token: missing") == 0);
    assert(format_token_status("", status, sizeof status));
    assert(strcmp(status, "API token: invalid") == 0);
    assert(!format_token_status(secret, status, 4U));
    return 0;
}
`
    }
  ]
};
