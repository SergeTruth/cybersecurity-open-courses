window.COURSE_CODE_MODULE = {
  "title": "Configuration Design and Safer Alternatives",
  "codeIntro": "Use the environment for a small operational mode while obtaining structured limits and secrets from sources suited to those values.",
  "codeExamples": [
    {
      "title": "Separate configuration by sensitivity and structure",
      "language": "c",
      "blurb": "A validated mode may come from the environment, but worker limits come from structured configuration and credentials come from a secret provider.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

enum run_mode {
    RUN_NORMAL,
    RUN_DIAGNOSTIC
};

struct startup_inputs {
    const char *mode_from_environment;
    size_t workers_from_configuration;
    const unsigned char *token_from_secret_provider;
    size_t token_length;
};

struct application_config {
    enum run_mode mode;
    size_t workers;
    const unsigned char *borrowed_token;
    size_t token_length;
};

static bool load_application_config(const struct startup_inputs *inputs,
                                    struct application_config *out)
{
    enum run_mode mode;

    if (inputs == NULL || out == NULL) {
        return false;
    }
    if (inputs->mode_from_environment == NULL ||
        strcmp(inputs->mode_from_environment, "normal") == 0) {
        mode = RUN_NORMAL;
    } else if (strcmp(inputs->mode_from_environment, "diagnostic") == 0) {
        mode = RUN_DIAGNOSTIC;
    } else {
        return false;
    }
    if (inputs->workers_from_configuration < 1U ||
        inputs->workers_from_configuration > 64U ||
        inputs->token_from_secret_provider == NULL ||
        inputs->token_length < 16U || inputs->token_length > 64U) {
        return false;
    }

    /* IMPORTANT FIX: each setting arrives through its documented mechanism. */
    out->mode = mode;
    out->workers = inputs->workers_from_configuration;
    out->borrowed_token = inputs->token_from_secret_provider;
    out->token_length = inputs->token_length;
    return true;
}

int main(void)
{
    static const unsigned char credential[16] = {0x5a};
    struct startup_inputs inputs = {"normal", 4U, credential, sizeof credential};
    struct application_config config;

    assert(load_application_config(&inputs, &config));
    assert(config.mode == RUN_NORMAL && config.workers == 4U);
    assert(config.borrowed_token == credential);

    /* TEST: invalid environment modes and missing credentials fail closed. */
    inputs.mode_from_environment = "fast";
    assert(!load_application_config(&inputs, &config));
    inputs.mode_from_environment = "diagnostic";
    inputs.token_from_secret_provider = NULL;
    assert(!load_application_config(&inputs, &config));
    return 0;
}
`
    }
  ]
};
