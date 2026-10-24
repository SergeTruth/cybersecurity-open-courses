window.COURSE_MODULE = {
  "title": "Course Summary: SSH Key Management Checklist",
  "graphicAlt": "Known purpose, protected private keys, scoped remote access and verified hosts are supported by rotation and continuing review.",
  "narration": "SSH key management in Bash is a repeatable engineering habit. Know what each key is for and who owns it. A key should have a purpose, scope, environment, allowed systems, and review path. If nobody can explain why a key exists or where it is installed, the key is already creating operational risk.\n\nProtect private keys with controlled storage, restrictive permissions, and appropriate runtime handling. Avoid repositories, shared folders, tickets, images, artifacts, copied workspaces, and casual backups. Use passphrases where they fit the workflow, and use compensating controls for unattended automation. Make Bash invocation explicit so the intended key is used for the intended target.\n\nScope remote access to the job. Review authorized_keys files and platform key stores deliberately. Match accounts to workflows, avoid broad administrative access for narrow tasks, and remove stale public keys. Verify hosts instead of bypassing trust checks, and manage known_hosts or host trust information as part of automation design rather than treating it as an afterthought.\n\nFinally, treat CI/CD runners, containers, workspaces, artifacts, and agent behavior as exposure paths. Separate production keys from lower environments, scope deploy keys carefully, and clean up temporary key material. Rotate, revoke, monitor, and review keys over time so working automation does not become forgotten access. The goal is SSH access that is intentional, scoped, protected, verifiable, monitored, and replaceable.",
  "narrationPoints": [
    "SSH key management in Bash is a repeatable engineering habit.",
    "Protect private keys with controlled storage, restrictive permissions, and appropriate runtime handling.",
    "Review authorized_keys files and platform key stores deliberately.",
    "Finally, treat CI/CD runners, containers, workspaces, artifacts, and agent behavior as exposure paths.",
    "Know what each key is for and who owns it.",
    "A key should have a purpose, scope, environment, allowed systems, and review path."
  ]
};
