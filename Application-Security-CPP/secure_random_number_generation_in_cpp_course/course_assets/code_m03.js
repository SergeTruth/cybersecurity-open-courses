window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Production bytes come directly from the operating-system CSPRNG with no deterministic fallback.",
  "codeExamples": [
    {
      "title": "Fill a buffer from the platform CSPRNG",
      "language": "cpp",
      "blurb": "The adapter uses BCryptGenRandom on Windows and getrandom on Linux, returning failure instead of substituting a PRNG.",
      "code": "#include <cstddef>\n#include <span>\n\n#if defined(_WIN32)\n#define WIN32_LEAN_AND_MEAN\n#include <windows.h>\n#include <bcrypt.h>\n#pragma comment(lib, \"bcrypt.lib\")\nbool os_random_bytes(std::span<std::byte> output) noexcept {\n    if (output.size() > static_cast<std::size_t>(ULONG_MAX)) return false;\n    return BCryptGenRandom(nullptr,\n                           reinterpret_cast<PUCHAR>(output.data()),\n                           static_cast<ULONG>(output.size()),\n                           BCRYPT_USE_SYSTEM_PREFERRED_RNG) == 0;\n}\n#elif defined(__linux__)\n#include <cerrno>\n#include <sys/random.h>\nbool os_random_bytes(std::span<std::byte> output) noexcept {\n    std::size_t offset = 0;\n    while (offset < output.size()) {\n        const auto result = ::getrandom(output.data() + offset, output.size() - offset, 0);\n        if (result < 0 && errno == EINTR) continue;\n        if (result <= 0) return false;\n        offset += static_cast<std::size_t>(result);\n    }\n    return true;\n}\n#else\n#error \"Provide an approved platform CSPRNG adapter for this target\"\n#endif\n"
    },
    {
      "title": "Request a complete security token or fail",
      "language": "cpp",
      "blurb": "The regression checks complete operating-system source success without making statistical claims about one valid output.",
      "code": "#include <array>\n#include <optional>\n\nstd::optional<std::array<std::byte, 32>> make_security_token() {\n    std::array<std::byte, 32> token{};\n    if (!os_random_bytes(token)) return std::nullopt;\n    return token;\n}\n\nint main() {\n    auto token = make_security_token();\n    if (!token) return 1;\n    return token->size() == 32 ? 0 : 2;\n}\n"
    }
  ]
};
