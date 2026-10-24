window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Governance, Storage, Sharing, and Maintenance through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Build an SBOM release storage descriptor",
      "language": "javascript",
      "blurb": "The descriptor encodes bounded canonical release identities as unambiguous key segments, then supplies the digest, retention, classification, and required append-only object-lock policy.",
      "code": "function releaseKeySegment(value, field) {\n  if (typeof value !== \"string\" || !value || /[\\u0000-\\u001f\\u007f]/.test(value)) {\n    throw new TypeError(field + \" identity invalid\");\n  }\n  const normalized = value.normalize(\"NFC\");\n  const encoded = Buffer.from(normalized, \"utf8\");\n  if (encoded.length > 256) throw new TypeError(field + \" identity too long\");\n  if (encoded.toString(\"utf8\") !== normalized) throw new TypeError(field + \" identity encoding invalid\");\n  return encoded.toString(\"base64url\");\n}\n\nexport function sbomStorageDescriptor(product, version, artifactSha256, sbomSha256) {\n  if (!/^[a-f0-9]{64}$/i.test(artifactSha256 ?? \"\") || !/^[a-f0-9]{64}$/i.test(sbomSha256 ?? \"\")) {\n    throw new TypeError(\"release evidence required\");\n  }\n  const productKey = releaseKeySegment(product, \"product\");\n  const versionKey = releaseKeySegment(version, \"version\");\n  const artifactDigest = artifactSha256.toLowerCase();\n  return Object.freeze({ key: [productKey, versionKey, artifactDigest].join(\"/\"),\n    sbomSha256: sbomSha256.toLowerCase(), classification: \"internal-supply-chain\", retentionYears: 7,\n    requiredStoragePolicy: \"append-only-object-lock\" });\n}\n"
    },
    {
      "title": "Verify an SBOM signature before release attachment",
      "language": "javascript",
      "blurb": "The workflow verifies signed bytes, matches the declared digest to the artifact inventory, and attaches only the verified SBOM reference.",
      "code": "import { createHash } from \"node:crypto\";\n\nexport async function attachVerifiedSbom(release, sbomBytes, signature, verifier) {\n  if (!(sbomBytes instanceof Uint8Array)) throw new TypeError(\"SBOM bytes required\");\n  if (typeof release?.approvedSigner !== \"string\" || !release.approvedSigner ||\n      !/^[a-f0-9]{64}$/i.test(release.artifactSha256 ?? \"\")) {\n    throw new TypeError(\"trusted release evidence invalid\");\n  }\n  const result = await verifier.verify(sbomBytes, signature);\n  if (result?.valid !== true || result.identity !== release.approvedSigner) throw new Error(\"SBOM signature rejected\");\n  if (!/^[a-f0-9]{64}$/i.test(result.subjectSha256 ?? \"\") ||\n      result.subjectSha256.toLowerCase() !== release.artifactSha256.toLowerCase()) {\n    throw new Error(\"SBOM subject mismatch\");\n  }\n  if (!/^[a-f0-9]{64}$/i.test(result.sbomSha256 ?? \"\")) throw new Error(\"SBOM digest missing\");\n  const digest = result.sbomSha256.toLowerCase();\n  const computedDigest = createHash(\"sha256\").update(sbomBytes).digest(\"hex\");\n  if (digest !== computedDigest) throw new Error(\"SBOM digest mismatch\");\n  await release.attach({ type: \"sbom\", digest });\n  return { attached: true, digest };\n}\n"
    }
  ]
};
