window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Runtime Library and Standard Library Hardening to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Enable libstdc++ release assertions deliberately",
      "language": "cmake",
      "blurb": "The policy requests lightweight standard-library precondition checks without mixing incompatible debug-mode ABIs.",
      "code": "add_library(stdlib_hardening INTERFACE)\nif(CMAKE_CXX_COMPILER_ID STREQUAL \"GNU\")\n  target_compile_definitions(stdlib_hardening INTERFACE\n    _GLIBCXX_ASSERTIONS=1)\nelseif(CMAKE_CXX_COMPILER_ID MATCHES \"Clang\" AND CMAKE_CXX_FLAGS MATCHES \"stdlib=libc\\+\\+\")\n  target_compile_definitions(stdlib_hardening INTERFACE\n    _LIBCPP_HARDENING_MODE=_LIBCPP_HARDENING_MODE_EXTENSIVE)\nelse()\n  message(FATAL_ERROR \"review standard-library hardening for this runtime\")\nendif()\n"
    },
    {
      "title": "Avoid mixing incompatible standard-library debug ABIs",
      "language": "cpp",
      "blurb": "The boundary exposes fixed C-compatible values rather than containers whose layout changes with runtime hardening modes.",
      "code": "#include <cstddef>\n#include <cstdint>\n\nstruct OrdersViewV1 {\n    const std::byte* data;\n    std::size_t size;\n};\n\nextern \"C\" int orders_consume(OrdersViewV1 input) noexcept {\n    if (input.size != 0 && input.data == nullptr) return -1;\n    if (input.size > 65'536) return -2;\n    return 0;\n}\n"
    }
  ]
};
