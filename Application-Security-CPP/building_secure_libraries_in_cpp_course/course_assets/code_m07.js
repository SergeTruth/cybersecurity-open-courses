window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Dependencies, Build Options, and Hardening to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Build a real hidden-visibility library target",
      "language": "cmake",
      "blurb": "The self-contained project generates implementation and public header files, sets visibility, and links no accidental public dependencies.",
      "code": "cmake_minimum_required(VERSION 3.20)\nproject(orders_library VERSION 1.2.0 LANGUAGES CXX)\n\nfile(WRITE \"${CMAKE_BINARY_DIR}/orders.hpp\" [=[\n#pragma once\n#if defined(_WIN32)\n#  if defined(ORDERS_BUILD)\n#    define ORDERS_API __declspec(dllexport)\n#  else\n#    define ORDERS_API __declspec(dllimport)\n#  endif\n#else\n#  define ORDERS_API __attribute__((visibility(\"default\")))\n#endif\nextern \"C\" ORDERS_API int orders_validate(int) noexcept;\n]=])\nfile(WRITE \"${CMAKE_BINARY_DIR}/orders.cpp\" [=[\n#include \"orders.hpp\"\nextern \"C\" ORDERS_API int orders_validate(int v) noexcept {\n  return v > 0 ? 0 : -1;\n}\n]=])\nfile(WRITE \"${CMAKE_BINARY_DIR}/orders.map\" [=[\nORDERS_1.0 {\n  global: orders_validate;\n  local: *;\n};\n]=])\n\nadd_library(orders SHARED \"${CMAKE_BINARY_DIR}/orders.cpp\")\ntarget_compile_definitions(orders PRIVATE ORDERS_BUILD=1)\ntarget_include_directories(orders PUBLIC\n  \"$<BUILD_INTERFACE:${CMAKE_BINARY_DIR}>\"\n  \"$<INSTALL_INTERFACE:include>\")\ntarget_compile_features(orders PUBLIC cxx_std_20)\nset_target_properties(orders PROPERTIES\n  CXX_VISIBILITY_PRESET hidden\n  VISIBILITY_INLINES_HIDDEN YES\n  VERSION ${PROJECT_VERSION} SOVERSION 1)\nif(UNIX AND NOT APPLE)\n  target_link_options(orders PRIVATE\n    \"LINKER:--version-script,${CMAKE_BINARY_DIR}/orders.map\")\nendif()\n"
    },
    {
      "title": "Fail when the reviewed dependency boundary changes",
      "language": "bash",
      "blurb": "The check compares the exact direct dynamic dependencies with an application-owned allowlist.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nlibrary=${1:?library path required}\nallowlist=${2:?dependency allowlist required}\nactual=$(mktemp)\ntrap 'rm -f \"$actual\"' EXIT\n\n/usr/bin/readelf -d \"$library\" |\n  /usr/bin/sed -n 's/.*Shared library: \\[\\(.*\\)\\]/\\1/p' |\n  /usr/bin/sort -u > \"$actual\"\n\nif ! /usr/bin/cmp -s \"$allowlist\" \"$actual\"; then\n  /usr/bin/diff -u \"$allowlist\" \"$actual\" >&2 || true\n  exit 1\nfi\n"
    }
  ]
};
