window.COURSE_CODE_MODULE = {
  "title": "Defaults, Overrides, and Precedence: code example",
  "codeIntro": "Each layer is applied through one precedence rule, and the effective setting retains its source so operators can explain the final value.",
  "codeExamples": [
    {
      "title": "Merge layered settings with explicit provenance",
      "language": "c",
      "blurb": "A safe built-in default is followed by file, environment, and command-line layers; lower-priority late writes are rejected.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum config_source {
    SOURCE_DEFAULT,
    SOURCE_FILE,
    SOURCE_ENVIRONMENT,
    SOURCE_COMMAND_LINE
};

struct optional_bool {
    bool present;
    bool value;
};

struct effective_bool {
    bool value;
    enum config_source source;
};

static bool apply_layer(struct effective_bool *effective,
                        struct optional_bool layer,
                        enum config_source source)
{
    if (effective == NULL || source <= effective->source ||
        source > SOURCE_COMMAND_LINE) {
        return false;
    }
    if (!layer.present) {
        return true;
    }
    effective->value = layer.value;
    effective->source = source;
    return true;
}

static bool resolve_remote_access(struct optional_bool file,
                                  struct optional_bool environment,
                                  struct optional_bool command_line,
                                  struct effective_bool *output)
{
    struct effective_bool effective = {false, SOURCE_DEFAULT};

    if (output == NULL ||
        !apply_layer(&effective, file, SOURCE_FILE) ||
        !apply_layer(&effective, environment, SOURCE_ENVIRONMENT) ||
        !apply_layer(&effective, command_line, SOURCE_COMMAND_LINE)) {
        return false;
    }
    /* IMPORTANT FIX: one ordered merge produces the value and its provenance. */
    *output = effective;
    return true;
}

int main(void)
{
    const struct optional_bool absent = {false, false};
    const struct optional_bool enabled = {true, true};
    const struct optional_bool disabled = {true, false};
    struct effective_bool effective = {true, SOURCE_COMMAND_LINE};

    assert(resolve_remote_access(absent, absent, absent, &effective));
    assert(!effective.value && effective.source == SOURCE_DEFAULT);

    assert(resolve_remote_access(enabled, disabled, enabled, &effective));
    /* TEST: command-line wins, and the final source remains observable. */
    assert(effective.value && effective.source == SOURCE_COMMAND_LINE);

    effective = (struct effective_bool){true, SOURCE_ENVIRONMENT};
    assert(!apply_layer(&effective, enabled, SOURCE_FILE));
    assert(effective.value && effective.source == SOURCE_ENVIRONMENT);
    return 0;
}
`
    }
  ]
};
