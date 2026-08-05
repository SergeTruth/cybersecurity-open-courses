window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Cross-Compiler Configuration Strategy to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Map hardening outcomes across GCC, Clang, and MSVC",
      "language": "cmake",
      "blurb": "Each toolchain receives reviewed equivalent controls, and unknown compilers stop configuration.",
      "code": "add_library(release_policy INTERFACE)\nif(CMAKE_CXX_COMPILER_ID STREQUAL \"GNU\")\n  target_compile_options(release_policy INTERFACE -fstack-protector-strong -fPIE)\n  target_link_options(release_policy INTERFACE -pie -Wl,-z,relro,-z,now)\nelseif(CMAKE_CXX_COMPILER_ID MATCHES \"Clang\")\n  target_compile_options(release_policy INTERFACE -fstack-protector-strong -fPIE)\n  target_link_options(release_policy INTERFACE -pie -Wl,-z,relro,-z,now)\nelseif(MSVC)\n  target_compile_options(release_policy INTERFACE /GS /sdl)\n  target_link_options(release_policy INTERFACE /DYNAMICBASE /NXCOMPAT /CETCOMPAT)\nelse()\n  message(FATAL_ERROR \"unsupported release toolchain\")\nendif()\n"
    },
    {
      "title": "Probe required flags instead of assuming acceptance",
      "language": "cmake",
      "blurb": "Capability checks fail configuration when a mandatory control is unavailable rather than silently weakening one platform.",
      "code": "include(CheckCXXCompilerFlag)\n\nfunction(require_cxx_flag flag variable)\n  check_cxx_compiler_flag(\"${flag}\" \"${variable}\")\n  if(NOT ${variable})\n    message(FATAL_ERROR \"required compiler control unavailable: ${flag}\")\n  endif()\nendfunction()\n\nif(CMAKE_CXX_COMPILER_ID MATCHES \"GNU|Clang\")\n  require_cxx_flag(\"-fstack-protector-strong\" HAS_STACK_PROTECTOR)\n  require_cxx_flag(\"-fPIE\" HAS_PIE)\nendif()\n"
    }
  ]
};
