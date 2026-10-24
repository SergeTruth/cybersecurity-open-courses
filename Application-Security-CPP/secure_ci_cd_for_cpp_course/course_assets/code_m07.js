window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Bind artifact, signature, provenance, and SBOM evidence to the same digest and evaluate the signer against trusted release policy.",
  codeExamples: [
    {
      title: "Validate complete release evidence",
      language: "cpp",
      blurb: "Every evidence object names the same canonical artifact digest, while the signer allowlist comes from the release application.",
      code: String.raw`#include <algorithm>
#include <set>
#include <string>

struct ReleaseEvidence {
    std::string artifact_sha256;
    std::string signature_subject_sha256;
    std::string provenance_subject_sha256;
    std::string sbom_subject_sha256;
    std::string signer_identity;
};

bool canonical_sha256(const std::string& value) noexcept {
    return value.size() == 64 &&
        std::all_of(value.begin(), value.end(), [](char ch) {
            return (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f');
        });
}

bool release_allowed(const ReleaseEvidence& evidence,
                     const std::set<std::string>& allowed_signers) {
    return canonical_sha256(evidence.artifact_sha256) &&
           allowed_signers.contains(evidence.signer_identity) &&
           evidence.signature_subject_sha256 == evidence.artifact_sha256 &&
           evidence.provenance_subject_sha256 == evidence.artifact_sha256 &&
           evidence.sbom_subject_sha256 == evidence.artifact_sha256;
}`
    },
    {
      title: "Verify artifact substitution and signer rejection",
      language: "cpp",
      blurb: "Complete evidence passes; changing one subject digest or presenting an unapproved signer blocks release.",
      code: String.raw`int test_release_evidence_binding() {
    const std::string digest(64, 'a');
    ReleaseEvidence evidence{digest, digest, digest, digest,
                             "ci://orders/release"};
    const std::set<std::string> signers{"ci://orders/release"};
    if (!release_allowed(evidence, signers)) return 1;
    evidence.sbom_subject_sha256 = std::string(64, 'b');
    if (release_allowed(evidence, signers)) return 2;
    evidence.sbom_subject_sha256 = digest;
    evidence.signer_identity = "ci://fork/release";
    return release_allowed(evidence, signers) ? 3 : 0;
}`
    }
  ]
};
