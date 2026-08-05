window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Stack Protection and Object Size Checks to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Build and inspect a dedicated stack-protector probe",
      "language": "bash",
      "blurb": "The workflow assumes /usr/bin/g++ is the reviewed toolchain path and generates an eligible stack object before checking for stack-protector linkage.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/printf '%s\\n'   '#include <cstdio>'   '__attribute__((noinline)) int format_value(int value) {'   '  char buffer[64];'   '  return std::snprintf(buffer, sizeof buffer, \"%d\", value);'   '}'   'int main(){ return format_value(7) < 0; }'   > \"$work/probe.cpp\"\n\n/usr/bin/g++ -std=c++20 -O2 -D_FORTIFY_SOURCE=3   -fstack-protector-strong -Wformat -Wformat-security   -Werror=format-security \"$work/probe.cpp\" -o \"$work/probe\"\n\n/usr/bin/nm -u \"$work/probe\" |\n  /usr/bin/grep -Eq '__stack_chk_fail|__security_check_cookie'\n"
    },
    {
      "title": "Require warnings without globally suppressing them",
      "language": "cmake",
      "blurb": "The interface target makes warning policy target-scoped and fails closed for an unreviewed compiler.",
      "code": "add_library(orders_warnings INTERFACE)\nif(CMAKE_CXX_COMPILER_ID MATCHES \"GNU|Clang\")\n  target_compile_options(orders_warnings INTERFACE\n    -Wall -Wextra -Wpedantic -Wconversion -Wformat=2 -Werror)\nelseif(MSVC)\n  target_compile_options(orders_warnings INTERFACE /W4 /WX /permissive- /sdl)\nelse()\n  message(FATAL_ERROR \"warning policy missing for ${CMAKE_CXX_COMPILER_ID}\")\nendif()\n"
    }
  ]
};
