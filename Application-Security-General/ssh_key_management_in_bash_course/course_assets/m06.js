window.COURSE_MODULE = {
  "title": "Host Keys, known_hosts, and Server Trust",
  "graphicAlt": "Managed host records verify server and bastion identity, while changed host keys pause for operational review.",
  "narration": "User keys and service keys authenticate the client, but host keys help the client verify the server. Secure SSH automation needs both sides of trust. The script should know which identity it is using, and it should also have a reliable way to confirm which server it is reaching. If server trust is ignored, the automation may send sensitive operations to an endpoint it has not properly verified.\n\nknown_hosts management should be deliberate, especially in CI/CD, containers, ephemeral runners, and newly provisioned environments. A known_hosts file or equivalent host trust process should reflect approved server identity information. It should not be treated as an annoying obstacle to be disabled whenever automation is inconvenient. Bypassing host verification weakens the client's ability to confirm that it reached the intended server.\n\nHost key changes should be investigated through approved operational channels rather than ignored. A change may be legitimate after a rebuild, migration, or rotation, but the script should not decide that on its own by simply accepting any new identity. Teams should have a way to update host trust information safely and record why the change was expected.\n\nBastions and jump hosts can centralize access and reduce direct exposure, but they also become critical trust and control points. Their host keys, access policies, logging, and operational ownership matter. Secure SSH key management includes both sides of the connection: who the script is, and which server or control point the script believes it is reaching.",
  "narrationPoints": [
    "User keys and service keys authenticate the client, but host keys help the client verify the server.",
    "known_hosts management should be deliberate, especially in CI/CD, containers, ephemeral runners, and newly provisioned environments.",
    "Host key changes should be investigated through approved operational channels rather than ignored.",
    "Bastions and jump hosts can centralize access and reduce direct exposure, but they also become critical trust and control points.",
    "Secure SSH automation needs both sides of trust.",
    "The script should know which identity it is using, and it should also have a reliable way to confirm which server it is reaching."
  ]
};
