window.COURSE_CODE_MODULE = {
  "title": "Message Validation and Format Discipline",
  "codeIntro": "Receive exactly one UDP datagram, then validate the frame declared inside that datagram. A short datagram is a complete message to reject, not a prefix to combine with the next message.",
  "codeExamples": [
    {
      "title": "Validate one length-framed datagram",
      "language": "c",
      "blurb": "One recvmsg consumes one datagram. The parser rejects truncation, a missing header, a declared-length mismatch, and payloads that exceed the caller's policy capacity.",
      "code": String.raw`#define _POSIX_C_SOURCE 200809L
#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

enum frame_result {
    FRAME_OK,
    FRAME_INVALID_ARGUMENT,
    FRAME_RECEIVE_ERROR,
    FRAME_TRUNCATED,
    FRAME_INVALID_FORMAT
};

enum { MAX_PAYLOAD = 256, HEADER_SIZE = 2 };

static enum frame_result receive_one_frame(int socket_fd,
                                           uint8_t *payload,
                                           size_t payload_capacity,
                                           size_t *payload_length)
{
    uint8_t datagram[HEADER_SIZE + MAX_PAYLOAD];
    struct iovec vector = {datagram, sizeof datagram};
    struct msghdr message = {0};
    ssize_t received;
    size_t declared_length;

    if (socket_fd < 0 || payload == NULL || payload_capacity == 0U ||
        payload_length == NULL) {
        return FRAME_INVALID_ARGUMENT;
    }
    *payload_length = 0U;
    message.msg_iov = &vector;
    message.msg_iovlen = 1U;

    /* IMPORTANT: this single call consumes exactly one UDP datagram. */
    received = recvmsg(socket_fd, &message, 0);
    if (received < 0) {
        return FRAME_RECEIVE_ERROR;
    }
    if ((message.msg_flags & MSG_TRUNC) != 0) {
        return FRAME_TRUNCATED;
    }
    if ((size_t)received < HEADER_SIZE) {
        return FRAME_INVALID_FORMAT;
    }

    declared_length = ((size_t)datagram[0] << 8U) | datagram[1];
    if (declared_length != (size_t)received - HEADER_SIZE ||
        declared_length > payload_capacity) {
        return FRAME_INVALID_FORMAT;
    }

    (void)memcpy(payload, datagram + HEADER_SIZE, declared_length);
    *payload_length = declared_length;
    return FRAME_OK;
}

static void send_test_datagram(int socket_fd,
                               const uint8_t *data, size_t length)
{
    assert(send(socket_fd, data, length, 0) == (ssize_t)length);
}

int main(void)
{
    int sockets[2] = {-1, -1};
    uint8_t payload[8] = {0};
    size_t payload_length = 99U;
    const uint8_t valid[] = {0U, 3U, 'a', 'b', 'c'};
    const uint8_t bad_length[] = {0U, 4U, 'x', 'y'};
    const uint8_t first[] = {0U, 1U, 'A'};
    const uint8_t second[] = {0U, 1U, 'B'};

    assert(socketpair(AF_UNIX, SOCK_DGRAM, 0, sockets) == 0);
    send_test_datagram(sockets[0], valid, sizeof valid);
    assert(receive_one_frame(sockets[1], payload, sizeof payload,
                             &payload_length) == FRAME_OK);
    assert(payload_length == 3U && memcmp(payload, "abc", 3U) == 0);

    /* TEST: a short datagram is rejected instead of reading another one. */
    send_test_datagram(sockets[0], bad_length, sizeof bad_length);
    assert(receive_one_frame(sockets[1], payload, sizeof payload,
                             &payload_length) == FRAME_INVALID_FORMAT);

    /* TEST: adjacent datagrams remain two independent logical frames. */
    send_test_datagram(sockets[0], first, sizeof first);
    send_test_datagram(sockets[0], second, sizeof second);
    assert(receive_one_frame(sockets[1], payload, sizeof payload,
                             &payload_length) == FRAME_OK);
    assert(payload_length == 1U && payload[0] == 'A');
    assert(receive_one_frame(sockets[1], payload, sizeof payload,
                             &payload_length) == FRAME_OK);
    assert(payload_length == 1U && payload[0] == 'B');

    assert(close(sockets[0]) == 0);
    assert(close(sockets[1]) == 0);
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
source_file="${'$'}{1:-udp_m05.c}"
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
