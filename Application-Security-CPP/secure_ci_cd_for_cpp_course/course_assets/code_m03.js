window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Pin the runner-facing toolchain contract and prove the selected compiler supports the required language profile.",
  codeExamples: [
    {
      title: "Verify the CI compiler contract",
      language: "cmake",
      blurb: "The complete project rejects unreviewed compiler families and compiles a C++20 feature check as executable evidence.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(ci_toolchain_contract LANGUAGES CXX)
include(CTest)

if(NOT CMAKE_CXX_COMPILER_ID MATCHES "^(Clang|GNU)$")
  message(FATAL_ERROR "CI requires a reviewed Clang or GNU toolchain")
endif()
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/toolchain_check.cpp" [=[
#include <span>
#include <array>
int main() {
  std::array<int, 2> values{1, 2};
  std::span<int> view{values};
  return view.size() == 2 ? 0 : 1;
}
]=])
add_executable(toolchain_check "${"$"}{CMAKE_BINARY_DIR}/toolchain_check.cpp")
target_compile_features(toolchain_check PRIVATE cxx_std_20)
target_compile_options(toolchain_check PRIVATE -Wall -Wextra -Werror)
add_test(NAME ci_toolchain_contract COMMAND toolchain_check)`
    },
    {
      title: "Run on a clean ephemeral CI build root",
      language: "bash",
      blurb: "The runner removes user configuration and stale cache state while selecting the reviewed compiler through an explicit absolute path.",
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
    -DCMAKE_CXX_COMPILER=/usr/bin/g++
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
