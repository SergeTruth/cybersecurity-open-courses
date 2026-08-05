window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply cryptographic keys, randomness, and nonces to a concrete security boundary and a release-safe regression.",
  "codeExamples": [
    {
      "title": "Fill cryptographic material through an approved OS random source",
      "language": "cpp",
      "blurb": "The interface requires an exact fill and propagates operating-system entropy failures.",
      "code": "#include <cerrno>\n#include <cstddef>\n#include <span>\n#include <stdexcept>\n#include <system_error>\n#if defined(_WIN32)\n#include <windows.h>\n#include <bcrypt.h>\n#else\n#include <sys/random.h>\n#endif\n\nclass RandomSource {\npublic:\n    virtual ~RandomSource() = default;\n    virtual void fill(std::span<std::byte> output) = 0;\n};\n\nclass OperatingSystemRandom final : public RandomSource {\npublic:\n    void fill(std::span<std::byte> output) override {\n#if defined(_WIN32)\n        const auto status = ::BCryptGenRandom(\n            nullptr,\n            reinterpret_cast<PUCHAR>(output.data()),\n            static_cast<ULONG>(output.size()),\n            BCRYPT_USE_SYSTEM_PREFERRED_RNG);\n        if (status != 0) {\n            throw std::runtime_error(\"BCryptGenRandom failed\");\n        }\n#else\n        std::size_t offset = 0;\n        while (offset != output.size()) {\n            const auto count = ::getrandom(output.data() + offset,\n                                           output.size() - offset, 0);\n            if (count < 0 && errno == EINTR) continue;\n            if (count <= 0) {\n                throw std::system_error(errno, std::generic_category(),\n                                        \"getrandom\");\n            }\n            offset += static_cast<std::size_t>(count);\n        }\n#endif\n    }\n};\n\nvoid generate_key(RandomSource& source, std::span<std::byte, 32> key) {\n    source.fill(key);\n}\n"
    },
    {
      "title": "Exercise entropy failure without substituting weak randomness",
      "language": "cpp",
      "blurb": "A failed source causes key generation to fail closed; no PRNG fallback is introduced.",
      "code": "#include <array>\n\nclass FailingRandom final : public RandomSource {\npublic:\n    void fill(std::span<std::byte>) override {\n        throw std::runtime_error(\"entropy unavailable\");\n    }\n};\n\nint test_generate_key_propagates_entropy_failure() {\n    std::array<std::byte, 32> key{};\n    FailingRandom source;\n    try {\n        generate_key(source, key);\n        return 1;\n    } catch (const std::runtime_error&) {\n        return 0;\n    }\n}\n"
    }
  ]
};
