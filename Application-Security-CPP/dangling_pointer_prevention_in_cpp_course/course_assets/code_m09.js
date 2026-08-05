window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply sanitizer diagnostics for lifetime defects to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Create a self-contained AddressSanitizer lifetime regression",
      "language": "cmake",
      "blurb": "The generated defect target uses an unoptimized profile so both GCC and Clang preserve the intentional use-after-free.",
      "code": "cmake_minimum_required(VERSION 3.20)\nproject(lifetime_diagnostic LANGUAGES CXX)\n\nfile(WRITE \"${CMAKE_BINARY_DIR}/dangling.cpp\" [=[\n#include <cstdlib>\n__attribute__((noinline)) int read_after_free(int* value) {\n    volatile int* observed = value;\n    return *observed;\n}\nint main() {\n    int* value = new int(7);\n    delete value;\n    return read_after_free(value) == 7 ? 0 : 1;\n}\n]=])\nfile(GENERATE OUTPUT \"${CMAKE_BINARY_DIR}/expect_asan.cmake\" CONTENT [=[\nexecute_process(\n  COMMAND \"$<TARGET_FILE:dangling_diagnostic>\"\n  RESULT_VARIABLE status\n  ERROR_VARIABLE report)\nif(status EQUAL 0)\n  message(FATAL_ERROR \"expected sanitizer failure did not occur\")\nendif()\nif(NOT report MATCHES \"heap-use-after-free\")\n  message(FATAL_ERROR \"expected lifetime diagnostic was not produced\")\nendif()\n]=])\n\nadd_executable(dangling_diagnostic \"${CMAKE_BINARY_DIR}/dangling.cpp\")\ntarget_compile_features(dangling_diagnostic PRIVATE cxx_std_17)\ntarget_compile_options(dangling_diagnostic PRIVATE\n  -O0 -g -fsanitize=address -fno-omit-frame-pointer)\ntarget_link_options(dangling_diagnostic PRIVATE -fsanitize=address)\nenable_testing()\nadd_test(NAME expected_lifetime_diagnostic\n  COMMAND \"${CMAKE_COMMAND}\" -P \"${CMAKE_BINARY_DIR}/expect_asan.cmake\")\n"
    },
    {
      "title": "Build and execute only the intentional lifetime diagnostic",
      "language": "bash",
      "blurb": "The runner requires an explicit compiler and uses an isolated build tree.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nsource_dir=\"${1:?source directory required}\"\ncompiler=\"${CXX:-/usr/bin/clang++}\"\nbuild_dir=\"$(mktemp -d)\"\ntrap 'rm -rf -- \"$build_dir\"' EXIT\n\n/usr/bin/cmake -S \"$source_dir\" -B \"$build_dir\" -DCMAKE_CXX_COMPILER=\"$compiler\"\n/usr/bin/cmake --build \"$build_dir\"\nASAN_OPTIONS='abort_on_error=1:detect_leaks=0' \\\n  /usr/bin/ctest --test-dir \"$build_dir\" --output-on-failure\n"
    }
  ]
};
