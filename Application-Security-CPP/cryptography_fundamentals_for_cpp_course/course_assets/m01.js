window.COURSE_MODULE = {
  "title": "Cryptography as an Engineering Boundary",
  "graphicAlt": "Trust-boundary diagram placing reviewed cryptographic libraries between application data, keys, attackers, and persistent storage.",
  "narration": "Cryptography is an engineering control, not a magic layer placed on top of an application at the end. It supports specific security goals such as confidentiality, integrity, authenticity, and trust decisions.\n\nThe first question is always what boundary the design is trying to protect. Stored data may need confidentiality at rest. A software update may need authenticity. A message between services may need integrity and origin assurance. A connection may need identity verification before sensitive data is exchanged.\n\nStrong algorithms are only one part of the system. The program still needs correct keys, correct library use, validated inputs and outputs, clear error handling, and safe behavior when verification fails.\n\nIn C++ systems, cryptography often appears around data storage, communication, update validation, message authentication, license or identity checks, and integration with platform trust stores. Each use should be tied to a concrete security decision.\n\nThe hard part is usually not the mathematics. It is choosing an approved library, using the right primitive for the goal, protecting keys, managing randomness and nonces, and making failure paths predictable.\n\nA healthy crypto boundary is small and reviewable. Reviewers should be able to answer what is protected, what is trusted, what key material is involved, and what the application does when validation fails.\n\nThat engineering discipline keeps cryptography connected to the real system it is supposed to protect.\n\nIt also prevents teams from treating crypto as decoration instead of a control with inputs, outputs, owners, and operational responsibilities.",
  "narrationPoints": [
    "Cryptography is an engineering control, not a magic layer placed on top of an application at the end.",
    "Stored data may need confidentiality at rest.",
    "Strong algorithms are only one part of the system.",
    "Each use should be tied to a concrete security decision.",
    "A healthy crypto boundary is small and reviewable.",
    "It also prevents teams from treating crypto as decoration instead of a control with inputs, outputs, owners, and operational responsibilities."
  ]
};
