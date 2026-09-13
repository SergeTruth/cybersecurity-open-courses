window.COURSE_MODULE = {
  "title": "Secrets, Device Identity, and Sensitive Data",
  "graphicAlt": "Device secrets use controlled provisioning and storage, limited runtime access, lifecycle replacement, and diagnostic redaction.",
  "narration": "Firmware may contain or access device identities, keys, credentials, certificates, pairing material, manufacturing data, calibration values, configuration secrets, or service tokens. These values often determine whether a device can identify itself, join a service, receive updates, or access protected functionality.\n\nRust ownership helps make sensitive data flow easier to review. A type can show where a value is introduced, which component owns it, and how it is passed. But ownership alone does not protect storage, erase secrets, prevent diagnostic leakage, or define replacement procedures. Those are product design responsibilities.\n\nProvisioning and secure storage need explicit design. Teams should know where secrets enter the device, whether hardware-backed storage is available, which firmware components can access sensitive material, how manufacturing and service tools handle it, and what happens if a device needs credential replacement.\n\nDebug output, logs, crash reports, diagnostic dumps, and field-support tools are possible exposure paths. They should avoid keys, tokens, private configuration, sensitive identifiers, raw buffers that may contain secrets, and excessive internal state. Redaction should be designed before release, not bolted on after a review surprise.\n\nProduction firmware should avoid hard-coded production secrets and should plan for rotation, replacement, revocation, and retirement where appropriate. Device identity is not only a variable in code; it is part of an operational lifecycle shared by engineering, manufacturing, support, and security.",
  "narrationPoints": [
    "Firmware may contain or access device identities.",
    "Rust ownership helps make sensitive data flow easier.",
    "Provisioning and secure storage need explicit design.",
    "Debug output, logs, crash reports, diagnostic dumps,.",
    "Production firmware should avoid hard-coded production.",
    "But ownership alone does not protect storage."
  ]
};
