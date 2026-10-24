window.COURSE_MODULE = {
  "title": "Choosing Between SCP, SFTP, and rsync",
  "graphicAlt": "Simple copying, controlled transfer and incremental synchronization are compared as different workflow needs.",
  "narration": "Secure design starts with choosing the right tool for the workflow. SCP is often used for straightforward file copying. SFTP-style workflows may be preferred when a controlled file-transfer interface is the right operational model. rsync is useful when synchronization, comparison, and efficient incremental transfer matter.\n\nA single-file copy, a directory tree sync, a release artifact promotion, and a backup mirror are different jobs. They may have different requirements for metadata preservation, bandwidth efficiency, repeatability, partial-transfer behavior, delete behavior, and recovery. Choosing by habit can hide those differences.\n\nrsync is powerful because it can compare source and destination state and transfer only what changed. That is useful, but synchronization is more than copying. It may preserve or change metadata, skip or include files according to rules, and optionally remove data from the destination. Those behaviors need review before production use.\n\nSCP can be simpler for a known file or small controlled set of files. Simplicity can be a security advantage when the workflow is truly simple. But even simple copy workflows still need host verification, dedicated identities, path validation, and result checking.\n\nThe defensive habit is to write down what the transfer must accomplish. Are you copying, synchronizing, preserving attributes, replacing an existing release, or collecting evidence? Once the workflow is clear, choose the simplest safe tool and verify its behavior instead of assuming all transfer commands are interchangeable.",
  "narrationPoints": [
    "Secure design starts with choosing the right tool for the workflow.",
    "A single-file copy, a directory tree sync, a release artifact promotion, and a backup mirror are different jobs.",
    "rsync is powerful because it can compare source and destination state and transfer only what changed.",
    "SCP can be simpler for a known file or small controlled set of files.",
    "The defensive habit is to write down what the transfer must accomplish.",
    "SCP is often used for straightforward file copying."
  ]
};
