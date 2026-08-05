window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Deterministic sources require an explicit test-only capability and cannot satisfy the production interface.",
  "codeExamples": [
    {
      "title": "Separate deterministic test bytes by type",
      "language": "cpp",
      "blurb": "The test source implements a distinct interface, so production constructors cannot accept it accidentally.",
      "code": "#include <array>\n#include <cstddef>\n#include <span>\n\nclass ProductionRandom {\npublic:\n    virtual ~ProductionRandom() = default;\n    virtual bool fill_secure(std::span<std::byte> output) = 0;\n};\n\nclass DeterministicTestRandom {\npublic:\n    explicit DeterministicTestRandom(unsigned char seed) : next_(seed) {}\n    void fill_test_bytes(std::span<std::byte> output) noexcept {\n        for (auto& value : output) value = static_cast<std::byte>(next_++);\n    }\nprivate: unsigned char next_;\n};\n\ntemplate<std::size_t N>\nstd::array<std::byte, N> fixture_bytes(DeterministicTestRandom& source) {\n    std::array<std::byte, N> output{};\n    source.fill_test_bytes(output);\n    return output;\n}\n"
    },
    {
      "title": "Verify deterministic behavior stays in the fixture API",
      "language": "cpp",
      "blurb": "Compile-time type separation and runtime checks document the intentional test contract.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_base_of_v<ProductionRandom, DeterministicTestRandom>);\n\nint main() {\n    DeterministicTestRandom first(7), second(7);\n    auto left = fixture_bytes<8>(first);\n    auto right = fixture_bytes<8>(second);\n    if (left != right) return 1;\n    if (left.front() != std::byte{7} || left.back() != std::byte{14}) return 2;\n    return 0;\n}\n"
    }
  ]
};
