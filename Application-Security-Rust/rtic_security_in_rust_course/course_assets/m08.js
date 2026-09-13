window.COURSE_MODULE = {
  "title": "Secrets, Updates, Debug, Dependencies, and Release Hardening",
  "graphicAlt": "Provisioning, reviewed builds, verified updates, and controlled maintenance separate production firmware from development assumptions.",
  "narration": "RTIC security does not stop at task and resource design. Embedded firmware may store device identity, keys, certificates, pairing data, calibration values, configuration secrets, or service credentials. These values must be handled as part of the product lifecycle.\n\nSecrets should not appear in source code, debug output, logs, crash reports, broad build artifacts, or diagnostic dumps. Rust ownership can help make sensitive data flow easier to review, but storage, provisioning, redaction, replacement, and retirement policies still need explicit design.\n\nFirmware integrity and update behavior should be defined before field deployment. Versioning, authenticity checks, integrity checks, recovery behavior, rollback policy, compatibility, and release evidence all affect whether devices can be maintained safely over time.\n\nRelease hardening also includes separating development assumptions from production assumptions. A setting that is useful during bench testing may be inappropriate in shipped firmware. Teams should identify which diagnostics, features, keys, symbols, logs, and debug behaviors are acceptable in each stage of the lifecycle.\n\nDebug and maintenance interfaces should be controlled according to product risk and operational needs. Serviceability is important, but debug capabilities should not remain broader than the threat model allows. Maintenance access, diagnostics, and manufacturing modes should have documented policy.\n\nDependencies, Cargo features, build scripts, toolchains, linker configuration, generated code, firmware artifacts, symbols, signing materials, and release logs all deserve review. Release hardening is the process of making production behavior repeatable, documented, and auditable.",
  "narrationPoints": [
    "RTIC security does not stop at task and resource design.",
    "Secrets should not appear in source code.",
    "Firmware integrity and update behavior should be defined.",
    "Release hardening also includes separating development.",
    "Debug and maintenance interfaces should be controlled.",
    "Dependencies, Cargo features, build scripts, toolchains."
  ]
};
