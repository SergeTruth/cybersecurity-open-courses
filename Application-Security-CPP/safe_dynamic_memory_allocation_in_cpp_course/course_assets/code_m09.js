window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Give memory regressions a dedicated sanitizer profile and an explicit exit-code test that remains active in Release builds.",
  codeExamples: [
    {
      title: "Build a bounded-allocation sanitizer regression",
      language: "cmake",
      blurb: "The complete project generates its own test, enables ASan and UBSan for GNU-like compilers, and never relies on assert.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(dynamic_memory_verification LANGUAGES CXX)
include(CTest)

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/memory_check.cpp" [=[
#include <memory>
int main() {
  auto values = std::make_unique<int[]>(4);
  for (int index = 0; index < 4; ++index) values[index] = index;
  return values[3] == 3 ? 0 : 1;
}
]=])
add_executable(memory_check "${"$"}{CMAKE_BINARY_DIR}/memory_check.cpp")
target_compile_features(memory_check PRIVATE cxx_std_20)
if(CMAKE_CXX_COMPILER_ID MATCHES "Clang|GNU")
  target_compile_options(memory_check PRIVATE -O1 -g -Wall -Wextra -Werror
    -fsanitize=address,undefined -fno-omit-frame-pointer)
  target_link_options(memory_check PRIVATE -fsanitize=address,undefined)
endif()
add_test(NAME bounded_dynamic_memory COMMAND memory_check)`
    },
    {
      title: "Run the sanitizer project without stale cache state",
      language: "bash",
      blurb: "A fresh private build and deliberately constructed environment prevent inherited cache, compiler, and CMake option drift.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root"' EXIT HUP INT TERM
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh \
    -DCMAKE_BUILD_TYPE=Debug
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake --build "$build_root"
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    ASAN_OPTIONS=detect_leaks=1:halt_on_error=1 \
    UBSAN_OPTIONS=halt_on_error=1 \
    /usr/bin/ctest --output-on-failure
)`
    }
  ]
};
