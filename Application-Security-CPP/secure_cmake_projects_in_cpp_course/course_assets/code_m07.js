window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Use a generated CMake script and a VERBATIM custom command so untrusted shell parsing is not part of code generation.",
  codeExamples: [
    {
      title: "Generate source without invoking a shell",
      language: "cmake",
      blurb: "The custom command calls CMake directly with fixed arguments, declares its output and dependency, and never concatenates a shell command.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(safe_generated_code LANGUAGES CXX)
include(CTest)

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/generate.cmake" [=[
file(WRITE "${"$"}{OUTPUT_FILE}" "int generated_value() noexcept { return 17; }\n")
]=])
set(generated "${"$"}{CMAKE_BINARY_DIR}/generated.cpp")
add_custom_command(
  OUTPUT "${"$"}{generated}"
  COMMAND "${"$"}{CMAKE_COMMAND}"
          -DOUTPUT_FILE=${"$"}{generated}
          -P "${"$"}{CMAKE_BINARY_DIR}/generate.cmake"
  DEPENDS "${"$"}{CMAKE_BINARY_DIR}/generate.cmake"
  VERBATIM)
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/generated_check.cpp" [=[
int generated_value() noexcept;
int main() { return generated_value() == 17 ? 0 : 1; }
]=])
add_executable(generated_check "${"$"}{generated}"
  "${"$"}{CMAKE_BINARY_DIR}/generated_check.cpp")
target_compile_features(generated_check PRIVATE cxx_std_20)
add_test(NAME generated_code_contract COMMAND generated_check)`
    },
    {
      title: "Run generation in an isolated build tree",
      language: "bash",
      blurb: "The source tree remains read-only to the workflow, while every generated artifact stays inside a private build directory.",
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
  /usr/bin/cmake --build "$build_root" --target generated_check
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/ctest --output-on-failure
)`
    }
  ]
};
