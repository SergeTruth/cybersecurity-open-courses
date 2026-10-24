window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Install only declared artifacts and set an origin-relative runtime path rather than embedding a build or user directory.",
  codeExamples: [
    {
      title: "Configure installation and RPATH hygiene",
      language: "cmake",
      blurb: "The executable uses a fixed origin-relative install RPATH, skips build-tree RPATH, and installs only the named target.",
      code: String.raw`cmake_minimum_required(VERSION 3.25)
project(clean_install_artifact LANGUAGES CXX)
include(CTest)

file(WRITE "${"$"}{CMAKE_BINARY_DIR}/install_check.cpp" [=[
int main() { return 0; }
]=])
add_executable(install_check "${"$"}{CMAKE_BINARY_DIR}/install_check.cpp")
target_compile_features(install_check PRIVATE cxx_std_20)
set_target_properties(install_check PROPERTIES
  SKIP_BUILD_RPATH TRUE
  INSTALL_RPATH "$ORIGIN/../lib"
  INSTALL_RPATH_USE_LINK_PATH FALSE)
install(TARGETS install_check
  RUNTIME DESTINATION bin
  COMPONENT runtime)
add_test(NAME install_artifact_runs COMMAND install_check)`
    },
    {
      title: "Build, test, and stage the declared component",
      language: "bash",
      blurb: "A private staging prefix receives only the runtime component, and no ambient DESTDIR or install prefix is inherited.",
      code: String.raw`#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && /bin/pwd -P)
build_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-build.XXXXXXXXXX
)
stage_root=$(
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/mktemp -d -p /tmp c05-stage.XXXXXXXXXX
)
trap '/bin/rm -rf -- "$build_root" "$stage_root"' EXIT HUP INT TERM
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake -S "$project_root" -B "$build_root" --fresh \
    -DCMAKE_BUILD_TYPE=Release
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake --build "$build_root"
(
  cd "$build_root"
  /usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
    /usr/bin/ctest --output-on-failure
)
/usr/bin/env -i PATH=/usr/bin:/bin HOME=/nonexistent \
  /usr/bin/cmake --install "$build_root" --prefix "$stage_root" \
    --component runtime`
    }
  ]
};
