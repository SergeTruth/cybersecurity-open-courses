window.COURSE_MODULE = {
  "title": "Protect, Unprotect, and Purpose Strings",
  "graphicAlt": "Two purpose-specific workflow lanes use one key ring while confirmation and export payloads remain isolated.",
  "narration": "The basic consumer model starts with IDataProtectionProvider. Application code asks the provider to create an IDataProtector for a specific purpose. That protector can then protect a plaintext value into a protected payload and later unprotect that payload to validate it and recover the original value when the payload and keys are valid.\n\nPurpose strings are part of the security boundary. They isolate different consumers even when those consumers share the same underlying key ring. A payload protected for one purpose should not be readable by a protector created for a different purpose. That separation helps prevent one workflow from accidentally accepting payloads created for another workflow.\n\nPurpose names should be specific, stable, and tied to the intended workflow. A purpose such as a module name plus workflow name and payload type is easier to review than a vague shared string. The goal is to make it clear why the payload exists, which code should recover it, and whether another consumer should be separate.\n\nDo not reuse the same purpose string for unrelated data types or workflows. If a confirmation workflow, an export link, and an internal state value all share the same purpose, the application has made review harder and weakened the intended separation. Different workflows deserve different protectors.\n\nChanging purpose strings can break the ability to unprotect existing payloads. That may invalidate cookies, links, stored state, or account workflow tokens. Purpose design should be reviewed before production, and changes should be planned as compatibility events rather than casual refactors.",
  "narrationPoints": [
    "Application code asks the provider to create an IDataProtector for a specific purpose.",
    "A payload protected for one purpose should not be readable by a protector created for a different purpose.",
    "Purpose names should be specific, stable, and tied to the intended workflow.",
    "Do not reuse the same purpose string for unrelated data types or workflows.",
    "Changing purpose strings can break the ability to unprotect existing payloads."
  ]
};
