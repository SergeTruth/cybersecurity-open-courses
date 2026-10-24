window.COURSE_CODE_MODULE = {
  "title": "Parsing Key-Value and Structured Data: code example",
  "codeIntro": "The document parser builds a typed intermediate object, rejects malformed or duplicate records, and never changes the caller's result until every line is understood.",
  "codeExamples": [
    {
      "title": "Parse all key-value records before returning structure",
      "language": "c",
      "blurb": "The format has exact delimiter, key, value, comment, and duplicate-key rules rather than accepting ambiguous partial syntax.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

struct parsed_config {
    bool mode_present;
    bool safe_mode;
    bool retries_present;
    unsigned int retries;
};

static bool parse_record(const char *line, struct parsed_config *config)
{
    if (line == NULL || config == NULL || strchr(line, '#') != NULL) {
        return false;
    }
    if (strcmp(line, "mode=safe") == 0) {
        if (config->mode_present) {
            return false;
        }
        config->mode_present = true;
        config->safe_mode = true;
        return true;
    }
    if (strncmp(line, "retries=", 8u) == 0 && line[8] >= '0' &&
        line[8] <= '3' && line[9] == '\0') {
        if (config->retries_present) {
            return false;
        }
        config->retries_present = true;
        config->retries = (unsigned int)(line[8] - '0');
        return true;
    }
    return false;
}

static bool parse_records(const char *const *lines, size_t line_count,
                          struct parsed_config *output)
{
    struct parsed_config candidate = {false, false, false, 0u};
    size_t index = 0u;

    if (lines == NULL || output == NULL) {
        return false;
    }
    for (index = 0u; index < line_count; index++) {
        if (!parse_record(lines[index], &candidate)) {
            return false;
        }
    }
    if (!candidate.mode_present || !candidate.retries_present) {
        return false;
    }
    /* IMPORTANT FIX: return structure only after the entire document parses. */
    *output = candidate;
    return true;
}

int main(void)
{
    const char *valid[] = {"retries=2", "mode=safe"};
    const char *duplicate[] = {"mode=safe", "mode=safe", "retries=1"};
    const char *ambiguous[] = {"mode=safe # maybe", "retries=1"};
    struct parsed_config result = {true, true, true, 3u};

    assert(parse_records(valid, 2u, &result));
    assert(result.safe_mode && result.retries == 2u);

    /* TEST: duplicates and unsupported comment syntax reject the whole document. */
    assert(!parse_records(duplicate, 3u, &result));
    assert(result.safe_mode && result.retries == 2u);
    assert(!parse_records(ambiguous, 2u, &result));
    assert(result.safe_mode && result.retries == 2u);
    return 0;
}
`
    }
  ]
};
