window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Attach compiler and linker hardening to the protected target instead of relying on undocumented global flags.",
  codeExamples: [
    {
      title: "Apply a reviewed hardening interface",
      language: "cmake",
      blurb: "An interface target carries warnings, stack protection, fortified source, PIE, RELRO, and immediate binding to its consumer.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(cmake_hardening_profile LANGUAGES CXX)
include(CTest)

if(NOT CMAKE_CXX_COMPILER_ID MATCHES "^(Clang|GNU)$")
  message(FATAL_ERROR "reviewed GNU-like hardening profile required")
endif()
add_library(hardening INTERFACE)
target_compile_options(hardening INTERFACE -Wall -Wextra -Werror
  -fstack-protector-strong -fPIE)
target_compile_definitions(hardening INTERFACE _FORTIFY_SOURCE=3)
target_link_options(hardening INTERFACE -pie -Wl,-z,relro,-z,now)
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/hardening_check.cpp" [=[
#include <array>
int main() { std::array<int, 1> value{7}; return value[0] == 7 ? 0 : 1; }
]=])
add_executable(hardening_check "${"$"}{CMAKE_BINARY_DIR}/hardening_check.cpp")
target_compile_features(hardening_check PRIVATE cxx_std_20)
target_link_libraries(hardening_check PRIVATE hardening)
add_test(NAME hardening_profile COMMAND hardening_check)`
    },
    {
      title: "Build and test the hardened target",
      language: "bash",
      blurb: "The clean build selects the reviewed compiler explicitly so a different ambient toolchain cannot silently ignore the profile.",
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
    -DCMAKE_CXX_COMPILER=/usr/bin/g++ -DCMAKE_BUILD_TYPE=Release
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake --build "$build_root"
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/ctest --output-on-failure
)`
    }
  ]
};
