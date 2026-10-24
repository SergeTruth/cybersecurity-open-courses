window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Build and CI/CD Integration through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Create an in-toto SBOM-binding statement",
      "language": "javascript",
      "blurb": "The valid in-toto Statement shape binds one artifact digest to an SBOM digest and build identity under an organization-owned versioned predicate.",
      "code": "const statementType = \"https://in-toto.io/Statement/v1\";\nconst predicateType = \"https://security.example/attestations/sbom-binding/v1\";\n\nexport function sbomAttestation(subject, sbom, build) {\n  for (const digest of [subject?.sha256, sbom?.sha256]) if (typeof digest !== \"string\" || !/^[a-f0-9]{64}$/i.test(digest)) throw new TypeError(\"SHA-256 evidence required\");\n  if (typeof subject?.name !== \"string\" || !subject.name || typeof sbom?.name !== \"string\" || !sbom.name || typeof build?.commit !== \"string\" || !/^[a-f0-9]{40,64}$/i.test(build?.commit ?? \"\") || typeof build?.builderId !== \"string\" || !build.builderId) {\n    throw new TypeError(\"build identity required\");\n  }\n  return { _type: statementType, subject: [{ name: subject.name, digest: { sha256: subject.sha256 } }], predicateType,\n    predicate: { sbom: { name: sbom.name, digest: { sha256: sbom.sha256 } },\n      build: { commit: build.commit, builder: { id: build.builderId } } } };\n}\n"
    },
    {
      "title": "Gate CI on reproducible SBOM generation",
      "language": "javascript",
      "blurb": "The gate authenticates signed provenance through a trusted verifier and binds its builder, artifact, SBOM, install command, and pinned generator to trusted policy before publication.",
      "code": "export async function validateSbomBuildEvidence(evidence, policy, verifySignedProvenance) {\n  const sha256 = /^[a-f0-9]{64}$/i;\n  if (!sha256.test(policy?.artifactSha256 ?? \"\") || typeof policy?.builderId !== \"string\" || !policy.builderId) {\n    throw new TypeError(\"trusted build policy required\");\n  }\n  if (evidence?.install !== \"npm ci --ignore-scripts\" || !/^@cyclonedx\\/cyclonedx-npm@\\d+\\.\\d+\\.\\d+$/.test(evidence?.generator ?? \"\") ||\n      !sha256.test(evidence?.sbomSha256 ?? \"\") || typeof verifySignedProvenance !== \"function\") {\n    throw new Error(\"SBOM build evidence malformed\");\n  }\n  const verified = await verifySignedProvenance(evidence.provenance, evidence.signature);\n  const sameDigest = (left, right) => sha256.test(left ?? \"\") && sha256.test(right ?? \"\") && left.toLowerCase() === right.toLowerCase();\n  if (verified?.valid !== true || verified.builderId !== policy.builderId ||\n      !sameDigest(verified.artifactSha256, policy.artifactSha256) ||\n      !sameDigest(verified.sbomSha256, evidence.sbomSha256) || verified.install !== evidence.install ||\n      verified.generator !== evidence.generator) throw new Error(\"signed SBOM provenance rejected\");\n  return Object.freeze({ artifactSha256: policy.artifactSha256.toLowerCase(),\n    sbomSha256: evidence.sbomSha256.toLowerCase(), builderId: policy.builderId });\n}\n"
    }
  ]
};
