window.COURSE_CODE_MODULE = {
  "title": "Parsing Flags, Options, and Positionals",
  "codeIntro": "Recognize the complete invocation into a configuration without performing side effects.",
  "codeExamples": [
    {
      "title": "Collect flags, an option value, and one positional",
      "language": "c",
      "blurb": "The parser rejects unknown or repeated options, detects missing values, and deliberately supports -- before a positional beginning with a dash.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

typedef struct {
    bool verbose;
    const char *output;
    const char *input;
} Config;

static bool parse_arguments(size_t argc, const char *const argv[], Config *out)
{
    Config parsed = {false, NULL, NULL};
    bool options_ended = false;
    size_t i = 1u;

    if (argc == 0u || argv == NULL || out == NULL) {
        return false;
    }

    while (i < argc) {
        const char *arg = argv[i];
        if (arg == NULL) {
            return false;
        }
        if (!options_ended && strcmp(arg, "--") == 0) {
            options_ended = true;
        } else if (!options_ended && strcmp(arg, "--verbose") == 0) {
            if (parsed.verbose) {
                return false;
            }
            parsed.verbose = true;
        } else if (!options_ended && strcmp(arg, "--output") == 0) {
            /* IMPORTANT FIX: require a non-option value and reject duplicates. */
            if (parsed.output != NULL || i + 1u >= argc ||
                argv[i + 1u] == NULL || argv[i + 1u][0] == '\0' ||
                argv[i + 1u][0] == '-') {
                return false;
            }
            i++;
            parsed.output = argv[i];
        } else if (!options_ended && arg[0] == '-') {
            return false;
        } else {
            if (parsed.input != NULL || arg[0] == '\0') {
                return false;
            }
            parsed.input = arg;
        }
        i++;
    }

    if (parsed.input == NULL) {
        return false;
    }
    *out = parsed;
    return true;
}

int main(void)
{
    Config config = {0};
    const char *const valid[] =
        {"tool", "--verbose", "--output", "out.bin", "input.bin"};
    const char *const marked[] = {"tool", "--", "-snapshot"};
    const char *const missing[] = {"tool", "--output", "--verbose", "in"};
    const char *const unknown[] = {"tool", "--quiet", "in"};
    const char *const duplicate[] =
        {"tool", "--output", "a", "--output", "b", "in"};
    const char *const extra[] = {"tool", "one", "two"};

    /* TEST: normal input and the end-of-options marker are accepted. */
    assert(parse_arguments(5u, valid, &config));
    assert(config.verbose && strcmp(config.output, "out.bin") == 0);
    assert(strcmp(config.input, "input.bin") == 0);
    assert(parse_arguments(3u, marked, &config));
    assert(strcmp(config.input, "-snapshot") == 0);

    /* TEST: malformed, ambiguous, and unknown invocations are rejected. */
    assert(!parse_arguments(4u, missing, &config));
    assert(!parse_arguments(3u, unknown, &config));
    assert(!parse_arguments(6u, duplicate, &config));
    assert(!parse_arguments(3u, extra, &config));
    return 0;
}
`
    }
  ]
};
