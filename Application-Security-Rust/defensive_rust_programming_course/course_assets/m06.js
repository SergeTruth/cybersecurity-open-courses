window.COURSE_MODULE = {
  "title": "Dependencies, Features, and Supply Chain Hygiene",
  "graphicAlt": "Crates, features, build inputs, inventories, and controlled updates form a reviewable supply chain.",
  "narration": "Rust projects commonly rely on crates, build scripts, feature flags, procedural macros, native dependencies, and transitive packages. These components become part of the trusted application. A crate may parse input, handle network data, manage cryptography, generate code, run at build time, or connect to platform-specific libraries.\n\nDefensive teams review why each dependency exists, whether it is maintained, which versions are allowed, which licenses apply, what transitive dependencies are introduced, and whether known security concerns exist. The goal is not to avoid reuse. The goal is to understand what code is in the product and why it belongs there.\n\nFeature flags deserve attention because they can enable security-relevant behavior. A feature may add a parser, protocol, cryptographic backend, network capability, file handling path, platform integration, or optional dependency. Minimal feature selection can reduce the amount of code that is compiled, linked, and exposed.\n\nBuild scripts and procedural macros also deserve review at a defensive level because they run as part of the build process or generate code that becomes part of the program. Native dependencies can bring platform-specific behavior and update responsibilities. These inputs are part of the supply chain, even when the final source code looks clean.\n\nLockfiles, dependency inventories, SBOM-style records, controlled updates, and review gates help teams understand what they ship. Updates should be tested deliberately, not ignored indefinitely or accepted blindly. Defensive Rust treats dependency hygiene as routine engineering work rather than emergency cleanup.",
  "narrationPoints": [
    "Rust projects commonly rely on crates.",
    "Defensive teams review why each dependency exists.",
    "Feature flags deserve attention.",
    "Build scripts and procedural macros also deserve review at.",
    "Lockfiles, dependency inventories, SBOM-style records.",
    "The goal is not to avoid reuse."
  ]
};
