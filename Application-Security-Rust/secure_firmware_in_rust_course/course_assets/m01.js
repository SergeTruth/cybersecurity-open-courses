window.COURSE_MODULE = {
  "title": "Why Secure Firmware in Rust Matters",
  "graphicAlt": "Secure firmware spans design, builds, provisioning, updates, and recovery, with explicit assumptions beyond language safety.",
  "narration": "Firmware is long-lived software that often runs close to hardware, controls physical behavior, processes device input, stores identity material, and remains in the field for years. A firmware decision may affect not only a process or a service, but a device that is deployed, serviced, updated, and recovered outside the developer's workspace.\n\nRust gives firmware teams strong advantages. Ownership and borrowing make buffer responsibility easier to reason about. Type safety helps represent valid states. Safe Rust reduces many memory-corruption risks that have historically mattered in embedded systems. Those strengths are real, and they are a major reason Rust is attractive for device software.\n\nBut secure firmware still requires defensive design. Rust does not automatically decide whether an update process is safe, whether debug access is controlled, whether hardware assumptions are documented, whether protocol input is valid for the current state, or whether secrets are exposed through diagnostics. Language safety is one layer, not the whole product security model.\n\nSecure firmware in Rust is a lifecycle discipline. Code, hardware, build pipeline, provisioning, deployment, updates, logging, diagnostics, field support, and recovery all matter. A design that is elegant in source code can still be fragile if release artifacts are hard to trace or field recovery behavior is unclear.\n\nThe defensive goal is firmware with explicit, reviewable assumptions. Engineers should be able to explain what the firmware trusts, what it validates, what resources are bounded, how hardware is accessed, how updates are accepted or rejected, how secrets are protected, and how the device behaves when something goes wrong.",
  "narrationPoints": [
    "Firmware is long-lived software that often runs close.",
    "Rust gives firmware teams strong advantages.",
    "But secure firmware still requires defensive design.",
    "Secure firmware in Rust is a lifecycle discipline.",
    "The defensive goal is firmware with explicit.",
    "Engineers should be able to explain what the firmware."
  ]
};
