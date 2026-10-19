window.COURSE_MODULE = {
  "title": "What Cryptography Means for Python Developers",
  "graphicAlt": "A clear protection goal guides vetted tools, protected keys and reviewable application operations.",
  "narration": "Cryptography is a set of tools for protecting confidentiality, integrity, authenticity, and trust. For Python developers, it appears in web applications, APIs, data pipelines, automation scripts, background workers, command-line tools, and cloud services. It may protect traffic over the network, stored files, application secrets, user passwords, webhook messages, signed tokens, backups, or service-to-service communication. The details vary, but the core question is stable: what security property must this data or interaction have?\n\nIt helps to distinguish cryptographic primitives, protocols, libraries, configuration, and key management. A primitive is a building block, such as encryption, hashing, signing, or message authentication. A protocol combines primitives into a larger design, such as TLS for protecting data in transit. A library exposes safe APIs for developers. Configuration determines how the library or protocol behaves. Key management governs how secrets are generated, stored, rotated, revoked, and monitored. Weakness in any layer can undermine the result.\n\nMost Python developers should consume cryptography through vetted libraries and standard protocols rather than designing algorithms or assembling primitives manually. This is not because developers are not smart. It is because cryptographic systems fail in subtle ways: a reused nonce, a missing integrity check, a weak source of randomness, a disabled certificate check, or a logging mistake can turn a strong algorithm into an unsafe system.\n\nCryptography is powerful, but it is easy to misuse when the goal is vague. Before choosing a library call or enabling a setting, define the security goal. Are you protecting data from disclosure? Detecting modification? Proving who signed a message? Verifying a server? Storing passwords safely? Each goal requires different controls. Good Python cryptography starts with clear intent, mature tools, careful key handling, and reviewable operational ownership.",
  "narrationPoints": [
    "Cryptography is a set of tools for protecting.",
    "distinguish cryptographic primitives.",
    "Most Python developers should consume cryptography through.",
    "Cryptography is powerful, but it is easy to misuse.",
    "It may protect traffic over the network.",
    "The details vary."
  ]
};
