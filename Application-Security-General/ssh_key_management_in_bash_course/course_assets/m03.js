window.COURSE_MODULE = {
  "title": "Key Generation, Storage, and File Permissions",
  "graphicAlt": "An approved private key is held in restricted storage and a protected workspace, with repositories and casual copies excluded.",
  "narration": "SSH keys should be created through approved processes and stored in controlled locations. The creation process should define the key's owner, purpose, environment, expected lifetime, and storage location. A key created casually for one task can easily become a hidden dependency if nobody documents why it exists or what it can access.\n\nPrivate keys need restrictive ownership and file permissions. They should not be placed in shared directories, repositories, artifacts, email threads, tickets, public images, or casual backups. Parent directories matter too. A private key stored in a file with narrow permissions may still be exposed if the surrounding workspace is copied, cached, archived, or made readable to more users or processes than intended.\n\nPassphrases may be appropriate for human-operated keys because they add protection if the private key file is copied. Automation keys often need a different balance because fully unattended workflows cannot rely on an operator typing a passphrase. In those cases, compensating controls matter: tight remote scope, controlled secret storage, restricted runtime identity, monitoring, rotation, and clear ownership.\n\nEndpoint and workspace protection also matter. A well-scoped key can still be exposed from a workstation, build runner, container layer, or service account home directory. Bash scripts should check that required keys are available without printing their contents or dumping sensitive context. The script should fail clearly when a key is missing or unusable, but it should not turn troubleshooting into disclosure.",
  "narrationPoints": [
    "SSH keys should be created through approved processes and stored in controlled locations.",
    "Private keys need restrictive ownership and file permissions.",
    "Passphrases may be appropriate for human-operated keys because they add protection if the private key file is copied.",
    "A well-scoped key can still be exposed from a workstation, build runner, container layer, or service account home directory.",
    "The creation process should define the key's owner, purpose, environment, expected lifetime, and storage location.",
    "A key created casually for one task can easily become a hidden dependency if nobody documents why it exists or what it can access."
  ]
};
