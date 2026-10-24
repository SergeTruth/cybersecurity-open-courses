window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Turn sandbox governance into a build-time contract that verifies monitoring remains enabled and policy revision evidence is present.",
  codeExamples: [
    {
      title: "Configure a sandbox governance check",
      language: "cmake",
      blurb: "The project rejects disabled monitoring or a missing reviewed policy revision and tests the compiled policy constants.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(sandbox_governance LANGUAGES CXX)
include(CTest)

option(SANDBOX_MONITORING "Record broker denials and exhaustion" ON)
set(SANDBOX_POLICY_REVISION "2026-08" CACHE STRING
    "Reviewed sandbox policy revision")
if(NOT SANDBOX_MONITORING OR SANDBOX_POLICY_REVISION STREQUAL "")
  message(FATAL_ERROR "sandbox monitoring and policy revision are required")
endif()

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/sandbox_check.cpp" [=[
#include <string_view>
int main() {
  constexpr std::string_view revision{SANDBOX_REVISION};
  return revision.empty() ? 1 : 0;
}
]=])
add_executable(sandbox_check "${"$"}{CMAKE_BINARY_DIR}/sandbox_check.cpp")
target_compile_features(sandbox_check PRIVATE cxx_std_20)
target_compile_definitions(sandbox_check PRIVATE
  SANDBOX_REVISION="${"$"}{SANDBOX_POLICY_REVISION}")
add_test(NAME sandbox_governance_policy COMMAND sandbox_check)`
    },
    {
      title: "Run governance verification with explicit policy inputs",
      language: "bash",
      blurb: "The clean runner supplies the reviewed policy revision deliberately and leaves monitoring at its fail-safe enabled default.",
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
    -DSANDBOX_MONITORING=ON -DSANDBOX_POLICY_REVISION=2026-08
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
