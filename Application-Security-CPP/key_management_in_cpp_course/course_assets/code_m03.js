window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Linux-specific implementation: fill key bytes with getrandom and explicit failure handling behind an entropy-provider boundary. Other targets should use an approved provider such as BCryptGenRandom, SecRandomCopyBytes, or a managed cryptographic library.",
  "codeExamples": [
    {
      "title": "Linux: fill key material with getrandom",
      "language": "cpp",
      "blurb": "This Linux adapter uses the kernel CSPRNG directly, retries EINTR, and fails if the requested key bytes cannot be completed.",
      "code": "#include <cerrno>\n#include <cstddef>\n#include <span>\n#include <sys/random.h>\n\nbool fill_key_from_os(std::span<std::byte> output) {\n    if (output.empty() || output.size() > 64) return false;\n    std::size_t used = 0;\n    while (used < output.size()) {\n        const auto count = ::getrandom(\n            output.data() + used, output.size() - used, 0\n        );\n        if (count < 0 && errno == EINTR) continue;\n        if (count <= 0) return false;\n        used += static_cast<std::size_t>(count);\n    }\n    return true;\n}"
    },
    {
      "title": "Regression: supported key sizes are explicit",
      "language": "cpp",
      "blurb": "The test verifies failure for empty and oversized requests and obtains a full 256-bit key on supported systems.",
      "code": "#include <array>\n\nint test_os_key_generation() {\n    std::array<std::byte, 32> key{};\n    if (!fill_key_from_os(key)) return 1;\n    if (fill_key_from_os({})) return 2;\n    std::array<std::byte, 65> oversized{};\n    if (fill_key_from_os(oversized)) return 3;\n    return 0;\n}"
    }
  ]
};
