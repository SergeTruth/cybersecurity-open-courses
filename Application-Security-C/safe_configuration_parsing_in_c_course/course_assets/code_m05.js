window.COURSE_CODE_MODULE = {
  "title": "Type, Range, and Format Validation: code example",
  "codeIntro": "Validation must consider allowed enum values, numeric ranges, list contents, duplicates, and the combined runtime resource budget.",
  "codeExamples": [
    {
      "title": "Validate a typed configuration in context",
      "language": "c",
      "blurb": "Individually plausible fields are rejected when their combined memory use is excessive or their identifier list violates the schema.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

#define MAX_WORKERS 16u
#define MAX_NAMES 3u
#define MAX_TOTAL_CACHE 1048576u

enum service_mode {
    MODE_BATCH,
    MODE_INTERACTIVE
};

struct candidate_config {
    enum service_mode mode;
    size_t workers;
    size_t cache_per_worker;
    const char *names[MAX_NAMES];
    size_t name_count;
};

static bool name_valid(const char *name)
{
    size_t index = 0u;

    if (name == NULL || name[0] == '\0') {
        return false;
    }
    for (index = 0u; name[index] != '\0'; index++) {
        if (index >= 15u || !((name[index] >= 'a' && name[index] <= 'z') ||
                              (name[index] >= '0' && name[index] <= '9') ||
                              name[index] == '-')) {
            return false;
        }
    }
    return true;
}

static bool validate_config(const struct candidate_config *config)
{
    size_t left = 0u;
    size_t right = 0u;

    if (config == NULL ||
        (config->mode != MODE_BATCH && config->mode != MODE_INTERACTIVE) ||
        config->workers == 0u || config->workers > MAX_WORKERS ||
        config->name_count == 0u || config->name_count > MAX_NAMES ||
        config->cache_per_worker > MAX_TOTAL_CACHE / config->workers) {
        return false;
    }
    for (left = 0u; left < config->name_count; left++) {
        if (!name_valid(config->names[left])) {
            return false;
        }
    }
    /* Validate every pointer before the duplicate pass can dereference it. */
    for (left = 0u; left < config->name_count; left++) {
        for (right = left + 1u; right < config->name_count; right++) {
            if (strcmp(config->names[left], config->names[right]) == 0) {
                return false;
            }
        }
    }
    /* IMPORTANT FIX: validate both each field and the combined runtime budget. */
    return true;
}

int main(void)
{
    struct candidate_config valid = {
        MODE_BATCH, 4u, 65536u, {"alpha", "beta-2", NULL}, 2u
    };
    struct candidate_config duplicate = valid;
    struct candidate_config excessive = valid;
    struct candidate_config unknown = valid;

    assert(validate_config(&valid));
    duplicate.names[1] = "alpha";
    excessive.cache_per_worker = 300000u;
    unknown.mode = (enum service_mode)99;

    /* TEST: invalid lists, contextual budgets, and unknown enums are rejected. */
    assert(!validate_config(&duplicate));
    assert(!validate_config(&excessive));
    assert(!validate_config(&unknown));
    valid.names[1] = NULL;
    assert(!validate_config(&valid));
    valid.names[1] = "";
    assert(!validate_config(&valid));
    return 0;
}
`
    }
  ]
};
