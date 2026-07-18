window.COURSE_MODULE = {
  "title": "Hashes, MACs, and Password Storage",
  "graphicAlt": "Draft visual summary for Hashes, MACs, and Password Storage",
  "narration": "Cryptographic hashes turn input into fixed-size output in a way that supports integrity checks, identifiers, and content addressing when used correctly. They are useful, but they are not secret by themselves. If anyone can compute the same hash over the same input, the hash does not prove that the data came from a trusted party.\n\nA message authentication code, or MAC, adds a secret key to the integrity decision. Parties that share the relevant secret can verify that data was produced by someone with that key and was not changed under the assumptions of the chosen primitive. MAC keys should be generated, stored, scoped, and rotated like other cryptographic keys.\n\nPassword storage is a different problem. Ordinary fast hashes are built to be efficient, which is not the goal for stored password verification. Password storage should use purpose-built password hashing with salts and work factors or equivalent cost settings according to current organizational guidance.\n\nSalts make stored password records unique even when users choose the same password. They do not need to be secret in the same way as keys, but they do need correct generation and storage. Work factors slow offline guessing at a defensive level and should be reviewed as hardware and organizational requirements change.\n\nDo not choose primitives by habit. A hash, MAC, password hash, digital signature, and encryption mode solve different problems. Using the wrong primitive can produce output that looks cryptographic but does not provide the intended security property.\n\nReviewers should ask what property each operation is meant to provide. Is the goal public integrity, keyed integrity, password verification, object identity, or something else? The primitive, key handling, salt behavior, return-value checks, and storage format should match that answer.",
  "narrationPoints": [
    "Cryptographic hashes turn input into fixed-size output.",
    "A message authentication code.",
    "Password storage is a different problem.",
    "Salts make stored password records unique even.",
    "Do not choose primitives by habit.",
    "Reviewers should ask what property each operation is meant."
  ]
};
