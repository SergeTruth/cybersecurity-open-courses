window.COURSE_CODE_MODULE = {
  "title": "Signals, Threads, and Event Loops",
  "codeIntro": "Block handled signals before creating worker threads and route them to one dedicated sigwait thread. This avoids running application handlers on arbitrary worker stacks.",
  "codeExamples": [
    {
      "title": "Route a process signal to a dedicated waiter thread",
      "language": "c",
      "blurb": "The regression inherits the blocked mask into the new thread, sends SIGUSR1 to the process, and proves that the dedicated waiter consumed it.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <pthread.h>\n#include <signal.h>\n#include <unistd.h>\n\nstruct waiter_context {\n    sigset_t signals;\n    int received;\n};\n\nstatic void *wait_for_signal(void *argument)\n{\n    struct waiter_context *context = argument;\n\n    assert(context != NULL);\n    assert(sigwait(&context->signals, &context->received) == 0);\n    return NULL;\n}\n\nint main(void)\n{\n    struct waiter_context context;\n    sigset_t previous;\n    pthread_t waiter;\n\n    context.received = 0;\n    assert(sigemptyset(&context.signals) == 0);\n    assert(sigaddset(&context.signals, SIGUSR1) == 0);\n    assert(pthread_sigmask(SIG_BLOCK, &context.signals, &previous) == 0);\n    assert(pthread_create(&waiter, NULL, wait_for_signal, &context) == 0);\n    assert(kill(getpid(), SIGUSR1) == 0);\n    assert(pthread_join(waiter, NULL) == 0);\n    assert(context.received == SIGUSR1);\n    assert(pthread_sigmask(SIG_SETMASK, &previous, NULL) == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -pthread signal_handling_security_m08.c -o signal_handling_security_m08 -pthread\n./signal_handling_security_m08\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -pthread -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m08.c -o signal_handling_security_m08_san -pthread\n./signal_handling_security_m08_san\n"
    }
  ]
};
