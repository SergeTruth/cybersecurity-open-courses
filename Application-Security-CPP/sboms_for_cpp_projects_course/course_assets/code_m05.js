window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Bind an SBOM to the exact release artifact digest so valid component data cannot be paired with different bytes.",
  codeExamples: [
    {
      title: "Validate artifact-to-SBOM digest binding",
      language: "cpp",
      blurb: "Both digests must be canonical lowercase SHA-256 text and must match before the SBOM enters release evidence.",
      code: String.raw`#include <algorithm>
#include <string>

bool lowercase_sha256(const std::string& digest) noexcept {
    return digest.size() == 64 &&
        std::all_of(digest.begin(), digest.end(), [](char ch) {
            return (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f');
        });
}

struct ArtifactSbomBinding {
    std::string artifact_sha256;
    std::string described_artifact_sha256;
};

bool valid_binding(const ArtifactSbomBinding& binding) noexcept {
    return lowercase_sha256(binding.artifact_sha256) &&
           lowercase_sha256(binding.described_artifact_sha256) &&
           binding.artifact_sha256 == binding.described_artifact_sha256;
}`
    },
    {
      title: "Verify matching and substituted artifacts",
      language: "cpp",
      blurb: "Matching canonical evidence succeeds, while a one-character substitution and uppercase ambiguity are rejected.",
      code: String.raw`int test_artifact_sbom_binding() {
    const std::string digest(64, 'a');
    if (!valid_binding({digest, digest})) return 1;
    std::string changed = digest;
    changed.back() = 'b';
    if (valid_binding({digest, changed})) return 2;
    std::string uppercase = digest;
    uppercase.front() = 'A';
    return valid_binding({uppercase, uppercase}) ? 3 : 0;
}`
    }
  ]
};
