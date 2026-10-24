window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Building C++ with Sanitizers Enabled to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Create a self-contained ASan and UBSan CMake target",
      "language": "cmake",
      "blurb": "The example generates its own source, applies instrumentation to one target, and preserves frame pointers for useful reports.",
      "code": "cmake_minimum_required(VERSION 3.20)\nproject(sanitizer_demo LANGUAGES CXX)\n\nfile(WRITE \"${CMAKE_BINARY_DIR}/checked.cpp\" [=[\n#include <vector>\nint main() { std::vector<int> values(2); return values.at(1); }\n]=])\n\nadd_executable(checked \"${CMAKE_BINARY_DIR}/checked.cpp\")\ntarget_compile_features(checked PRIVATE cxx_std_20)\nif(MSVC)\n  target_compile_options(checked PRIVATE /fsanitize=address /Zi)\nelse()\n  target_compile_options(checked PRIVATE\n    -fsanitize=address,undefined -fno-omit-frame-pointer)\n  target_link_options(checked PRIVATE -fsanitize=address,undefined)\nendif()\n"
    },
    {
      "title": "Build an isolated sanitizer configuration with Clang",
      "language": "bash",
      "blurb": "The workflow creates its source and build directory, compiles with explicit instrumentation, runs the clean test, and removes temporary files. The example assumes /usr/bin/clang++ is an application-owned, reviewed toolchain path.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/printf '%s\n'   '#include <vector>'   'int main(){ std::vector<int> v{1,2,3}; return v.at(2)==3 ? 0 : 1; }'   > \"$work/check.cpp\"\n\n/usr/bin/clang++ -std=c++20 -O1 -g   -fsanitize=address,undefined -fno-omit-frame-pointer   \"$work/check.cpp\" -o \"$work/check\"\n\"$work/check\"\n"
    }
  ]
};
