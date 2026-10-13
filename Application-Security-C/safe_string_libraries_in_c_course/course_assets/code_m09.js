window.COURSE_CODE_MODULE = {
  "title": "Testing, Review, and Tool Support",
  "codeIntro": "Test string contracts at representation boundaries with empty input, exact fits, one-byte-short output, and embedded null bytes.",
  "codeExamples": [
    {
      "title": "Boundary tests for byte-to-text encoding",
      "language": "c",
      "blurb": "Hex encoding treats input as a byte range rather than a C string, making embedded-null behavior explicit while exercising overflow-safe capacity checks. A bounded input snapshot also permits in-place encoding.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>
#include <stdlib.h>

static bool hex_encode(const unsigned char *bytes, size_t length,
                       char *out, size_t capacity)
{
    static const char digits[] = "0123456789abcdef";
    size_t i = 0u;
    unsigned char *snapshot = NULL;

    if (out == NULL || capacity == 0u ||
        (bytes == NULL && length != 0u)) {
        return false;
    }

    /* IMPORTANT FIX: prove 2 * length + 1 fits before multiplication. */
    if (length > (capacity - 1u) / 2u) {
        return false;
    }
    /* Snapshot before writing: output may overlap the input byte range. */
    if (length != 0u) {
        snapshot = malloc(length);
        if (snapshot == NULL) {
            return false;
        }
        memcpy(snapshot, bytes, length);
    }
    for (i = 0u; i < length; i++) {
        out[i * 2u] = digits[snapshot[i] >> 4u];
        out[i * 2u + 1u] = digits[snapshot[i] & 0x0fu];
    }
    free(snapshot);
    out[length * 2u] = '\0';
    return true;
}

int main(void)
{
    const unsigned char empty[] = {0u};
    const unsigned char one[] = {0xafu};
    const unsigned char embedded_null[] = {'A', 0u, 'B'};
    char minimal[1] = {'x'};
    char exact[3] = {0};
    char encoded[7] = {0};
    char too_short[6] = "keep";
    unsigned char in_place[7] = {0xaf, 0, 0x42};

    /* TEST: empty, one-byte, and embedded-null inputs encode completely. */
    assert(hex_encode(empty, 0u, minimal, sizeof minimal));
    assert(strcmp(minimal, "") == 0);
    assert(hex_encode(one, sizeof one, exact, sizeof exact));
    assert(strcmp(exact, "af") == 0);
    assert(hex_encode(embedded_null, sizeof embedded_null,
                      encoded, sizeof encoded));
    assert(strcmp(encoded, "410042") == 0);

    /* TEST: one byte less than required is rejected before output changes. */
    assert(!hex_encode(embedded_null, sizeof embedded_null,
                       too_short, sizeof too_short));
    assert(strcmp(too_short, "keep") == 0);
    assert(hex_encode(in_place, 3u, (char *)in_place, sizeof in_place));
    assert(strcmp((char *)in_place, "af0042") == 0);
    return 0;
}
`
    },
    {
      "title": "Build and run the exact string tests",
      "language": "bash",
      "blurb": "The workflow enables strict warnings and can add AddressSanitizer and UndefinedBehaviorSanitizer with SANITIZE=1 where supported.",
      "code": String.raw`#!/usr/bin/env bash
set -eu

cc="${'$'}{CC:-gcc}"
src="${'$'}{1:?usage: test-strings.sh string-tests.c}"
temporary_directory=$(mktemp -d)
out="$temporary_directory/string-tests"
sanitize_flags=()

if [[ "${'$'}{SANITIZE:-0}" == "1" ]]; then
    sanitize_flags=(-fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer)
fi

trap 'rm -f -- "$out"; rmdir -- "$temporary_directory"' EXIT

# IMPORTANT FIX: compile the actual boundary tests with strict diagnostics.
"$cc" -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow \
    -Werror -Wno-unused-function "${'$'}{sanitize_flags[@]}" \
    "$src" -o "$out"

# TEST: assertions and optional sanitizer findings fail the workflow.
"$out"`
    }
  ]
};
