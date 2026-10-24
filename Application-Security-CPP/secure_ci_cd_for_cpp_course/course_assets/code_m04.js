window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Pass a non-secret signing identity into configuration and fail if secret-like cache variables are populated.",
  codeExamples: [
    {
      title: "Reject secret material in the CMake cache",
      language: "cmake",
      blurb: "The signing identity is auditable metadata; token, password, private-key, and secret cache entries are prohibited.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(ci_signing_identity LANGUAGES CXX)
include(CTest)

set(RELEASE_SIGNER_IDENTITY "" CACHE STRING "Non-secret workload identity")
string(LENGTH "${"$"}{RELEASE_SIGNER_IDENTITY}" signer_length)
if(signer_length GREATER 128 OR
   NOT RELEASE_SIGNER_IDENTITY MATCHES "^ci://[A-Za-z0-9._/-]+$")
  message(FATAL_ERROR "release signer identity required")
endif()
get_cmake_property(cache_names CACHE_VARIABLES)
foreach(name IN LISTS cache_names)
  string(TOUPPER "${"$"}{name}" upper_name)
  if(upper_name MATCHES "(TOKEN|PASSWORD|PRIVATE_KEY|SECRET)" AND
     NOT "${"$"}{${"$"}{name}}" STREQUAL "")
    message(FATAL_ERROR "secret-like value must not enter CMake cache: ${"$"}{name}")
  endif()
endforeach()
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/signer_check.cpp" [=[
#include <string_view>
int main() {
  constexpr std::string_view identity{SIGNER_IDENTITY};
  return identity.starts_with("ci://") ? 0 : 1;
}
]=])
add_executable(signer_check "${"$"}{CMAKE_BINARY_DIR}/signer_check.cpp")
target_compile_features(signer_check PRIVATE cxx_std_20)
target_compile_definitions(signer_check PRIVATE
  SIGNER_IDENTITY="${"$"}{RELEASE_SIGNER_IDENTITY}")
add_test(NAME signing_identity COMMAND signer_check)`
    },
    {
      title: "Configure signing metadata without exporting credentials",
      language: "bash",
      blurb: "The clean environment supplies only a workload identity; an external identity provider handles credentials outside CMake and process arguments.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
rejected_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-rejected.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root" "$rejected_root"' EXIT HUP INT TERM
if /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$rejected_root" --fresh \
    -DRELEASE_SIGNER_IDENTITY=ci://orders/release \
    -DTEST_TOKEN=synthetic-test-value >/dev/null 2>&1
then
  echo "secret-like cache entry was accepted" >&2
  exit 1
fi
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh \
    -DRELEASE_SIGNER_IDENTITY=ci://orders/release
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
