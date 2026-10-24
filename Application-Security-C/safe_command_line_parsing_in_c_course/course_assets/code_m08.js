window.COURSE_CODE_MODULE = {
  "title": "Safe Error Handling and Usage Messages",
  "codeIntro": "Return stable error categories, avoid echoing secret values, and make state changes only after complete validation.",
  "codeExamples": [
    {
      "title": "Fail closed without partial state or secret disclosure",
      "language": "c",
      "blurb": "The operation reports predictable categories rather than raw argument values, and its mutation counter proves every rejected request is side-effect free.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

typedef enum {
    RUN_OK,
    RUN_MISSING_OPTION,
    RUN_AMBIGUOUS_OPTION,
    RUN_INVALID_MODE,
    RUN_INVALID_SECRET
} RunStatus;

typedef struct {
    size_t mode_count;
    const char *mode;
    size_t token_count;
    const char *token;
} Request;

typedef struct {
    size_t completed_changes;
} RuntimeState;

static const char *status_message(RunStatus status)
{
    switch (status) {
    case RUN_OK:
        return "operation completed";
    case RUN_MISSING_OPTION:
        return "required option is missing";
    case RUN_AMBIGUOUS_OPTION:
        return "option was provided more than once";
    case RUN_INVALID_MODE:
        return "mode must be check or repair";
    case RUN_INVALID_SECRET:
        return "token does not meet the required format";
    default:
        return "invalid invocation";
    }
}

static RunStatus validate_then_run(const Request *request, RuntimeState *state)
{
    size_t token_length = 0u;

    if (request == NULL || state == NULL) {
        return RUN_MISSING_OPTION;
    }
    if (request->mode_count > 1u || request->token_count > 1u) {
        return RUN_AMBIGUOUS_OPTION;
    }
    if (request->mode_count != 1u || request->token_count != 1u ||
        request->mode == NULL || request->token == NULL) {
        return RUN_MISSING_OPTION;
    }
    if (strcmp(request->mode, "check") != 0 &&
        strcmp(request->mode, "repair") != 0) {
        return RUN_INVALID_MODE;
    }
    token_length = strlen(request->token);
    if (token_length < 8u || token_length > 32u) {
        return RUN_INVALID_SECRET;
    }

    /* IMPORTANT FIX: mutate state only after every validation has succeeded. */
    state->completed_changes++;
    return RUN_OK;
}

int main(void)
{
    RuntimeState state = {0u};
    const Request missing = {1u, "check", 0u, NULL};
    const Request duplicate = {2u, "repair", 1u, "abcd1234"};
    const Request bad_mode = {1u, "erase", 1u, "abcd1234"};
    const Request short_token = {1u, "check", 1u, "short"};
    const Request valid = {1u, "repair", 1u, "abcd1234"};

    /* TEST: every failure has a stable message and leaves state unchanged. */
    assert(validate_then_run(&missing, &state) == RUN_MISSING_OPTION);
    assert(validate_then_run(&duplicate, &state) == RUN_AMBIGUOUS_OPTION);
    assert(validate_then_run(&bad_mode, &state) == RUN_INVALID_MODE);
    assert(validate_then_run(&short_token, &state) == RUN_INVALID_SECRET);
    assert(state.completed_changes == 0u);
    assert(strstr(status_message(RUN_INVALID_SECRET), "abcd1234") == NULL);

    /* TEST: only a fully valid request performs the operation. */
    assert(validate_then_run(&valid, &state) == RUN_OK);
    assert(state.completed_changes == 1u);
    return 0;
}
`
    }
  ]
};
