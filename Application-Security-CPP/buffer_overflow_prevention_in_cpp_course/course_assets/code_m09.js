window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Compiler, Library, and Release Hardening to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Build and inspect one hardened executable",
      "language": "bash",
      "blurb": "The script generates its own translation unit, applies named compile and linker controls, then verifies PIE and non-executable-stack metadata.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/printf '%s\n' 'int main(){return 0;}' > \"$work/main.cpp\"\n/usr/bin/g++ -std=c++20 -O2 -D_FORTIFY_SOURCE=3   -fstack-protector-strong -fPIE \"$work/main.cpp\"   -Wl,-z,relro,-z,now,-z,noexecstack -pie -o \"$work/app\"\n\n/usr/bin/readelf -h \"$work/app\" | /usr/bin/grep -Eq 'Type:[[:space:]]+DYN'\n/usr/bin/readelf -W -l \"$work/app\" |\n  /usr/bin/awk '/GNU_STACK/ { if ($0 ~ /RWE/) exit 1; found=1 } END { exit !found }'\n"
    },
    {
      "title": "Require hardening controls through an interface target",
      "language": "cmake",
      "blurb": "The target enables Fortify together with explicit optimization only for Release builds and names separate compiler and linker controls for each supported toolchain.",
      "code": "cmake_minimum_required(VERSION 3.20)\nproject(buffer_hardening LANGUAGES CXX)\nadd_library(buffer_hardening INTERFACE)\n\nif(CMAKE_CXX_COMPILER_ID MATCHES \"GNU|Clang\")\n  target_compile_options(buffer_hardening INTERFACE\n    -Wall -Wextra -Werror -fstack-protector-strong\n    \"$<$<CONFIG:Release>:-O2>\")\n  target_compile_definitions(buffer_hardening INTERFACE\n    \"$<$<CONFIG:Release>:_FORTIFY_SOURCE=3>\")\n  target_link_options(buffer_hardening INTERFACE\n    -Wl,-z,relro,-z,now,-z,noexecstack)\nelseif(MSVC)\n  target_compile_options(buffer_hardening INTERFACE /W4 /WX /GS /sdl)\n  target_link_options(buffer_hardening INTERFACE /DYNAMICBASE /NXCOMPAT)\nelse()\n  message(FATAL_ERROR \"review hardening for this compiler\")\nendif()\n"
    }
  ]
};
