window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Reject ambiguous build profiles and give security-affecting options fail-safe defaults.",
  codeExamples: [
    {
      title: "Require a reviewed build profile",
      language: "cmake",
      blurb: "The complete project accepts only Release or RelWithDebInfo and keeps unsafe diagnostics disabled by default.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(secure_build_defaults LANGUAGES CXX)
include(CTest)

set(CMAKE_CONFIGURATION_TYPES "" CACHE STRING "" FORCE)
if(NOT CMAKE_BUILD_TYPE MATCHES "^(Release|RelWithDebInfo)$")
  message(FATAL_ERROR "Release or RelWithDebInfo build required")
endif()
option(ENABLE_UNSAFE_DIAGNOSTICS "Expose sensitive diagnostics" OFF)
if(ENABLE_UNSAFE_DIAGNOSTICS)
  message(FATAL_ERROR "unsafe diagnostics are prohibited")
endif()
file(WRITE "${"$"}{CMAKE_BINARY_DIR}/defaults_check.cpp" [=[
int main() {
#ifdef UNSAFE_DIAGNOSTICS
  return 1;
#else
  return 0;
#endif
}
]=])
add_executable(defaults_check "${"$"}{CMAKE_BINARY_DIR}/defaults_check.cpp")
target_compile_features(defaults_check PRIVATE cxx_std_20)
add_test(NAME secure_build_defaults COMMAND defaults_check)`
    },
    {
      title: "Configure secure defaults in a clean build",
      language: "bash",
      blurb: "The runner chooses the reviewed profile explicitly and prevents cache or environment values from enabling unsafe diagnostics.",
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
    -DCMAKE_BUILD_TYPE=Release -DENABLE_UNSAFE_DIAGNOSTICS=OFF
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
