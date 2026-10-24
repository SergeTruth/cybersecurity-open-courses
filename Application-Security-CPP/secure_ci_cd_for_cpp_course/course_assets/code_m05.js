window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Make the reproducibility epoch and dependency snapshot digest explicit CI inputs rather than inherited ambient state.",
  codeExamples: [
    {
      title: "Bind build provenance inputs",
      language: "cmake",
      blurb: "Configuration requires a numeric source epoch and canonical dependency-lock digest, then compiles them into testable provenance evidence.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(ci_provenance_inputs LANGUAGES CXX)
include(CTest)

set(REPRODUCIBLE_EPOCH "" CACHE STRING "Reviewed source timestamp")
set(DEPENDENCY_LOCK_SHA256 "" CACHE STRING "Reviewed lock digest")
string(LENGTH "${"$"}{DEPENDENCY_LOCK_SHA256}" lock_digest_length)
if(NOT REPRODUCIBLE_EPOCH MATCHES "^[0-9]+$" OR
   NOT lock_digest_length EQUAL 64 OR
   NOT DEPENDENCY_LOCK_SHA256 MATCHES "^[0-9a-f]+$")
  message(FATAL_ERROR "canonical provenance inputs required")
endif()
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/provenance_check.cpp" [=[
#include <string_view>
int main() {
  constexpr std::string_view epoch{BUILD_EPOCH};
  constexpr std::string_view lock{LOCK_DIGEST};
  return !epoch.empty() && lock.size() == 64 ? 0 : 1;
}
]=])
add_executable(provenance_check
  "${"$"}{CMAKE_BINARY_DIR}/provenance_check.cpp")
target_compile_features(provenance_check PRIVATE cxx_std_20)
target_compile_definitions(provenance_check PRIVATE
  BUILD_EPOCH="${"$"}{REPRODUCIBLE_EPOCH}"
  LOCK_DIGEST="${"$"}{DEPENDENCY_LOCK_SHA256}")
add_test(NAME provenance_inputs COMMAND provenance_check)`
    },
    {
      title: "Run with explicit reproducibility evidence",
      language: "bash",
      blurb: "The clean runner supplies both reviewed inputs and SOURCE_DATE_EPOCH deliberately while preventing user Git or CMake configuration from leaking in.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root"' EXIT HUP INT TERM
lock=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent SOURCE_DATE_EPOCH=1754000000 \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh \
    -DREPRODUCIBLE_EPOCH=1754000000 -DDEPENDENCY_LOCK_SHA256="$lock"
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent SOURCE_DATE_EPOCH=1754000000 \
  /usr/bin/cmake --build "$build_root"
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/ctest --output-on-failure
)`
    }
  ]
};
