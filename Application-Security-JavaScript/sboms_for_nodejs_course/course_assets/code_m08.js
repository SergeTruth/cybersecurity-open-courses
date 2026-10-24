window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply License, Supplier, and Customer Use Cases through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Evaluate component licenses against release policy",
      "language": "javascript",
      "blurb": "The policy evaluates every CycloneDX expression, SPDX identifier, or named license and sends incomplete or partly approved evidence to review.",
      "code": "function declaredLicenses(component) {\n  if (!Array.isArray(component?.licenses) || component.licenses.length === 0) return { missing: true, malformed: false, values: [] };\n  if (component.licenses.length > 100) throw new RangeError(\"license list too large\");\n  let malformed = false;\n  const values = [];\n  for (const entry of component.licenses) {\n    if (!entry || typeof entry !== \"object\" || Array.isArray(entry)) { malformed = true; continue; }\n    const candidates = [entry.expression, entry.license?.id, entry.license?.name].filter(value => value !== undefined);\n    if (candidates.length !== 1 || typeof candidates[0] !== \"string\" || !candidates[0].trim() || candidates[0].length > 1024) {\n      malformed = true; continue;\n    }\n    values.push(candidates[0]);\n  }\n  return { missing: false, malformed, values };\n}\nexport function licenseFindings(components, policy) {\n  if (!Array.isArray(components) || components.length > 10_000) throw new TypeError(\"component list invalid\");\n  return components.flatMap(component => {\n    const declared = declaredLicenses(component);\n    if (declared.missing) return [{ purl: component?.purl, outcome: \"missing\" }];\n    const denied = declared.values.find(value => policy.denied.has(value));\n    if (denied) return [{ purl: component.purl, outcome: \"denied\", license: denied }];\n    const review = declared.values.filter(value => !policy.approved.has(value));\n    if (declared.malformed || review.length) return [{ purl: component?.purl, outcome: \"review\", malformed: declared.malformed, licenses: review }];\n    return [];\n  });\n}\n"
    },
    {
      "title": "Summarize supplier evidence without inventing provenance",
      "language": "javascript",
      "blurb": "The report separates declared supplier, package author, and registry namespace and flags missing data instead of treating them as equivalent identities.",
      "code": "export function supplierEvidence(component) {\n  return { purl: component.purl, declaredSupplier: component.supplier?.name ?? null,\n    author: component.author ?? null, registryNamespace: component.purl?.match(/^pkg:npm\\/([^/@]+)\\//)?.[1] ?? null,\n    complete: Boolean(component.supplier?.name && component.hashes?.length) };\n}\n"
    }
  ]
};
