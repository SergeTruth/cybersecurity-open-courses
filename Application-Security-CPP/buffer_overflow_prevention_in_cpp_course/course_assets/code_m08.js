window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Sanitizers, and Fuzzing for Prevention to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Test output boundaries with explicit exit codes",
      "language": "cpp",
      "blurb": "The regression checks empty, exact-fit, one-byte-short, and written-byte behavior without depending on assertions.",
      "code": "#include <array>\n#include <span>\n\nbool write_two(std::span<char> output) {\n    if (output.size() < 2) return false;\n    output[0] = 'O';\n    output[1] = 'K';\n    return true;\n}\n\nint main() {\n    std::array<char, 2> exact{};\n    std::array<char, 1> short_buffer{};\n    if (!write_two(exact)) return 1;\n    if (exact[0] != 'O' || exact[1] != 'K') return 2;\n    if (write_two(short_buffer)) return 3;\n    if (write_two({})) return 4;\n    return 0;\n}\n"
    },
    {
      "title": "Fuzz a capacity-aware decoder",
      "language": "cpp",
      "blurb": "The harness gives the decoder a fixed bounded destination and arbitrary input without fabricating a null terminator.",
      "code": "#include <array>\n#include <cstddef>\n#include <cstdint>\n#include <span>\n\nbool decode(std::span<const std::byte>, std::span<std::byte>) noexcept;\n\nextern \"C\" int LLVMFuzzerTestOneInput(\n    const std::uint8_t* data, std::size_t size) {\n    std::array<std::byte, 1024> output{};\n    (void)decode(\n        {reinterpret_cast<const std::byte*>(data), size},\n        output);\n    return 0;\n}\n"
    }
  ]
};
