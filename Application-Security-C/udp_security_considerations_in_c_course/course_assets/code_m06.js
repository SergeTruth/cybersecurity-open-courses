window.COURSE_CODE_MODULE = {
  "title": "Buffer Management and Truncation",
  "codeIntro": "Validate caller arguments before waiting on the socket, receive into a bounded region, and reject any UDP datagram that did not fit completely.",
  "codeExamples": [
    {
      "title": "Reject truncated datagrams without publishing a valid output length",
      "language": "c",
      "blurb": "recvmsg reports truncation for an oversized datagram. The caller must ignore the buffer because it may contain a received prefix; the output length remains zero, and a canary proves bytes beyond capacity are unchanged.",
      "code": String.raw`#define _POSIX_C_SOURCE 200809L
#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <sys/socket.h>
#include <unistd.h>

enum datagram_result {
    DATAGRAM_OK,
    DATAGRAM_INVALID_ARGUMENT,
    DATAGRAM_RECEIVE_ERROR,
    DATAGRAM_EMPTY,
    DATAGRAM_TRUNCATED
};

static enum datagram_result receive_datagram(int socket_fd,
                                             uint8_t *buffer,
                                             size_t capacity,
                                             size_t *received_length)
{
    struct iovec vector;
    struct msghdr message = {0};
    ssize_t received;

    /* Reject invalid inputs before a poll or receive operation can block. */
    if (socket_fd < 0 || buffer == NULL || capacity == 0U ||
        received_length == NULL) {
        return DATAGRAM_INVALID_ARGUMENT;
    }
    *received_length = 0U;
    vector.iov_base = buffer;
    vector.iov_len = capacity;
    message.msg_iov = &vector;
    message.msg_iovlen = 1U;

    received = recvmsg(socket_fd, &message, 0);
    if (received < 0) {
        return DATAGRAM_RECEIVE_ERROR;
    }
    if ((message.msg_flags & MSG_TRUNC) != 0) {
        /* buffer may contain a prefix, but no valid output length is published */
        return DATAGRAM_TRUNCATED;
    }
    if (received == 0) {
        return DATAGRAM_EMPTY;
    }

    *received_length = (size_t)received;
    return DATAGRAM_OK;
}

int main(void)
{
    struct guarded_buffer {
        uint8_t bytes[4];
        uint32_t canary;
    } guarded = {{0U, 0U, 0U, 0U}, UINT32_C(0x51a7c0de)};
    int sockets[2] = {-1, -1};
    size_t received_length = 99U;
    const uint8_t exact[] = {1U, 2U, 3U, 4U};
    const uint8_t oversized[] = {5U, 6U, 7U, 8U, 9U, 10U};

    assert(receive_datagram(-1, NULL, 0U, NULL) ==
           DATAGRAM_INVALID_ARGUMENT);
    assert(socketpair(AF_UNIX, SOCK_DGRAM, 0, sockets) == 0);

    assert(send(sockets[0], exact, sizeof exact, 0) ==
           (ssize_t)sizeof exact);
    assert(receive_datagram(sockets[1], guarded.bytes,
                            sizeof guarded.bytes, &received_length) ==
           DATAGRAM_OK);
    assert(received_length == sizeof exact);

    assert(send(sockets[0], oversized, sizeof oversized, 0) ==
           (ssize_t)sizeof oversized);
    assert(receive_datagram(sockets[1], guarded.bytes,
                            sizeof guarded.bytes, &received_length) ==
           DATAGRAM_TRUNCATED);
    assert(received_length == 0U);
    assert(guarded.canary == UINT32_C(0x51a7c0de));

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
source_file="${'$'}{1:-udp_m06.c}"
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
