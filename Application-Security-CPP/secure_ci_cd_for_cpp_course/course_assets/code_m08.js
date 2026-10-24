window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Require distinct canonical release and rollback digests so deployment evidence names exact recoverable artifacts.",
  codeExamples: [
    {
      title: "Validate deployment and rollback artifact identities",
      language: "cmake",
      blurb: "Configuration fails unless both artifact digests are canonical and distinct, then registers a compiled evidence check.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(ci_deployment_evidence LANGUAGES CXX)
include(CTest)

set(RELEASE_SHA256 "" CACHE STRING "Approved release digest")
set(ROLLBACK_SHA256 "" CACHE STRING "Approved rollback digest")
string(LENGTH "${"$"}{RELEASE_SHA256}" release_digest_length)
string(LENGTH "${"$"}{ROLLBACK_SHA256}" rollback_digest_length)
if(NOT release_digest_length EQUAL 64 OR
   NOT rollback_digest_length EQUAL 64 OR
   NOT RELEASE_SHA256 MATCHES "^[0-9a-f]+$" OR
   NOT ROLLBACK_SHA256 MATCHES "^[0-9a-f]+$" OR
   RELEASE_SHA256 STREQUAL ROLLBACK_SHA256)
  message(FATAL_ERROR "distinct canonical deployment digests required")
endif()
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/deployment_check.cpp" [=[
#include <string_view>
int main() {
  constexpr std::string_view release{RELEASE_DIGEST};
  constexpr std::string_view rollback{ROLLBACK_DIGEST};
  return release.size() == 64 && rollback.size() == 64 &&
         release != rollback ? 0 : 1;
}
]=])
add_executable(deployment_check
  "${"$"}{CMAKE_BINARY_DIR}/deployment_check.cpp")
target_compile_features(deployment_check PRIVATE cxx_std_20)
target_compile_definitions(deployment_check PRIVATE
  RELEASE_DIGEST="${"$"}{RELEASE_SHA256}"
  ROLLBACK_DIGEST="${"$"}{ROLLBACK_SHA256}")
add_test(NAME deployment_evidence COMMAND deployment_check)`
    },
    {
      title: "Run deployment evidence verification",
      language: "bash",
      blurb: "The runner supplies both reviewed digests explicitly and uses a private build so cached deployment values cannot satisfy the gate.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root"' EXIT HUP INT TERM
release=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
rollback=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh \
    -DRELEASE_SHA256="$release" -DROLLBACK_SHA256="$rollback"
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
