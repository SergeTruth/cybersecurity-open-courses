window.COURSE_MODULE = {
  "title": "Key Management Basics",
  "graphicAlt": "Draft visual summary for Key Management Basics",
  "narration": "Keys are high-value secrets because they control the meaning of cryptographic operations. A strong algorithm cannot compensate for a key that is generated poorly, stored casually, shared too broadly, logged, reused for unrelated purposes, or kept long after it should be retired. Key management is central to cryptographic security.\n\nKey generation should use approved mechanisms. That may mean a cryptographic library, operating system facility, hardware-backed store, key management service, or organization-approved provisioning process. The application should not invent key generation rules or derive keys from convenient strings without a reviewed key-derivation design.\n\nSeparate keys by purpose and scope. A key used for encrypting stored records should not casually become a signing key, transport key, test key, backup key, or environment-wide key. Purpose separation makes review easier and limits the impact of mistakes. Scope should also be clear: development, test, staging, and production should not accidentally share secrets.\n\nStorage and access control need design. Keys may live in files, environment configuration, platform stores, hardware modules, process memory, or service-managed vaults. Each location has access-control, backup, audit, and deployment implications. In-memory exposure also matters, especially for long-running native processes that handle sensitive material directly.\n\nLogging discipline is non-negotiable. Keys, derived secrets, seed material, password-equivalent values, and sensitive intermediate values should not appear in logs, crash reports, metrics labels, support bundles, or debug output. Error messages should describe categories without dumping secret material.\n\nFinally, keys have a lifecycle. Plan generation, distribution, use, rotation, revocation at a high level, backup where appropriate, and retirement. Teams should know how a key is replaced before an emergency forces rushed operational decisions. A key lifecycle that is written down can be tested and reviewed.",
  "narrationPoints": [
    "Keys are high-value secrets.",
    "Key generation should use approved mechanisms.",
    "Separate keys by purpose and scope.",
    "Storage and access control need design.",
    "Logging discipline is non-negotiable.",
    "Finally, keys have a lifecycle."
  ]
};
