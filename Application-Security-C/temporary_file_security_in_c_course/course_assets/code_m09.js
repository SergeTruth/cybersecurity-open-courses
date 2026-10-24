window.COURSE_CODE_MODULE = {
  "title": "Review, Testing, and Tool Support",
  "codeIntro": "Use injected failure points to prove lifecycle invariants deterministically: no write before successful creation, and every created object receives both close and unlink attempts regardless of write outcome.",
  "codeExamples": [
    {
      "title": "Exercise the complete temporary-resource state machine",
      "language": "c",
      "blurb": "Counters verify create failure, write failure, and success without relying on filesystem timing or an unobservable cleanup branch.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstruct fake_operations {\n    bool create_succeeds;\n    bool write_succeeds;\n    unsigned int creates;\n    unsigned int writes;\n    unsigned int closes;\n    unsigned int unlinks;\n};\n\nstatic bool store_temporary(struct fake_operations *operations)\n{\n    bool write_ok;\n    bool close_ok;\n    bool unlink_ok;\n\n    if (operations == NULL) {\n        return false;\n    }\n    operations->creates += 1U;\n    if (!operations->create_succeeds) {\n        return false;\n    }\n    operations->writes += 1U;\n    write_ok = operations->write_succeeds;\n    operations->closes += 1U;\n    close_ok = true;\n    operations->unlinks += 1U;\n    unlink_ok = true;\n    return write_ok && close_ok && unlink_ok;\n}\n\nint main(void)\n{\n    struct fake_operations create_failure = {false, true, 0U, 0U, 0U, 0U};\n    struct fake_operations write_failure = {true, false, 0U, 0U, 0U, 0U};\n    struct fake_operations success = {true, true, 0U, 0U, 0U, 0U};\n\n    assert(!store_temporary(&create_failure));\n    assert(create_failure.creates == 1U && create_failure.writes == 0U &&\n           create_failure.closes == 0U && create_failure.unlinks == 0U);\n    assert(!store_temporary(&write_failure));\n    assert(write_failure.writes == 1U && write_failure.closes == 1U &&\n           write_failure.unlinks == 1U);\n    assert(store_temporary(&success));\n    assert(success.writes == 1U && success.closes == 1U &&\n           success.unlinks == 1U);\n    assert(!store_temporary(NULL));\n    return 0;\n}\n"
    },
    {
      "title": "Strict and sanitizer regression build",
      "language": "bash",
      "blurb": "Compile the executable regression with optimized warning-as-error diagnostics, then repeat it under AddressSanitizer and UndefinedBehaviorSanitizer.",
      "code": "set -eu\ncc=${CC:-clang}\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror temporary_file_security_m09.c -o temporary_file_security_m09\n./temporary_file_security_m09\n$cc -std=c17 -O2 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Wformat=2 -Werror -g -fsanitize=address,undefined -fno-omit-frame-pointer temporary_file_security_m09.c -o temporary_file_security_m09_san\n./temporary_file_security_m09_san\n"
    }
  ]
};
