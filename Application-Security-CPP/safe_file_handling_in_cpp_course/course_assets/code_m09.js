window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Exercise file error reporting without leaking path contents and keep the verification project independent of repository build state.",
  codeExamples: [
    {
      title: "Generate a file-error contract test",
      language: "cmake",
      blurb: "The complete project checks a stable error category and avoids logging the sensitive pathname used to provoke failure.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(file_error_verification LANGUAGES CXX)
include(CTest)

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/file_check.cpp" [=[
#include <fstream>
#include <string_view>
int main() {
  constexpr std::string_view public_error{"configuration unavailable"};
  std::ifstream input{"/definitely-absent/private-token.conf"};
  if (input) return 1;
  return public_error.find("token") == std::string_view::npos ? 0 : 2;
}
]=])
add_executable(file_check "${"$"}{CMAKE_BINARY_DIR}/file_check.cpp")
target_compile_features(file_check PRIVATE cxx_std_20)
target_compile_options(file_check PRIVATE
  $<$<CXX_COMPILER_ID:Clang,GNU>:-Wall;-Wextra;-Werror>)
add_test(NAME bounded_file_error COMMAND file_check)`
    },
    {
      title: "Run file verification in private build storage",
      language: "bash",
      blurb: "The runner uses an unpredictable build directory and a clean environment so previous artifacts and user CMake configuration cannot alter the result.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root"' EXIT HUP INT TERM
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent LC_ALL=C \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent LC_ALL=C \
  /usr/bin/cmake --build "$build_root"
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent LC_ALL=C \
    /usr/bin/ctest --output-on-failure
)`
    }
  ]
};
