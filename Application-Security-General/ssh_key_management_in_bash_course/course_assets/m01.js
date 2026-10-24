window.COURSE_MODULE = {
  "title": "Why SSH Key Management Matters in Bash",
  "graphicAlt": "A protected private key has an owner, purpose, scoped remote access and managed lifecycle.",
  "narration": "Bash scripts often use SSH keys to connect to servers, copy files, synchronize directories, fetch repositories, deploy applications, run maintenance tasks, or collect diagnostics. A script may look like ordinary operational glue, but the private key it uses can represent real access to infrastructure, source code, data, and production workflows.\n\nAn SSH private key is not just a file. It is a credential. If the matching public key is authorized on a remote account or platform, the private key can allow authentication as that account. That means key exposure can create durable access risk, especially when the key is long-lived, reused across environments, or tied to a powerful account.\n\nConvenience decisions can spread SSH key risk quietly. A key copied into a shared folder, committed to a repository, baked into an image, left in a CI/CD workspace, attached to a ticket, or reused across unrelated jobs may keep working long after the original script was forgotten. The more places a key appears, the harder it becomes to know who can use it, what it can reach, and how to remove it safely.\n\nSecure SSH key management keeps key purpose, storage, use, and lifecycle intentional. Each key should have an owner, a reason to exist, a defined scope, protected storage, controlled runtime use, and a plan for rotation or revocation. The goal is not to avoid SSH automation. The goal is to make SSH automation trustworthy, reviewable, and limited to the access it actually needs.",
  "narrationPoints": [
    "Bash scripts often use SSH keys to connect to servers, copy files, synchronize directories, fetch repositories, deploy applications, run maintenance tasks, or collect diagnostics.",
    "An SSH private key is not just a file.",
    "Convenience decisions can spread SSH key risk quietly.",
    "Secure SSH key management keeps key purpose, storage, use, and lifecycle intentional.",
    "A script may look like ordinary operational glue, but the private key it uses can represent real access to infrastructure, source code, data, and production workflows.",
    "If the matching public key is authorized on a remote account or platform, the private key can allow authentication as that account."
  ]
};
