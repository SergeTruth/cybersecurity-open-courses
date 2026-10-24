window.COURSE_CODE_MODULE = {
  "title": "Testing and Review of Configuration Parsers: code example",
  "codeIntro": "A length-aware record parser is tested against exact valid input, missing delimiters, embedded nulls, unknown values, and oversized records, then built with sanitizers.",
  "codeExamples": [
    {
      "title": "Regression tests for configuration record boundaries",
      "language": "c",
      "blurb": "The parser never assumes termination and accepts only the complete documented byte representation of the setting.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

enum log_level {
    LOG_INFO,
    LOG_WARNING
};

static bool parse_log_level(const uint8_t *data, size_t length,
                            enum log_level *level)
{
    static const uint8_t info[] = "level=info\n";
    static const uint8_t warning[] = "level=warning\n";

    if (data == NULL || level == NULL) {
        return false;
    }
    if (length == sizeof info - 1u &&
        memcmp(data, info, sizeof info - 1u) == 0) {
        *level = LOG_INFO;
        return true;
    }
    if (length == sizeof warning - 1u &&
        memcmp(data, warning, sizeof warning - 1u) == 0) {
        *level = LOG_WARNING;
        return true;
    }
    return false;
}

int main(void)
{
    const uint8_t valid[] = "level=warning\n";
    const uint8_t missing_delimiter[] = "levelwarning\n";
    const uint8_t embedded_null[] = {'l', 'e', 'v', 'e', 'l', '=', 0u,
                                     'i', 'n', 'f', 'o', '\n'};
    uint8_t oversized[64] = {0u};
    enum log_level level = LOG_INFO;

    assert(parse_log_level(valid, sizeof valid - 1u, &level));
    assert(level == LOG_WARNING);
    /* IMPORTANT FIX: the parser's byte length is part of every comparison. */
    /* TEST: malformed, binary, unknown, and oversized records are rejected. */
    assert(!parse_log_level(missing_delimiter,
                            sizeof missing_delimiter - 1u, &level));
    assert(!parse_log_level(embedded_null, sizeof embedded_null, &level));
    assert(!parse_log_level((const uint8_t *)"level=debug\n", 12u, &level));
    assert(!parse_log_level(oversized, sizeof oversized, &level));
    return 0;
}
`
    },
    {
      "title": "Build and run parser regressions with sanitizers",
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
if [[ "${'$'}{SANITIZE:-1}" == "1" ]]; then
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
