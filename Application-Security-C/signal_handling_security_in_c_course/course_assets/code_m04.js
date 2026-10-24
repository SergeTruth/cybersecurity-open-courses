window.COURSE_CODE_MODULE = {
  "title": "Minimal Handlers and Safe Communication",
  "codeIntro": "A flag can communicate a small event from a handler, but normal code should mask the signal while consuming and resetting shared state. The handler below does one sig_atomic_t assignment.",
  "codeExamples": [
    {
      "title": "Consume a pending signal under a short mask",
      "language": "c",
      "blurb": "The regression raises SIGUSR1, then reads and clears the pending value while that signal is blocked so handler and consumer do not update it concurrently.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <signal.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstatic volatile sig_atomic_t pending_signal = 0;\n\nstatic void minimal_handler(int signal_number)\n{\n    pending_signal = signal_number;\n}\n\nstatic bool consume_pending(int *signal_number)\n{\n    sigset_t block;\n    sigset_t previous;\n    sig_atomic_t observed;\n\n    if (signal_number == NULL || sigemptyset(&block) != 0 ||\n        sigaddset(&block, SIGUSR1) != 0 ||\n        sigprocmask(SIG_BLOCK, &block, &previous) != 0) {\n        return false;\n    }\n    observed = pending_signal;\n    pending_signal = 0;\n    if (sigprocmask(SIG_SETMASK, &previous, NULL) != 0) {\n        return false;\n    }\n    *signal_number = (int)observed;\n    return observed != 0;\n}\n\nint main(void)\n{\n    struct sigaction action = {0};\n    int observed = 0;\n\n    action.sa_handler = minimal_handler;\n    assert(sigemptyset(&action.sa_mask) == 0);\n    assert(sigaction(SIGUSR1, &action, NULL) == 0);\n    assert(raise(SIGUSR1) == 0);\n    assert(consume_pending(&observed));\n    assert(observed == SIGUSR1);\n    assert(!consume_pending(&observed));\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror signal_handling_security_m04.c -o signal_handling_security_m04\n./signal_handling_security_m04\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m04.c -o signal_handling_security_m04_san\n./signal_handling_security_m04_san\n"
    }
  ]
};
