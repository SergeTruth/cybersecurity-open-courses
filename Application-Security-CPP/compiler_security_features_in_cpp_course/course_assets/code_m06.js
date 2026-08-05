window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Sanitizers for Development and CI to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Create a combined memory and UB sanitizer policy",
      "language": "cmake",
      "blurb": "The development-only interface target applies matching compile and link instrumentation to participating targets.",
      "code": "add_library(sanitizer_policy INTERFACE)\nif(CMAKE_CXX_COMPILER_ID MATCHES \"GNU|Clang\")\n  target_compile_options(sanitizer_policy INTERFACE\n    -O1 -g -fsanitize=address,undefined -fno-omit-frame-pointer)\n  target_link_options(sanitizer_policy INTERFACE\n    -fsanitize=address,undefined)\nelse()\n  message(FATAL_ERROR \"sanitizer policy requires GCC or Clang\")\nendif()\n"
    },
    {
      "title": "Keep ThreadSanitizer in its own configuration",
      "language": "bash",
      "blurb": "The race-detection build is isolated from ASan because the runtimes are not intended to be combined. The example assumes /usr/bin/clang++ is an application-owned, reviewed toolchain path.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nsource=${1:?concurrency test source required}\noutput=${2:?test output required}\n\n/usr/bin/clang++ -std=c++20 -O1 -g -pthread   -fsanitize=thread -fno-omit-frame-pointer   \"$source\" -o \"$output\"\nTSAN_OPTIONS='halt_on_error=1' \"$output\"\n"
    }
  ]
};
