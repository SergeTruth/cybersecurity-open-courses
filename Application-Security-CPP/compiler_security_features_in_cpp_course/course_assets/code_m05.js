window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Control-Flow and Return-Address Protection to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Select supported control-flow protection by architecture",
      "language": "cmake",
      "blurb": "The build distinguishes x86 control-flow enforcement from Arm return-address signing and rejects an unreviewed platform.",
      "code": "include(CheckCXXCompilerFlag)\nadd_library(control_flow_policy INTERFACE)\n\nif(CMAKE_SYSTEM_PROCESSOR MATCHES \"x86_64|AMD64\")\n  check_cxx_compiler_flag(\"-fcf-protection=full\" HAS_CET)\n  if(NOT HAS_CET)\n    message(FATAL_ERROR \"x86 control-flow protection unavailable\")\n  endif()\n  target_compile_options(control_flow_policy INTERFACE -fcf-protection=full)\nelseif(CMAKE_SYSTEM_PROCESSOR MATCHES \"aarch64|ARM64\")\n  check_cxx_compiler_flag(\"-mbranch-protection=standard\" HAS_BTI_PAC)\n  if(NOT HAS_BTI_PAC)\n    message(FATAL_ERROR \"Arm branch protection unavailable\")\n  endif()\n  target_compile_options(control_flow_policy INTERFACE -mbranch-protection=standard)\nelse()\n  message(FATAL_ERROR \"control-flow policy requires review\")\nendif()\n"
    },
    {
      "title": "Enable Clang CFI with the required LTO contract",
      "language": "cmake",
      "blurb": "The target uses hidden visibility and LTO because Clang CFI requires whole-program type information.",
      "code": "include(CheckIPOSupported)\ncheck_ipo_supported(RESULT HAS_IPO OUTPUT IPO_ERROR)\nif(NOT CMAKE_CXX_COMPILER_ID STREQUAL \"Clang\" OR NOT HAS_IPO)\n  message(FATAL_ERROR \"Clang CFI requires supported LTO: ${IPO_ERROR}\")\nendif()\n\nadd_library(cfi_policy INTERFACE)\ntarget_compile_options(cfi_policy INTERFACE\n  -flto -fsanitize=cfi -fvisibility=hidden)\ntarget_link_options(cfi_policy INTERFACE -flto -fsanitize=cfi)\n"
    }
  ]
};
