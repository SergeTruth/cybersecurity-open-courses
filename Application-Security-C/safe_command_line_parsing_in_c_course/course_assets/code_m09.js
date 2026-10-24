window.COURSE_CODE_MODULE = {
  "title": "Testing and Tool-Assisted Review",
  "codeIntro": "Use a table-driven boundary matrix, strict compiler warnings, and optional sanitizers to keep a small invocation contract repeatable.",
  "codeExamples": [
    {
      "title": "Table-driven command-line regression tests",
      "language": "c",
      "blurb": "One compact matrix covers valid modes, missing input, wrong arity, unknown options, empty values, and a regression for option-like positionals.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

typedef enum {
    PARSE_OK,
    PARSE_WRONG_ARITY,
    PARSE_UNKNOWN_MODE,
    PARSE_INVALID_INPUT
} ParseResult;

static ParseResult parse_invocation(size_t argc, const char *const argv[])
{
    if (argv == NULL || argc != 3u) {
        return PARSE_WRONG_ARITY;
    }
    if (argv[0] == NULL || argv[1] == NULL || argv[2] == NULL) {
        return PARSE_INVALID_INPUT;
    }
    if (strcmp(argv[1], "--check") != 0 &&
        strcmp(argv[1], "--repair") != 0) {
        return PARSE_UNKNOWN_MODE;
    }
    if (argv[2][0] == '\0' || argv[2][0] == '-') {
        return PARSE_INVALID_INPUT;
    }
    return PARSE_OK;
}

typedef struct {
    size_t argc;
    const char *const *argv;
    ParseResult expected;
} TestCase;

int main(void)
{
    const char *const check[] = {"tool", "--check", "input.cfg"};
    const char *const repair[] = {"tool", "--repair", "input.cfg"};
    const char *const unknown[] = {"tool", "--remove", "input.cfg"};
    const char *const empty[] = {"tool", "--check", ""};
    const char *const option_like[] = {"tool", "--check", "--repair"};
    const char *const missing[] = {"tool", "--check"};
    const TestCase cases[] = {
        {3u, check, PARSE_OK},
        {3u, repair, PARSE_OK},
        {3u, unknown, PARSE_UNKNOWN_MODE},
        {3u, empty, PARSE_INVALID_INPUT},
        {3u, option_like, PARSE_INVALID_INPUT},
        {2u, missing, PARSE_WRONG_ARITY},
        {0u, NULL, PARSE_WRONG_ARITY}
    };
    size_t i = 0u;

    /* IMPORTANT FIX: the documented contract is represented as test data. */
    for (i = 0u; i < sizeof cases / sizeof cases[0]; i++) {
        /* TEST: each valid, boundary, malformed, and regression case is exact. */
        assert(parse_invocation(cases[i].argc, cases[i].argv) ==
               cases[i].expected);
    }
    return 0;
}
`
    },
    {
      "title": "Build and run the exact parser tests",
      "language": "bash",
      "blurb": "Save the C listing to SOURCE.c and pass that path to this Bash script. It uses a fresh temporary build/run directory, stops on compilation failure, and makes enabled sanitizer findings fatal. CC selects the compiler; SANITIZE=1 enables supported AddressSanitizer/UndefinedBehaviorSanitizer checks (SANITIZE=0 disables them). No caller-owned output is overwritten.",
      "code": String.raw`#!/usr/bin/env bash
set -euo pipefail

compiler="${'$'}{CC:-clang}"
source_file="${'$'}{1:?usage: $0 SOURCE.c}"
if [[ "$#" -gt 1 ]]; then
    printf 'usage: %s SOURCE.c\n' "$0" >&2
    exit 2
fi
# Resolve the source before entering the disposable test directory.
source_file="$(cd -- "$(dirname -- "$source_file")" && pwd -P)/$(basename -- "$source_file")"
if [[ ! -f "$source_file" ]]; then
    printf 'test source is not a regular file\n' >&2
    exit 2
fi
temp_parent="$(cd -- "${'$'}{TMPDIR:-/tmp}" && pwd -P)"
work_dir="$(mktemp -d "$temp_parent/c02-tests.XXXXXXXXXX")"
work_dir="$(cd -- "$work_dir" && pwd -P)"
# Validate the exact, newly created cleanup target before installing the trap.
if [[ "$work_dir" != "$temp_parent"/c02-tests.* || "$work_dir" == "$temp_parent" ]]; then
    printf 'unexpected temporary directory\n' >&2
    exit 2
fi
trap 'rm -rf -- "$work_dir"' EXIT
output_file="$work_dir/course-test"
platform_flags=()
case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*)
        # Use the standard C APIs with the Microsoft CRT; retain other warnings.
        platform_flags=(-D_CRT_SECURE_NO_WARNINGS)
        ;;
esac
sanitizer_flags=()
if [[ "${'$'}{SANITIZE:-0}" == "1" ]]; then
    sanitizer_flags=(-fsanitize=address,undefined -fno-sanitize-recover=all
                     -fno-omit-frame-pointer)
fi

"$compiler" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \
    -Werror "${'$'}{platform_flags[@]}" "${'$'}{sanitizer_flags[@]}" "$source_file" -o "$output_file"
# Run only this successful build. Fixtures stay inside the temporary directory.
(cd -- "$work_dir" && "$output_file")
`
    }
  ]
};
