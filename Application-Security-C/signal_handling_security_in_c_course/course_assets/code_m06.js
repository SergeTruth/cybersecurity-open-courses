window.COURSE_CODE_MODULE = {
  "title": "Graceful Shutdown and Cleanup",
  "codeIntro": "Let the handler request shutdown and let normal control flow own cleanup. This keeps deallocation and secret erasure out of asynchronous context while making cleanup observable and testable.",
  "codeExamples": [
    {
      "title": "Defer secret cleanup to the main loop",
      "language": "c",
      "blurb": "The handler sets one flag. Normal code clears the resource, marks it inactive, and proves that shutdown occurred exactly once.",
      "code": "#define _POSIX_C_SOURCE 200809L\n#include <assert.h>\n#include <signal.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n\nstruct sensitive_resource {\n    uint8_t bytes[8];\n    bool active;\n    unsigned int cleanup_count;\n};\n\nstatic volatile sig_atomic_t stop_requested = 0;\n\nstatic void request_stop(int signal_number)\n{\n    (void)signal_number;\n    stop_requested = 1;\n}\n\nstatic void cleanup_resource(struct sensitive_resource *resource)\n{\n    volatile uint8_t *cursor;\n    size_t index;\n\n    if (resource == NULL || !resource->active) {\n        return;\n    }\n    cursor = resource->bytes;\n    for (index = 0U; index < sizeof resource->bytes; ++index) {\n        cursor[index] = 0U;\n    }\n    resource->active = false;\n    resource->cleanup_count += 1U;\n}\n\nint main(void)\n{\n    struct sigaction action = {0};\n    struct sensitive_resource resource = {\n        {1U, 2U, 3U, 4U, 5U, 6U, 7U, 8U}, true, 0U\n    };\n    size_t index;\n\n    action.sa_handler = request_stop;\n    assert(sigemptyset(&action.sa_mask) == 0);\n    assert(sigaction(SIGTERM, &action, NULL) == 0);\n    assert(raise(SIGTERM) == 0);\n    if (stop_requested != 0) {\n        cleanup_resource(&resource);\n    }\n    assert(!resource.active);\n    assert(resource.cleanup_count == 1U);\n    for (index = 0U; index < sizeof resource.bytes; ++index) {\n        assert(resource.bytes[index] == 0U);\n    }\n    cleanup_resource(&resource);\n    assert(resource.cleanup_count == 1U);\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror signal_handling_security_m06.c -o signal_handling_security_m06\n./signal_handling_security_m06\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer signal_handling_security_m06.c -o signal_handling_security_m06_san\n./signal_handling_security_m06_san\n"
    }
  ]
};
