window.COURSE_MODULE = {
  "title": "Permissions and Access Control",
  "graphicAlt": "File settings, process and platform behavior, and directory controls combine to determine effective least-privileged access.",
  "narration": "Temporary files should use least privilege. Grant only the access required by the creating process and any intended consumer. If no other user or component needs the file, the default design should keep access narrow.\n\nFile modes and platform access controls should be reviewed together. The creation API, requested mode, process umask, inherited permissions, and directory behavior can all affect the resulting access. A code review should verify the effective permission model, not only the literal mode value in one call.\n\nDirectory permissions matter as much as file permissions. A restrictive file inside a poorly controlled directory may still be exposed to unwanted observation or interference through directory-level behavior. The directory should match the trust assumptions of the file being created.\n\nShared-directory behavior deserves special care. Code should validate who can create entries, who can remove entries, who can read names, and who can replace or modify content. Those questions are especially important for service accounts, build agents, and multi-user systems.\n\nPermissions are not only about secrecy. They also protect integrity. A temporary file that drives a later decision should not be writable by components that are not part of the intended workflow. Least privilege helps ensure that temporary content remains tied to the code that owns it.",
  "narrationPoints": [
    "Grant only the access required by the creating process and any intended consumer.",
    "A code review should verify the effective permission model, not only the literal mode value in one call.",
    "The directory should match the trust assumptions of the file being created.",
    "Code should validate who can create entries, who can remove entries, who can read names, and who can replace or modify content.",
    "A temporary file that drives a later decision should not be writable by components that are not part of the intended workflow."
  ]
};
