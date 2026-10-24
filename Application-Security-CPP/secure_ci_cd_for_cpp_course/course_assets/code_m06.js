window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Treat warnings, hardening, and sanitizers as required CI target properties and verify behavior with explicit exit codes.",
  codeExamples: [
    {
      title: "Configure native security checks",
      language: "cmake",
      blurb: "The target receives strict warnings, ASan/UBSan, stack protection, and immediate symbol binding under the reviewed GNU-like profile.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(ci_native_security LANGUAGES CXX)
include(CTest)

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/security_check.cpp" [=[
#include <array>
int main() {
  std::array<int, 3> values{1, 2, 3};
  return values.at(2) == 3 ? 0 : 1;
}
]=])
add_executable(security_check "${"$"}{CMAKE_BINARY_DIR}/security_check.cpp")
target_compile_features(security_check PRIVATE cxx_std_20)
if(CMAKE_CXX_COMPILER_ID MATCHES "Clang|GNU")
  target_compile_options(security_check PRIVATE -O1 -g -Wall -Wextra -Werror
    -fstack-protector-strong -fsanitize=address,undefined
    -fno-omit-frame-pointer)
  target_link_options(security_check PRIVATE -Wl,-z,relro,-z,now
    -fsanitize=address,undefined)
else()
  message(FATAL_ERROR "reviewed GNU-like security profile required")
endif()
add_test(NAME native_security_profile COMMAND security_check)`
    },
    {
      title: "Run the complete security profile",
      language: "bash",
      blurb: "A clean, fresh build ensures sanitizer and hardening properties cannot be inherited from or hidden by a previous configuration.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root"' EXIT HUP INT TERM
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh
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
