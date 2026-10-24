window.COURSE_CODE_MODULE = {
  "title": "Signal Masks and Critical Sections",
  "codeIntro": "Block a signal before entering a critical section, then restore the exact prior mask. A signal raised while blocked remains pending and is delivered only after the protected state is coherent.",
  "codeExamples": [
    {
      "title": "Delay signal delivery across a critical update",
      "language": "c",
      "blurb": "The assertions prove that SIGUSR1 does not observe the in-progress state and is delivered after the original mask is restored.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <signal.h>\n#include <stddef.h>\n\nstatic volatile sig_atomic_t observed_state = 0;\nstatic volatile sig_atomic_t shared_state = 0;\n\nstatic void observe_handler(int signal_number)\n{\n    (void)signal_number;\n    observed_state = shared_state;\n}\n\nint main(void)\n{\n    struct sigaction action = {0};\n    sigset_t blocked;\n    sigset_t previous;\n\n    action.sa_handler = observe_handler;\n    assert(sigemptyset(&action.sa_mask) == 0);\n    assert(sigaction(SIGUSR1, &action, NULL) == 0);\n    assert(sigemptyset(&blocked) == 0);\n    assert(sigaddset(&blocked, SIGUSR1) == 0);\n    assert(sigprocmask(SIG_BLOCK, &blocked, &previous) == 0);\n\n    shared_state = 1;\n    assert(raise(SIGUSR1) == 0);\n    assert(observed_state == 0);\n    shared_state = 2;\n\n    assert(sigprocmask(SIG_SETMASK, &previous, NULL) == 0);\n    assert(observed_state == 2);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror signal_handling_security_m05.c -o signal_handling_security_m05\n./signal_handling_security_m05\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m05.c -o signal_handling_security_m05_san\n./signal_handling_security_m05_san\n"
    }
  ]
};
