window.COURSE_MODULE = {
  "title": "Course Summary: Secure Remote Admin Checklist",
  "graphicAlt": "Authorized scope, host verification, narrow actions and controlled rollout are supported by safe records and ongoing review.",
  "narration": "Secure remote administration in Bash is a layered practice. Start by defining authorized scope. Know which systems, environments, tasks, operators, timing, and outcomes are approved. Make boundaries visible through documentation, configuration, runtime checks, and logs.\n\nVerify hosts and validate targets. Use managed host trust, approved inventories, and allowlists. Report intended target scope before high-impact actions, and treat bastions and jump hosts as critical controls that require review.\n\nUse dedicated identities with least privilege. Protect SSH keys and other credentials, scope remote permissions and sudo rights to the job, track ownership, rotate and revoke access, and remove stale credentials or unused administrative reach.\n\nKeep remote actions narrow and reviewable. Prefer fixed remote commands or controlled scripts, validate operands, preserve argument boundaries, handle file transfer and configuration updates carefully, and verify remote state after changes.\n\nControl multi-host execution. Confirm target sets, limit concurrency, handle partial failures, favor idempotent and rerunnable actions, and roll out high-impact changes in stages rather than prioritizing speed above control.\n\nFinally, log without leaking secrets, monitor unusual behavior, review access and scripts over time, and test in realistic environments. Secure remote administration makes remote work safer and more trustworthy, not slower for its own sake.",
  "narrationPoints": [
    "Secure remote administration in Bash is a layered practice.",
    "Use managed host trust, approved inventories, and allowlists.",
    "Prefer fixed remote commands or controlled scripts, validate operands, preserve argument boundaries, handle file transfer and configuration updates carefully, and verify remote state after changes.",
    "Confirm target sets, limit concurrency, handle partial failures, favor idempotent and rerunnable actions, and roll out high-impact changes in stages rather than prioritizing speed above control.",
    "Finally, log without leaking secrets, monitor unusual behavior, review access and scripts over time, and test in realistic environments.",
    "Know which systems, environments, tasks, operators, timing, and outcomes are approved."
  ]
};
