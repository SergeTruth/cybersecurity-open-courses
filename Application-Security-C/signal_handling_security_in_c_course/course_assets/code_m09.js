window.COURSE_CODE_MODULE = {
  "title": "Diagnostics, Crashes, and Sensitive State",
  "codeIntro": "Crash-adjacent handlers should emit only a fixed diagnostic marker through an async-signal-safe, nonblocking channel. If the channel is full, EAGAIN drops or coalesces the marker rather than blocking. Rich logs and secret inspection belong outside the handler.",
  "codeExamples": [
    {
      "title": "Emit a fixed diagnostic event without sensitive state",
      "language": "c",
      "blurb": "Before handler installation, the pipe write descriptor becomes nonblocking. A nonfatal signal drives the regression; the handler writes only a constant event name, and normal code verifies the exact bytes and error state.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <errno.h>\n#include <fcntl.h>\n#include <signal.h>\n#include <stddef.h>\n#include <string.h>\n#include <unistd.h>\n\nstatic int diagnostic_fd = -1;\nstatic volatile sig_atomic_t diagnostic_error = 0;\n\nstatic void diagnostic_handler(int signal_number)\n{\n    static const char event[] = \"fatal_signal\\n\";\n    int saved_errno = errno;\n\n    (void)signal_number;\n    if (diagnostic_fd >= 0) {\n        ssize_t result = write(diagnostic_fd, event, sizeof event - 1U);\n\n        if (result < 0 && errno != EAGAIN && errno != EWOULDBLOCK) {\n            diagnostic_error = 1;\n        }\n    }\n    errno = saved_errno;\n}\n\nint main(void)\n{\n    static const char expected[] = \"fatal_signal\\n\";\n    struct sigaction action = {0};\n    int channel[2] = {-1, -1};\n    char observed[sizeof expected - 1U];\n    int flags;\n\n    assert(pipe(channel) == 0);\n    flags = fcntl(channel[1], F_GETFL);\n    assert(flags >= 0);\n    assert(fcntl(channel[1], F_SETFL, flags | O_NONBLOCK) == 0);\n    diagnostic_fd = channel[1];\n    action.sa_handler = diagnostic_handler;\n    assert(sigemptyset(&action.sa_mask) == 0);\n    assert(sigaction(SIGUSR2, &action, NULL) == 0);\n    assert(raise(SIGUSR2) == 0);\n    assert(read(channel[0], observed, sizeof observed) ==\n           (ssize_t)sizeof observed);\n    assert(memcmp(observed, expected, sizeof observed) == 0);\n    assert(diagnostic_error == 0);\n    diagnostic_fd = -1;\n    assert(close(channel[0]) == 0);\n    assert(close(channel[1]) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror signal_handling_security_m09.c -o signal_handling_security_m09\n./signal_handling_security_m09\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m09.c -o signal_handling_security_m09_san\n./signal_handling_security_m09_san\n"
    }
  ]
};
