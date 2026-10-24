window.COURSE_CODE_MODULE = {
  "title": "Designing a Clear Option Contract",
  "codeIntro": "Finalize an explicit option contract before any command performs work.",
  "codeExamples": [
    {
      "title": "Validate defaults, duplicates, exclusions, and dependencies",
      "language": "c",
      "blurb": "A draft configuration becomes usable only after one function applies the documented default and rejects ambiguous cross-option states.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

typedef struct {
    size_t output_count;
    const char *output;
    bool dry_run;
    bool commit;
    bool format_set;
    const char *format;
} OptionDraft;

typedef struct {
    const char *output;
    const char *format;
    bool dry_run;
    bool commit;
} Config;

static bool finalize_options(const OptionDraft *draft, Config *out)
{
    if (draft == NULL || out == NULL) {
        return false;
    }

    /* IMPORTANT FIX: duplicate and mutually exclusive choices are rejected. */
    if (draft->output_count > 1u || (draft->dry_run && draft->commit)) {
        return false;
    }
    if (draft->output_count == 1u &&
        (draft->output == NULL || draft->output[0] == '\0')) {
        return false;
    }
    if (draft->format_set &&
        (draft->format == NULL ||
         (strcmp(draft->format, "text") != 0 &&
          strcmp(draft->format, "json") != 0))) {
        return false;
    }

    /* --format is meaningful only with an explicit --output. */
    if (draft->format_set && draft->output_count == 0u) {
        return false;
    }

    out->output = draft->output_count == 0u ? "report.txt" : draft->output;
    out->format = draft->format_set ? draft->format : "text";
    out->dry_run = draft->dry_run;
    out->commit = draft->commit;
    return true;
}

int main(void)
{
    Config config = {0};
    const OptionDraft defaults = {0u, NULL, false, false, false, NULL};
    const OptionDraft explicit_output =
        {1u, "result.json", false, true, true, "json"};
    const OptionDraft duplicate =
        {2u, "second.txt", false, false, false, NULL};
    const OptionDraft conflicting =
        {0u, NULL, true, true, false, NULL};
    const OptionDraft missing_dependency =
        {0u, NULL, false, false, true, "json"};

    /* TEST: the documented defaults and an explicit valid contract succeed. */
    assert(finalize_options(&defaults, &config));
    assert(strcmp(config.output, "report.txt") == 0);
    assert(strcmp(config.format, "text") == 0);
    assert(finalize_options(&explicit_output, &config));
    assert(strcmp(config.output, "result.json") == 0);

    /* TEST: duplicates, exclusions, and unmet dependencies fail closed. */
    assert(!finalize_options(&duplicate, &config));
    assert(!finalize_options(&conflicting, &config));
    assert(!finalize_options(&missing_dependency, &config));
    return 0;
}
`
    }
  ]
};
