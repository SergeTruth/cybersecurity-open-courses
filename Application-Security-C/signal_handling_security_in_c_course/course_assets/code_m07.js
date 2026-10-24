window.COURSE_CODE_MODULE = {
  "title": "Child Processes and Signal-Driven Events",
  "codeIntro": "Coordinate child status in normal flow by blocking SIGCHLD before fork, waiting synchronously for that signal, and then collecting the specific child with waitpid.",
  "codeExamples": [
    {
      "title": "Wait for SIGCHLD and reap the expected child",
      "language": "c",
      "blurb": "The parent cannot miss the notification between fork and wait because SIGCHLD is already blocked. It validates the exact child and exit status before restoring the prior mask.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <signal.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(void)\n{\n    sigset_t child_signal;\n    sigset_t previous;\n    pid_t child;\n    pid_t reaped;\n    int received = 0;\n    int status = 0;\n\n    assert(sigemptyset(&child_signal) == 0);\n    assert(sigaddset(&child_signal, SIGCHLD) == 0);\n    assert(sigprocmask(SIG_BLOCK, &child_signal, &previous) == 0);\n    child = fork();\n    assert(child >= 0);\n    if (child == 0) {\n        _exit(7);\n    }\n    assert(sigwait(&child_signal, &received) == 0);\n    assert(received == SIGCHLD);\n    reaped = waitpid(child, &status, 0);\n    assert(reaped == child);\n    assert(WIFEXITED(status));\n    assert(WEXITSTATUS(status) == 7);\n    assert(sigprocmask(SIG_SETMASK, &previous, NULL) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror signal_handling_security_m07.c -o signal_handling_security_m07\n./signal_handling_security_m07\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m07.c -o signal_handling_security_m07_san\n./signal_handling_security_m07_san\n"
    }
  ]
};
