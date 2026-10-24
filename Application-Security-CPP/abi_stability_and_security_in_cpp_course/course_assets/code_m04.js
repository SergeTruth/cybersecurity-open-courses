window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safer Boundary Patterns to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Negotiate a size-versioned function table",
      "language": "cpp",
      "blurb": "The host checks the minimum field range it will read and ignores future trailing fields.",
      "code": "#include <cstddef>\n#include <cstdint>\n\nstruct OrdersApiV1 {\n    std::uint32_t struct_size;\n    std::uint32_t abi_version;\n    int (*submit)(const char*, std::size_t) noexcept;\n    void (*shutdown)() noexcept;\n};\n\nconstexpr std::size_t required_v1_size =\n    offsetof(OrdersApiV1, shutdown) + sizeof(OrdersApiV1::shutdown);\n\nbool accepts_v1(const OrdersApiV1* api) noexcept {\n    return api != nullptr &&\n           api->abi_version == 1 &&\n           api->struct_size >= required_v1_size &&\n           api->submit != nullptr &&\n           api->shutdown != nullptr;\n}\n"
    },
    {
      "title": "Keep output storage owned by the caller",
      "language": "cpp",
      "blurb": "A two-call size query avoids returning library-allocated strings across runtimes and never writes a partial result.",
      "code": "#include <algorithm>\n#include <cstddef>\n#include <cstring>\n#include <string_view>\n\nextern \"C\" int orders_status_text(\n    char* output, std::size_t capacity, std::size_t* required) noexcept {\n    constexpr std::string_view text = \"ready\";\n    if (required == nullptr) return -1;\n    *required = text.size() + 1;\n    if (output == nullptr) return capacity == 0 ? 0 : -1;\n    if (capacity < *required) return -2;\n    std::memcpy(output, text.data(), text.size());\n    output[text.size()] = '\\0';\n    return 0;\n}\n"
    }
  ]
};
