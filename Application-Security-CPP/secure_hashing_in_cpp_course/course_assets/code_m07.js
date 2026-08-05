window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Large inputs are streamed through a provider under explicit per-chunk and total byte ceilings.",
  "codeExamples": [
    {
      "title": "Hash a bounded byte stream incrementally",
      "language": "cpp",
      "blurb": "The reader and provider interfaces let the control plane enforce limits before accepting a final digest.",
      "code": "#include <array>\n#include <cstddef>\n#include <optional>\n#include <span>\n\nclass ByteReader {\npublic:\n    virtual ~ByteReader() = default;\n    virtual std::optional<std::size_t> read(std::span<std::byte> buffer) = 0;\n};\n\nclass StreamingHash {\npublic:\n    virtual ~StreamingHash() = default;\n    virtual bool update(std::span<const std::byte> chunk) = 0;\n    virtual std::optional<std::array<std::byte, 32>> finish() = 0;\n};\n\nstd::optional<std::array<std::byte, 32>> hash_stream(\n    ByteReader& reader,\n    StreamingHash& hash,\n    std::size_t byte_limit\n) {\n    std::array<std::byte, 4096> buffer{};\n    std::size_t total = 0;\n    for (;;) {\n        auto count = reader.read(buffer);\n        if (!count || *count > buffer.size()) return std::nullopt;\n        if (*count == 0) break;\n        if (total > byte_limit || *count > byte_limit - total) return std::nullopt;\n        if (!hash.update(std::span(buffer).first(*count))) return std::nullopt;\n        total += *count;\n    }\n    return hash.finish();\n}\n"
    },
    {
      "title": "Reject a stream that exceeds its reviewed ceiling",
      "language": "cpp",
      "blurb": "The regression checks successful streaming and rejection before an oversized total can be accepted.",
      "code": "class CountingReader final : public ByteReader {\npublic:\n    explicit CountingReader(std::size_t remaining) : remaining_(remaining) {}\n    std::optional<std::size_t> read(std::span<std::byte> buffer) override {\n        if (remaining_ == 0) return 0;\n        const auto count = remaining_ < buffer.size() ? remaining_ : buffer.size();\n        remaining_ -= count;\n        return count;\n    }\nprivate:\n    std::size_t remaining_;\n};\nclass CountingHash final : public StreamingHash {\npublic:\n    bool update(std::span<const std::byte> chunk) override { total += chunk.size(); return true; }\n    std::optional<std::array<std::byte, 32>> finish() override { return std::array<std::byte, 32>{}; }\n    std::size_t total = 0;\n};\nint main() {\n    CountingReader accepted(5000); CountingHash first;\n    if (!hash_stream(accepted, first, 5000) || first.total != 5000) return 1;\n    CountingReader rejected(5001); CountingHash second;\n    if (hash_stream(rejected, second, 5000)) return 2;\n    return 0;\n}\n"
    }
  ]
};
