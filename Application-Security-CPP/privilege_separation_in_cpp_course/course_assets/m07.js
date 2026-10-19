window.COURSE_MODULE = {
  "title": "Secrets, Credentials, and Sensitive Handles",
  "graphicAlt": "A protected component uses sensitive material internally for authorized operations and returns only permitted results.",
  "narration": "Privilege separation often protects secrets and sensitive handles. A high-authority component may have access to private keys, certificates, tokens, platform credential stores, service accounts, installation credentials, device handles, or administrative APIs. The low-privilege side should not receive broad access to these values simply because it initiated a workflow.\n\nA safer pattern is to request narrow operations that use the sensitive value internally. For example, a client can ask a trusted component to sign, decrypt, install, unlock, or update through a defined command, while the secret remains inside the component that is designed to hold it. The caller receives only the result it is authorized to see.\n\nLogs, crash reports, support bundles, debug output, IPC traces, and error messages must avoid exposing sensitive values. Diagnostic detail should identify the operation category and safe status, not the secret material or handle value. This is especially important for privileged helpers because their logs may be collected during operational incidents.\n\nRotation, revocation, and cleanup workflows are part of the design. Teams should know how secrets are replaced, how old material is retired, how handles are closed, and how failure is reported. Sensitive runtime material should not linger longer than needed, and ownership should be clear enough for incident response.\n\nReviewers should ask whether each component has only the secret access it needs. If a broad handle or credential is passed around for convenience, the architecture may be making future defects more expensive than necessary.",
  "narrationPoints": [
    "The low-privilege side should not receive broad access to these values simply because it initiated a workflow.",
    "A safer pattern is to request narrow operations that use the sensitive value internally.",
    "Logs, crash reports, support bundles, debug output, IPC traces, and error messages must avoid exposing sensitive values.",
    "Diagnostic detail should identify the operation category and safe status, not the secret material or handle value.",
    "Teams should know how secrets are replaced, how old material is retired, how handles are closed, and how failure is reported.",
    "Reviewers should ask whether each component has only the secret access it needs."
  ]
};
