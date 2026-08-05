window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Different random artifacts have distinct types, sizes, and reuse contracts.",
  "codeExamples": [
    {
      "title": "Generate typed token, nonce, and salt values",
      "language": "cpp",
      "blurb": "The API prevents accidental substitution and records the nonce context needed to enforce uniqueness.",
      "code": "#include <array>\n#include <cstddef>\n#include <optional>\n#include <span>\n#include <string>\n#include <utility>\n\nclass ArtifactRandom {\npublic:\n    virtual ~ArtifactRandom() = default;\n    virtual bool fill(std::span<std::byte> output) = 0;\n};\n\nstruct SessionToken { std::array<std::byte, 32> bytes; };\nstruct PasswordSalt { std::array<std::byte, 16> bytes; };\nstruct MessageNonce { std::array<std::byte, 12> bytes; std::string key_id; };\n\ntemplate<class Artifact>\nstd::optional<Artifact> random_artifact(ArtifactRandom& random) {\n    Artifact value{};\n    if (!random.fill(value.bytes)) return std::nullopt;\n    return value;\n}\n\nstd::optional<MessageNonce> message_nonce(ArtifactRandom& random, std::string key_id) {\n    if (key_id.empty() || key_id.size() > 32) return std::nullopt;\n    MessageNonce nonce{{}, std::move(key_id)};\n    if (!random.fill(nonce.bytes)) return std::nullopt;\n    return nonce;\n}\n"
    },
    {
      "title": "Verify artifact sizes and nonce context",
      "language": "cpp",
      "blurb": "A deterministic test source validates the type contracts without becoming a production default.",
      "code": "class PatternRandom final : public ArtifactRandom {\npublic:\n    bool fill(std::span<std::byte> output) override {\n        for (std::size_t i = 0; i < output.size(); ++i) output[i] = static_cast<std::byte>(i + 1);\n        return true;\n    }\n};\nint main() {\n    PatternRandom random;\n    auto token = random_artifact<SessionToken>(random);\n    auto salt = random_artifact<PasswordSalt>(random);\n    auto nonce = message_nonce(random, \"key-2026-08\");\n    if (!token || !salt || !nonce || nonce->key_id != \"key-2026-08\") return 1;\n    if (token->bytes.size() == salt->bytes.size()) return 2;\n    if (message_nonce(random, \"\")) return 3;\n    return 0;\n}\n"
    }
  ]
};
