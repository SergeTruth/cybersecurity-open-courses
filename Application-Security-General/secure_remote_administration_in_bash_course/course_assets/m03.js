window.COURSE_MODULE = {
  "title": "Identity, SSH Keys, and Access Control",
  "graphicAlt": "A dedicated identity has narrow permissions, protected credentials and an explicit rotation and revocation lifecycle.",
  "narration": "Every remote administration workflow uses an identity. That identity may be a personal account, service account, SSH key, deployment credential, privileged role, or managed access path. The identity determines attribution, authorization, and the impact of mistakes.\n\nA shared overpowered credential is difficult to govern. It is hard to attribute actions, hard to scope to one workflow, hard to rotate without breaking unrelated jobs, and hard to revoke during an incident. Dedicated identities with clear purpose and ownership are easier to manage.\n\nPrivate keys and other credentials should be protected throughout their lifecycle. Storage location, file permissions, secret management, passphrase strategy, agent behavior, CI/CD injection, and workstation handling all shape risk. Credentials should not drift into scripts, logs, support bundles, or shared folders.\n\nRemote permissions should match the job. A script that only collects diagnostics does not need broad write privileges. A deployment identity may need a narrow set of target actions, not general administrative power. Sudo rules and command restrictions should be reviewed at a defensive level and aligned to the workflow.\n\nKey inventory, rotation, and revocation are operational controls. Teams should know who owns a key, what it is for, where it is authorized, when it was last reviewed, and how to remove it. Stale keys and unclear authorized-key entries are signs that remote administration access is becoming unmanaged.\n\nLeast privilege does not make mistakes impossible, but it limits impact. When an unexpected target, malformed input, or script bug occurs, scoped access can prevent a routine issue from becoming a wider operational event.",
  "narrationPoints": [
    "The identity determines attribution, authorization, and the impact of mistakes.",
    "A shared overpowered credential is difficult to govern.",
    "Private keys and other credentials should be protected throughout their lifecycle.",
    "A script that only collects diagnostics does not need broad write privileges.",
    "Key inventory, rotation, and revocation are operational controls.",
    "Least privilege does not make mistakes impossible, but it limits impact."
  ]
};
