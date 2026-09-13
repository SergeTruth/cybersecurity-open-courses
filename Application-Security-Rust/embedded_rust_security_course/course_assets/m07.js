window.COURSE_MODULE = {
  "title": "Secrets, Device Identity, and Secure Storage",
  "graphicAlt": "Device identity requires provisioning, protected storage, rotation, retirement handling, and redacted diagnostics.",
  "narration": "Embedded systems may store device credentials, manufacturing data, keys, certificates, pairing material, calibration data, configuration secrets, or service tokens. These values often affect identity, access, updates, diagnostics, and communication with other systems.\n\nRust lifetimes and ownership can help make sensitive data flow easier to review. A type can make clear where a secret enters the system, which component owns it, where it may be borrowed, and when it should no longer be used. But ownership alone does not erase secrets, protect storage, or prevent disclosure through debug paths.\n\nTeams need clear policies for where secrets are provisioned, where they are stored, whether hardware-backed storage is available, who can access them, how credentials are rotated or replaced, and what happens when a device is serviced, transferred, or retired. These decisions belong in the firmware lifecycle, not only in code comments.\n\nDebug output, logs, crash data, diagnostics, manufacturing tools, and field-support scripts are exposure paths. They should avoid printing keys, tokens, private configuration, sensitive identifiers, or raw buffers that may contain secrets. Redaction should be designed, not added only after a release review finds a problem.\n\nDefensive embedded Rust avoids hard-coded production secrets and plans for replacement. Device identity and credential handling should be documented enough that engineering, manufacturing, support, and security teams understand how sensitive material is introduced, protected, updated, and removed.",
  "narrationPoints": [
    "Embedded systems may store device credentials.",
    "Rust lifetimes and ownership can help make sensitive data.",
    "Teams need clear policies.",
    "Debug output, logs, crash data, diagnostics, manufacturing.",
    "Defensive embedded Rust avoids hard-coded production.",
    "But ownership alone does not erase secrets."
  ]
};
