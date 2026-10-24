window.COURSE_CODE_MODULE = {
  "title": "Transport Protection, Logging, Testing, and Review",
  "codeIntro": "Integrate an approved DTLS implementation instead of writing cryptography in portable C. Process plaintext only after authenticated decryption, reject application replays, and log fixed event categories rather than payloads or secrets.",
  "codeExamples": [
    {
      "title": "Gate UDP processing behind an approved DTLS interface",
      "language": "c",
      "blurb": "A mock stands in for the approved library during regression tests. The application accepts authenticated plaintext once, rejects replays and malformed commands, and emits non-sensitive event names.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

typedef bool (*approved_dtls_open_fn)(
    void *context,
    const uint8_t *record, size_t record_length,
    uint8_t *plaintext, size_t plaintext_capacity,
    size_t *plaintext_length, uint64_t *message_sequence);

struct replay_window {
    uint64_t highest_sequence;
    uint64_t seen_bitmap;
    bool initialized;
};

enum process_event {
    EVENT_ACCEPTED,
    EVENT_AUTHENTICATION_REJECTED,
    EVENT_REPLAY_REJECTED,
    EVENT_FORMAT_REJECTED
};

static bool replay_window_accept(struct replay_window *window,
                                 uint64_t sequence)
{
    uint64_t distance;
    uint64_t bit;

    if (window == NULL) {
        return false;
    }
    if (!window->initialized) {
        window->highest_sequence = sequence;
        window->seen_bitmap = UINT64_C(1);
        window->initialized = true;
        return true;
    }
    if (sequence > window->highest_sequence) {
        distance = sequence - window->highest_sequence;
        window->seen_bitmap = distance >= 64U
            ? UINT64_C(1)
            : (window->seen_bitmap << distance) | UINT64_C(1);
        window->highest_sequence = sequence;
        return true;
    }

    distance = window->highest_sequence - sequence;
    if (distance >= 64U) {
        return false;
    }
    bit = UINT64_C(1) << distance;
    if ((window->seen_bitmap & bit) != 0U) {
        return false;
    }
    window->seen_bitmap |= bit;
    return true;
}

static enum process_event process_protected_datagram(
    approved_dtls_open_fn approved_dtls_open,
    void *dtls_context,
    struct replay_window *window,
    const uint8_t *record, size_t record_length)
{
    uint8_t plaintext[32];
    size_t plaintext_length = 0U;
    uint64_t sequence = 0U;

    if (approved_dtls_open == NULL || window == NULL || record == NULL ||
        record_length == 0U ||
        !approved_dtls_open(dtls_context, record, record_length,
                            plaintext, sizeof plaintext,
                            &plaintext_length, &sequence)) {
        return EVENT_AUTHENTICATION_REJECTED;
    }

    /* Application contract: version, command, one-byte value. */
    if (plaintext_length != 3U || plaintext[0] != 1U ||
        plaintext[1] != 1U) {
        return EVENT_FORMAT_REJECTED;
    }
    if (!replay_window_accept(window, sequence)) {
        return EVENT_REPLAY_REJECTED;
    }
    return EVENT_ACCEPTED;
}

static const char *event_log_name(enum process_event event)
{
    static const char *const names[] = {
        "udp_record_accepted",
        "udp_authentication_rejected",
        "udp_replay_rejected",
        "udp_format_rejected"
    };

    if (event < EVENT_ACCEPTED || event > EVENT_FORMAT_REJECTED) {
        return "udp_unknown_event";
    }
    return names[(size_t)event];
}

struct mock_dtls_context {
    bool authentication_passed;
    uint64_t sequence;
    uint8_t plaintext[3];
    size_t plaintext_length;
};

static bool mock_approved_dtls_open(
    void *context,
    const uint8_t *record, size_t record_length,
    uint8_t *plaintext, size_t plaintext_capacity,
    size_t *plaintext_length, uint64_t *message_sequence)
{
    struct mock_dtls_context *mock = context;

    if (mock == NULL || record == NULL || record_length == 0U ||
        plaintext == NULL || plaintext_length == NULL ||
        message_sequence == NULL || !mock->authentication_passed ||
        mock->plaintext_length > sizeof mock->plaintext ||
        mock->plaintext_length > plaintext_capacity) {
        return false;
    }
    (void)memcpy(plaintext, mock->plaintext, mock->plaintext_length);
    *plaintext_length = mock->plaintext_length;
    *message_sequence = mock->sequence;
    return true;
}

int main(void)
{
    const uint8_t opaque_dtls_record[] = {0x16U, 0xfeU, 0xfdU};
    struct replay_window window = {0U, 0U, false};
    struct mock_dtls_context mock = {
        true, UINT64_C(10), {1U, 1U, 7U}, 3U
    };
    enum process_event event;

    event = process_protected_datagram(
        mock_approved_dtls_open, &mock, &window,
        opaque_dtls_record, sizeof opaque_dtls_record);
    assert(event == EVENT_ACCEPTED);
    assert(strcmp(event_log_name(event), "udp_record_accepted") == 0);
    assert(strcmp(event_log_name((enum process_event)-1),
                  "udp_unknown_event") == 0);
    assert(strcmp(event_log_name((enum process_event)99),
                  "udp_unknown_event") == 0);

    /* TEST: the same authenticated application sequence is rejected. */
    event = process_protected_datagram(
        mock_approved_dtls_open, &mock, &window,
        opaque_dtls_record, sizeof opaque_dtls_record);
    assert(event == EVENT_REPLAY_REJECTED);

    /* TEST: authentication and plaintext format fail before state changes. */
    mock.authentication_passed = false;
    mock.sequence = UINT64_C(11);
    assert(process_protected_datagram(
        mock_approved_dtls_open, &mock, &window,
        opaque_dtls_record, sizeof opaque_dtls_record) ==
        EVENT_AUTHENTICATION_REJECTED);
    mock.authentication_passed = true;
    mock.plaintext[0] = 9U;
    assert(process_protected_datagram(
        mock_approved_dtls_open, &mock, &window,
        opaque_dtls_record, sizeof opaque_dtls_record) ==
        EVENT_FORMAT_REJECTED);
    assert(window.highest_sequence == UINT64_C(10));
    /* TEST: a malformed test-double length cannot overread its source array. */
    mock.plaintext[0] = 1U;
    mock.plaintext_length = 32U;
    assert(process_protected_datagram(
        mock_approved_dtls_open, &mock, &window,
        opaque_dtls_record, sizeof opaque_dtls_record) ==
        EVENT_AUTHENTICATION_REJECTED);
    assert(window.highest_sequence == UINT64_C(10));
    return 0;
}
`
    },
    {
      "title": "Strict regression build",
      "language": "bash",
      "blurb": "Save the C listing to SOURCE.c and pass that path to this Bash script. It uses a fresh temporary build/run directory, stops on compilation failure, and makes enabled sanitizer findings fatal. CC selects the compiler; SANITIZE=1 enables supported AddressSanitizer/UndefinedBehaviorSanitizer checks (SANITIZE=0 disables them). No caller-owned output is overwritten.",
      "code": String.raw`#!/usr/bin/env bash
set -euo pipefail

compiler="${'$'}{CC:-clang}"
source_file="${'$'}{1:-udp_m09.c}"
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
