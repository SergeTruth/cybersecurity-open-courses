window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Fuzzing, Documentation, and Release Governance to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Fuzz the installed public parser interface",
      "language": "cpp",
      "blurb": "The harness uses only the documented byte-view entry point, so it tests the same contract available to consumers.",
      "code": "#include <cstddef>\n#include <cstdint>\n#include <span>\n\nenum class ParseStatus { accepted, rejected };\nParseStatus orders_parse(std::span<const std::byte>) noexcept;\n\nextern \"C\" int LLVMFuzzerTestOneInput(\n    const std::uint8_t* data, std::size_t size) {\n    (void)orders_parse({\n        reinterpret_cast<const std::byte*>(data), size});\n    return 0;\n}\n"
    },
    {
      "title": "Build a self-contained package-layout consumer test",
      "language": "cmake",
      "blurb": "The synthetic project creates the public orders/ header, builds the library, and uses explicit exit codes so its CTest exercises behavior in Debug and Release configurations.",
      "code": "cmake_minimum_required(VERSION 3.20)\nproject(orders_consumer_test LANGUAGES CXX)\ninclude(CTest)\n\nfile(MAKE_DIRECTORY \"${CMAKE_BINARY_DIR}/include/orders\")\nfile(WRITE \"${CMAKE_BINARY_DIR}/include/orders/orders.hpp\" [=[\n#pragma once\nextern \"C\" int orders_validate(int) noexcept;\n]=])\nfile(WRITE \"${CMAKE_BINARY_DIR}/orders.cpp\" [=[\n#include <orders/orders.hpp>\nextern \"C\" int orders_validate(int value) noexcept {\n  return value > 0 ? 0 : -1;\n}\n]=])\nfile(WRITE \"${CMAKE_BINARY_DIR}/consumer.cpp\" [=[\n#include <orders/orders.hpp>\nint main() {\n  if (orders_validate(1) != 0) return 1;\n  if (orders_validate(0) != -1) return 2;\n  if (orders_validate(-1) != -1) return 3;\n  return 0;\n}\n]=])\n\nadd_library(orders STATIC \"${CMAKE_BINARY_DIR}/orders.cpp\")\ntarget_include_directories(orders PUBLIC \"${CMAKE_BINARY_DIR}/include\")\ntarget_compile_features(orders PUBLIC cxx_std_20)\nadd_executable(orders_consumer \"${CMAKE_BINARY_DIR}/consumer.cpp\")\ntarget_link_libraries(orders_consumer PRIVATE orders)\nadd_test(NAME orders_consumer COMMAND orders_consumer)\n"
    }
  ]
};
