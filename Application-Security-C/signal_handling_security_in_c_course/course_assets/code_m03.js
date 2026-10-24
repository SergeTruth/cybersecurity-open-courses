window.COURSE_CODE_MODULE = {
  "title": "Async-Signal Safety and Reentrancy",
  "codeIntro": "Restrict an asynchronous handler to operations the platform documents as async-signal-safe. This executable self-pipe regression performs one nonblocking write in the handler and defers interpretation to normal control flow. If the pipe is full, EAGAIN coalesces the notification instead of blocking the handler.",
  "codeExamples": [
    {
      "title": "Notify normal code through a self-pipe",
      "language": "c",
      "blurb": "The write descriptor is nonblocking before the handler is installed. The handler preserves errno, writes one fixed byte, treats EAGAIN as a dropped duplicate notification, and leaves allocation, locking, cleanup, and policy decisions to normal control flow.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <errno.h>\n#include <fcntl.h>\n#include <signal.h>\n#include <stdint.h>\n#include <unistd.h>\n\nstatic int notification_fd = -1;\nstatic volatile sig_atomic_t notification_error = 0;\n\nstatic void notify_handler(int signal_number)\n{\n    const uint8_t event = (uint8_t)signal_number;\n    int saved_errno = errno;\n\n    if (notification_fd >= 0) {\n        ssize_t result = write(notification_fd, &event, sizeof event);\n\n        if (result < 0 && errno != EAGAIN && errno != EWOULDBLOCK) {\n            notification_error = 1;\n        }\n    }\n    errno = saved_errno;\n}\n\nint main(void)\n{\n    int channel[2] = {-1, -1};\n    struct sigaction action = {0};\n    uint8_t event = 0U;\n    int flags;\n\n    assert(pipe(channel) == 0);\n    flags = fcntl(channel[1], F_GETFL);\n    assert(flags >= 0);\n    assert(fcntl(channel[1], F_SETFL, flags | O_NONBLOCK) == 0);\n    notification_fd = channel[1];\n    action.sa_handler = notify_handler;\n    assert(sigemptyset(&action.sa_mask) == 0);\n    assert(sigaction(SIGUSR1, &action, NULL) == 0);\n    assert(raise(SIGUSR1) == 0);\n    assert(read(channel[0], &event, sizeof event) == (ssize_t)sizeof event);\n    assert(event == (uint8_t)SIGUSR1);\n    assert(notification_error == 0);\n    notification_fd = -1;\n    assert(close(channel[0]) == 0);\n    assert(close(channel[1]) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror signal_handling_security_m03.c -o signal_handling_security_m03\n./signal_handling_security_m03\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m03.c -o signal_handling_security_m03_san\n./signal_handling_security_m03_san\n"
    }
  ]
};
