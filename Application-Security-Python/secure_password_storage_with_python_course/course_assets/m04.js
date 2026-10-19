window.COURSE_MODULE = {
  "title": "Salts, Peppers, and Secret Handling",
  "graphicAlt": "Salts stay with verifiers while an optional pepper requires separately protected access and operations.",
  "narration": "Salts and peppers serve different purposes. A salt is unique per password and is normally stored with the hash. Its job is to make each stored verifier unique even when users choose the same password. A pepper, at a high level, is a shared secret sometimes used in addition to salts and password hashes. A pepper is treated as an application secret and should not be stored in the same public database table as the hashes it protects.\n\nA pepper may be considered when the architecture can protect a separate secret more strongly than the password database. For example, the application may be able to store a pepper-like secret in a secret manager or protected environment where database readers do not have access. The benefit depends on separation of access. If the same system, logs, backups, or operators expose both the hashes and the pepper, the extra protection may be much weaker than expected.\n\nPepper-like secrets add operational complexity. They require secure storage, access control, environment separation, rotation planning, recovery procedures, deployment coordination, and incident response decisions. Rotation can be difficult because changing the secret may affect verification of existing password hashes. That complexity can be justified in some environments, but it should be intentional and documented rather than added as a vague extra layer.\n\nPeppers do not replace strong password hashing, per-password salts, secure application design, or abuse monitoring. A weak hash plus a pepper is not a mature password storage design. Secret handling should also cover configuration, environment variables, deployment systems, logs, and backups. The safest pattern is layered: vetted hashing, unique salts, appropriate cost, protected secrets where used, careful logging, and clear operational ownership.",
  "narrationPoints": [
    "Salts and peppers serve different purposes.",
    "A pepper may be considered.",
    "Pepper-like secrets add operational complexity.",
    "Peppers do not replace strong password hashing.",
    "Secret handling should also cover configuration.",
    "A pepper is treated as an application secret and should not."
  ]
};
