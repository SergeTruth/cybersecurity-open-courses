window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "This GNU/Linux memory-leak gate requires supported ASan/LSan tooling, a fresh private build, an exact CTest target, and fail-closed runtime settings.",
  "codeExamples": [
    {
      "title": "Define a self-contained leak-check target",
      "language": "cmake",
      "blurb": "Configuration fails when the required Unix GCC or Clang sanitizer environment is unavailable, preventing an unsanitized false-green test.",
      "code": "cmake_minimum_required(VERSION 3.24)\nproject(memory_leak_check LANGUAGES CXX)\ninclude(CTest)\n\noption(MEMORY_LEAK_CHECKS\n  \"Build the memory leak verification target\" OFF)\n\nif(MEMORY_LEAK_CHECKS)\n  if(NOT UNIX OR\n     NOT CMAKE_CXX_COMPILER_ID MATCHES \"^(Clang|GNU)$\")\n    message(FATAL_ERROR\n      \"memory leak checks require supported ASan/LSan tooling\")\n  endif()\n\n  file(WRITE\n    \"${CMAKE_CURRENT_BINARY_DIR}/memory_leak_check.cpp\"\n    [=[\n#include <memory>\n#include <vector>\n\nint main() {\n    auto values = std::make_unique<std::vector<int>>();\n    values->assign(1024, 7);\n    return values->size() == 1024 ? 0 : 1;\n}\n]=])\n\n  add_executable(memory_leak_check\n    \"${CMAKE_CURRENT_BINARY_DIR}/memory_leak_check.cpp\")\n  target_compile_features(memory_leak_check PRIVATE cxx_std_20)\n  target_compile_options(memory_leak_check PRIVATE\n    -Wall\n    -Wextra\n    -Werror\n    -fsanitize=address,undefined\n    -fno-omit-frame-pointer\n  )\n  target_link_options(memory_leak_check PRIVATE\n    -fsanitize=address,undefined\n  )\n  add_test(NAME memory_leak_check COMMAND memory_leak_check)\nendif()"
    },
    {
      "title": "Configure, build, and run the enabled CTest target",
      "language": "bash",
      "blurb": "Direct execution enters Bash through a clean GNU/Linux shebang, then uses a fresh private build directory, absolute tools, LeakSanitizer failure settings, and missing-test detection.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin HOME=/nonexistent LC_ALL=C /usr/bin/bash --noprofile --norc\n# Execute this file directly so BASH_ENV is removed before Bash starts.\n# Hostile-BASH_ENV checks must not invoke it through an ambient Bash.\nset -euo pipefail\n\nreview_root=\"$(/usr/bin/mktemp -d)\"\ncleanup() {\n  /usr/bin/rm -rf -- \"$review_root\"\n}\ntrap cleanup EXIT HUP INT TERM\nbuild_dir=\"$review_root/build\"\n\nclean_environment=(\n  /usr/bin/env -i\n  PATH=/usr/bin:/bin\n  HOME=/nonexistent\n  LC_ALL=C\n  CC=/usr/bin/gcc\n  CXX=/usr/bin/g++\n)\n\n\"${clean_environment[@]}\" /usr/bin/cmake \\\n  -S . \\\n  -B \"$build_dir\" \\\n  -DMEMORY_LEAK_CHECKS=ON \\\n  -DCMAKE_BUILD_TYPE=RelWithDebInfo\n\"${clean_environment[@]}\" /usr/bin/cmake \\\n  --build \"$build_dir\" \\\n  --target memory_leak_check\n\"${clean_environment[@]}\" \\\n  ASAN_OPTIONS='detect_leaks=1:halt_on_error=1' \\\n  UBSAN_OPTIONS='halt_on_error=1' \\\n  /usr/bin/ctest \\\n    --test-dir \"$build_dir\" \\\n    --output-on-failure \\\n    --no-tests=error \\\n    -R '^memory_leak_check$'"
    }
  ]
};
