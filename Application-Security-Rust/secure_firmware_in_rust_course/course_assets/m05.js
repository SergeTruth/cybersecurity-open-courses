window.COURSE_MODULE = {
  "title": "Boot Integrity and Firmware Update Safety",
  "graphicAlt": "Firmware is staged and verified before activation, with rejection, known-good recovery, version policy, and release traceability.",
  "narration": "Firmware integrity begins before the application runs and continues through every update. Teams should define what code is trusted at boot, what metadata is required, how firmware authenticity and integrity are checked, and what happens when validation fails. These decisions should be written as requirements, not left as assumptions inside implementation details.\n\nUpdate safety is more than a cryptography topic. It is also state management, reliability, compatibility, release control, and operational planning. A device may lose power, receive an incompatible package, encounter storage problems, or need to recover from an interrupted update. The update design should define safe behavior for those cases before field deployment.\n\nRollback policy should be intentional. Recovery may require returning to a known-good version, while some products also need to avoid accepting older firmware that no longer meets security requirements. The policy should match product risk, service needs, and support expectations, and it should be reviewable by engineering and security teams.\n\nUpdate logic should avoid ambiguous states. The device should know whether it is running the current image, staging an update, validating an image, recovering from a failure, or reporting a version. Support teams need enough evidence to understand what happened without exposing sensitive implementation details.\n\nRelease evidence matters. Artifacts should be traceable to source, configuration, toolchain, approval, signing material handling, and release notes. Secure firmware update design depends on knowing not only that an image was accepted, but also where it came from and why it was approved for deployment.",
  "narrationPoints": [
    "Firmware integrity begins.",
    "Update safety is more than a cryptography topic.",
    "Rollback policy should be intentional.",
    "Update logic should avoid ambiguous states.",
    "Release evidence matters.",
    "These decisions should be written as requirements."
  ]
};
