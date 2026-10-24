window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Require governance metadata and register explicit configuration and behavior checks as part of the default CI contract.",
  codeExamples: [
    {
      title: "Configure build-governance evidence",
      language: "cmake",
      blurb: "The project requires an owner and reviewed policy revision, exports compile commands for analysis, and registers a real smoke test.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(cmake_governance LANGUAGES CXX)
include(CTest)

set(BUILD_POLICY_OWNER "" CACHE STRING "Accountable build-policy owner")
set(BUILD_POLICY_REVISION "" CACHE STRING "Reviewed policy revision")
string(LENGTH "${"$"}{BUILD_POLICY_REVISION}" policy_revision_length)
if(BUILD_POLICY_OWNER STREQUAL "" OR
   NOT policy_revision_length EQUAL 7 OR
   NOT BUILD_POLICY_REVISION MATCHES "^[0-9][0-9][0-9][0-9]-[0-9][0-9]$")
  message(FATAL_ERROR "owner and YYYY-MM policy revision required")
endif()
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/governance_check.cpp" [=[
#include <string_view>
int main() {
  return !std::string_view{POLICY_OWNER}.empty() &&
         std::string_view{POLICY_REVISION}.size() == 7 ? 0 : 1;
}
]=])
add_executable(governance_check
  "${"$"}{CMAKE_BINARY_DIR}/governance_check.cpp")
target_compile_features(governance_check PRIVATE cxx_std_20)
target_compile_definitions(governance_check PRIVATE
  POLICY_OWNER="${"$"}{BUILD_POLICY_OWNER}"
  POLICY_REVISION="${"$"}{BUILD_POLICY_REVISION}")
add_test(NAME build_governance COMMAND governance_check)`
    },
    {
      title: "Run governance checks with explicit ownership",
      language: "bash",
      blurb: "CI supplies accountable policy metadata in a clean configuration and runs the registered checks from a fresh private build.",
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
    -DBUILD_POLICY_OWNER=orders-platform \
    -DBUILD_POLICY_REVISION=2026-08
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
