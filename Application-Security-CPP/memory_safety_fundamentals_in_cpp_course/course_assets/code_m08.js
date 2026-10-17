window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A memory-safety gate should fail closed without supported sanitizers, build in a fresh directory, and run through a deliberately constructed tool environment.",
  "codeExamples": [
    {
      "title": "Define a sanitizer-backed bounds regression",
      "language": "cmake",
      "blurb": "The generated source performs explicit checked reads, while configuration rejects unsupported toolchains instead of silently registering an unsanitized test.",
      "code": "cmake_minimum_required(VERSION 3.24)\nproject(memory_safety_check LANGUAGES CXX)\ninclude(CTest)\n\noption(MEMORY_SAFETY_CHECKS\n  \"Build the memory safety verification target\" OFF)\n\nif(MEMORY_SAFETY_CHECKS)\n  if(NOT UNIX OR\n     NOT CMAKE_CXX_COMPILER_ID MATCHES \"^(Clang|GNU)$\")\n    message(FATAL_ERROR\n      \"memory safety checks require GCC or Clang on Unix\")\n  endif()\n\n  file(WRITE\n    \"${CMAKE_CURRENT_BINARY_DIR}/memory_safety_check.cpp\"\n    [=[\n#include <array>\n#include <cstddef>\n#include <optional>\n#include <span>\n\nstd::optional<std::byte> checked_read(\n    std::span<const std::byte> bytes,\n    std::size_t index\n) {\n    if (index >= bytes.size()) return std::nullopt;\n    return bytes[index];\n}\n\nint main() {\n    const std::array<std::byte, 2> bytes{\n        std::byte{1}, std::byte{2}\n    };\n    if (checked_read(bytes, 0) != std::byte{1}) return 1;\n    if (checked_read(bytes, 1) != std::byte{2}) return 2;\n    if (checked_read(bytes, 2)) return 3;\n    return 0;\n}\n]=])\n\n  add_executable(memory_safety_check\n    \"${CMAKE_CURRENT_BINARY_DIR}/memory_safety_check.cpp\")\n  target_compile_features(memory_safety_check PRIVATE cxx_std_20)\n  target_compile_options(memory_safety_check PRIVATE\n    -Wall\n    -Wextra\n    -Werror\n    -fsanitize=address,undefined\n    -fno-omit-frame-pointer\n  )\n  target_link_options(memory_safety_check PRIVATE\n    -fsanitize=address,undefined\n  )\n  add_test(NAME memory_safety_check COMMAND memory_safety_check)\nendif()"
    },
    {
      "title": "Run the exact memory-safety test",
      "language": "bash",
      "blurb": "Direct execution removes Bash startup configuration before creating a private fresh build, removing ambient CMake state, invoking trusted absolute tools, and requiring the registered test.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin HOME=/nonexistent LC_ALL=C /usr/bin/bash --noprofile --norc\n# Execute this file directly so BASH_ENV is removed before Bash starts.\n# Hostile-BASH_ENV checks must not invoke it through an ambient Bash.\nset -euo pipefail\n\nreview_root=\"$(/usr/bin/mktemp -d)\"\ncleanup() {\n  /usr/bin/rm -rf -- \"$review_root\"\n}\ntrap cleanup EXIT HUP INT TERM\nbuild_dir=\"$review_root/build\"\n\nclean_environment=(\n  /usr/bin/env -i\n  PATH=/usr/bin:/bin\n  HOME=/nonexistent\n  LC_ALL=C\n  CC=/usr/bin/gcc\n  CXX=/usr/bin/g++\n)\n\n\"${clean_environment[@]}\" /usr/bin/cmake \\\n  -S . \\\n  -B \"$build_dir\" \\\n  -DMEMORY_SAFETY_CHECKS=ON \\\n  -DCMAKE_BUILD_TYPE=RelWithDebInfo\n\"${clean_environment[@]}\" /usr/bin/cmake \\\n  --build \"$build_dir\" \\\n  --target memory_safety_check\n\"${clean_environment[@]}\" \\\n  ASAN_OPTIONS='detect_leaks=1:halt_on_error=1' \\\n  UBSAN_OPTIONS='halt_on_error=1' \\\n  /usr/bin/ctest \\\n    --test-dir \"$build_dir\" \\\n    --output-on-failure \\\n    --no-tests=error \\\n    -R '^memory_safety_check$'"
    }
  ]
};
