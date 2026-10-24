window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply ABI, Versioning, and Compatibility to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Version a stable C library table",
      "language": "cpp",
      "blurb": "Consumers request a known ABI version and receive a size-tagged table whose functions use fixed boundary types.",
      "code": "#include <cstdint>\n\nstruct OrdersLibraryV1 {\n    std::uint32_t size;\n    std::uint32_t version;\n    int (*submit)(std::uint64_t) noexcept;\n};\n\nextern \"C\" const OrdersLibraryV1* orders_library_query(\n    std::uint32_t requested) noexcept {\n    static const OrdersLibraryV1 table{\n        sizeof(OrdersLibraryV1), 1,\n        +[](std::uint64_t id) noexcept { return id == 0 ? -1 : 0; }\n    };\n    return requested == 1 ? &table : nullptr;\n}\n"
    },
    {
      "title": "Generate and install a complete CMake package configuration",
      "language": "cmake",
      "blurb": "The self-contained workflow installs a public header, supplies @PACKAGE_INIT@, exports Orders::orders, generates version metadata, and installs every referenced configuration file.",
      "code": "cmake_minimum_required(VERSION 3.20)\nproject(Orders VERSION 1.2.0 LANGUAGES CXX)\ninclude(CMakePackageConfigHelpers)\n\nfile(MAKE_DIRECTORY \"${CMAKE_BINARY_DIR}/include/orders\")\nfile(WRITE \"${CMAKE_BINARY_DIR}/include/orders/orders.hpp\" [=[\n#pragma once\nnamespace orders {\ninline bool valid_quantity(int value) noexcept {\n  return value > 0 && value <= 1000;\n}\n}\n]=])\n\nadd_library(orders INTERFACE)\ntarget_compile_features(orders INTERFACE cxx_std_20)\ntarget_include_directories(orders INTERFACE\n  \"$<BUILD_INTERFACE:${CMAKE_BINARY_DIR}/include>\"\n  \"$<INSTALL_INTERFACE:include>\")\n\nfile(WRITE \"${CMAKE_BINARY_DIR}/OrdersConfig.cmake.in\" [=[\n@PACKAGE_INIT@\ninclude(\"${CMAKE_CURRENT_LIST_DIR}/OrdersTargets.cmake\")\ncheck_required_components(Orders)\n]=])\n\nconfigure_package_config_file(\n  \"${CMAKE_BINARY_DIR}/OrdersConfig.cmake.in\"\n  \"${CMAKE_BINARY_DIR}/OrdersConfig.cmake\"\n  INSTALL_DESTINATION lib/cmake/Orders)\nwrite_basic_package_version_file(\n  \"${CMAKE_BINARY_DIR}/OrdersConfigVersion.cmake\"\n  VERSION \"${PROJECT_VERSION}\"\n  COMPATIBILITY SameMajorVersion)\n\ninstall(TARGETS orders EXPORT OrdersTargets)\ninstall(FILES \"${CMAKE_BINARY_DIR}/include/orders/orders.hpp\"\n  DESTINATION include/orders)\ninstall(EXPORT OrdersTargets\n  FILE OrdersTargets.cmake\n  NAMESPACE Orders::\n  DESTINATION lib/cmake/Orders)\ninstall(FILES\n  \"${CMAKE_BINARY_DIR}/OrdersConfig.cmake\"\n  \"${CMAKE_BINARY_DIR}/OrdersConfigVersion.cmake\"\n  DESTINATION lib/cmake/Orders)\n"
    }
  ]
};
