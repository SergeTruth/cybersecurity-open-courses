window.COURSE_MODULE = {
  "title": "Host Trust and Verification",
  "graphicAlt": "Managed host records support server identity comparison, and a changed key requires review before remote work proceeds.",
  "narration": "SSH trust is not only about proving the user to the server. It is also about helping the client recognize the server. Host keys support that decision. When the client has a trusted record for the server, it can detect when the presented host identity is unexpected.\n\nIn interactive use, a person may see a host key prompt or warning and decide what to do. In automation, there may be no human present. The job either proceeds, fails, or follows whatever trust behavior was scripted. That makes known-hosts management a core part of secure SSH automation.\n\nSecure Bash automation should avoid casual trust bypasses. Disabling verification may make a job easier to run, especially in a temporary environment, but it weakens the trust boundary the automation depends on. A remote deployment job should not have to guess whether it reached the expected server.\n\nManaged trust can take several operational forms. Teams may provision known host entries, maintain host key inventories, separate environment-specific host trust, and document how host key rotation is handled. The exact process can vary, but the trust decision should be deliberate rather than an accidental side effect of whoever ran the script first.\n\nHost key changes should be treated as events that require review. Some changes are normal, such as planned rebuilds or rotations. Others may indicate a misroute, DNS issue, environment mix-up, or unauthorized system change. Automation should make those events visible instead of smoothing them over silently.",
  "narrationPoints": [
    "SSH trust is not only about proving the user to the server.",
    "In interactive use, a person may see a host key prompt or warning and decide what to do.",
    "Secure Bash automation should avoid casual trust bypasses.",
    "Teams may provision known host entries, maintain host key inventories, separate environment-specific host trust, and document how host key rotation is handled.",
    "Host key changes should be treated as events that require review.",
    "When the client has a trusted record for the server, it can detect when the presented host identity is unexpected."
  ]
};
