window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Reviewable cryptography links clear goals, established tools, protected keys, validation and lifecycle ownership.",
  "narration": "Cryptography helps Python applications protect confidentiality, integrity, authenticity, and trust when it is tied to a clear security goal. It appears in data storage, network communication, password storage, API messages, webhooks, signed tokens, backups, service authentication, and software delivery. It is not one feature. It is a collection of tools, protocols, libraries, configuration choices, and operational responsibilities.\n\nStrong crypto use depends on threat modeling, vetted libraries, secure randomness, safe key management, authenticated encryption, correct password hashing, TLS validation, signature verification, and operational monitoring. The same algorithm may be safe or unsafe depending on how it is used, where keys live, whether validation is enabled, and how errors and rotation are handled. Names alone are not enough.\n\nMost Python developers should not design cryptographic primitives or protocols. They should use mature libraries, high-level APIs, standard protocols, and provider guidance. They should avoid hardcoded keys, custom ciphers, obsolete examples, disabled certificate verification, fast password hashes, unsigned token trust, and logging of secrets. Review should focus on goals, boundaries, keys, validation, and lifecycle.\n\nThe goal is not to memorize algorithms. The goal is to make safe, reviewable, maintainable cryptographic decisions that match the application's risk. Good cryptography work is practical engineering: define the goal, choose the right established tool, protect the keys, validate before trusting, log safely, test negative paths, plan rotation, and assign operational ownership before something breaks.",
  "narrationPoints": [
    "Cryptography helps Python applications protect.",
    "Strong crypto use depends on threat modeling.",
    "Most Python developers should not design cryptographic.",
    "The goal is not to memorize algorithms.",
    "They should use mature libraries.",
    "They should avoid hardcoded keys."
  ]
};
