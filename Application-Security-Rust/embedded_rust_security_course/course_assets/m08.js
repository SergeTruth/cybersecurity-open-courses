window.COURSE_MODULE = {
  "title": "Firmware Integrity, Updates, Debug, and Release Hardening",
  "graphicAlt": "Firmware update design verifies, stages, activates, and recovers safely while controlling debug access.",
  "narration": "Embedded security continues after the first firmware build. Teams should define how firmware authenticity and integrity are checked, how updates are delivered, how failed updates are recovered, how rollback policy works, and how devices report version and health in the field.\n\nUpdate behavior should be designed as a lifecycle, not a single operation. The device may lose power, receive an incompatible package, encounter a storage failure, or need to recover to a known-good state. Defensive design documents the expected behavior before, during, and after update attempts.\n\nDebug and maintenance interfaces should be controlled according to product risk and operational needs. The goal is not to remove all serviceability. The goal is to ensure that debug access, diagnostics, manufacturing modes, and maintenance workflows match the threat model and are not accidentally left broader than intended.\n\nBuild and release practices matter. Toolchains, dependencies, features, generated code, linker configuration, firmware artifacts, symbols, signing materials, version metadata, and release logs all need review. These items are part of the firmware's trust story because they influence what actually ships.\n\nProduction hardening should be documented and repeatable. Engineering, manufacturing, and field-support teams should not rely on memory or informal steps to know which build settings, debug policies, artifact checks, and release evidence are required. Repeatability is a security control.",
  "narrationPoints": [
    "Embedded security continues after the first firmware build.",
    "Update behavior should be designed as a lifecycle.",
    "Debug and maintenance interfaces should be controlled.",
    "Build and release practices matter.",
    "Production hardening should be documented and repeatable.",
    "Toolchains, dependencies, features, generated code, linker."
  ]
};
