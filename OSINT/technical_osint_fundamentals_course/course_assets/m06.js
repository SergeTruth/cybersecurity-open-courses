window.COURSE_MODULE = {
  "title": "Public Code, Packages, and Artifacts",
  "narration": "Public repositories can provide legitimate technical context through source code, commit history, issue discussions, documentation, configuration examples, and release records. Package registries and container references can reveal public dependencies, versions, publishers, and distribution relationships.\n\nDocumentation may identify domains, endpoints, product names, deployment patterns, or third-party services. Example configurations can clarify architecture, but they may be outdated, generic, or unrelated to a live environment. Preserve provenance and publication dates.\n\nDependency clues help defenders understand software supply-chain exposure and identify components that need internal verification. A package name alone does not prove deployment. Forks, mirrors, abandoned projects, and similarly named packages require careful identity checks.\n\nAccidental public exposure of a secret, token, or credential must be handled responsibly. Do not test or use it. Preserve only the minimum evidence needed under policy, restrict access, notify the authorized owner or approved reporting channel, and support revocation and cleanup.\n\nRepositories and registries have access rules. Public technical analysis does not authorize entry into private projects, use of leaked credentials, or retrieval of restricted artifacts. Stop at access boundaries and seek guidance when ownership or reporting authority is unclear.\n\nReport code and package findings as evidence with confidence and limitations. Connect them to internal inventories through authorized teams before asserting operational use, ownership, or vulnerability.",
  "narrationPoints": [
    "Public repositories can provide legitimate technical context through source code, commit history, issue discussions, documentation, configuration examples, and release records.",
    "Documentation may identify domains, endpoints, product names, deployment patterns, or third-party services.",
    "Dependency clues help defenders understand software supply-chain exposure and identify components that need internal verification.",
    "Accidental public exposure of a secret, token, or credential must be handled responsibly.",
    "Repositories and registries have access rules.",
    "Report code and package findings as evidence with confidence and limitations."
  ],
  "graphicAlt": "Blank course graphic placeholder"
};
