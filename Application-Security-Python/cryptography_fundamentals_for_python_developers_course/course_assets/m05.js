window.COURSE_MODULE = {
  "title": "Hashing, MACs, and Password Hashing",
  "graphicAlt": "Hashes identify data, MACs verify shared-secret authenticity, and dedicated password hashing creates salted one-way verifiers.",
  "narration": "A cryptographic hash maps input data to a fixed-size digest in a one-way manner. Hashes can help identify data, detect accidental or unauthorized change when used appropriately, and support larger protocols. They are different from ordinary checksums, which are usually designed for error detection rather than adversarial conditions. They are also not encryption. A hash does not provide confidentiality because it does not hide the original data in a reversible form.\n\nMessage authentication codes, including HMAC concepts at a high level, combine a secret key with message data to help verify integrity and authenticity. A plain hash may show that two inputs are the same, but it does not prove who created the digest. A MAC can help a receiver verify that someone with the shared secret produced the message. This is useful for APIs, webhooks, internal messages, and integrity checks where both parties share a secret.\n\nPassword hashing is a separate category. Passwords should not be encrypted for storage because the application should not be able to recover them. Instead, it should store password verifiers created with password hashing approaches designed for slow, one-way verification. Salts help ensure that identical passwords do not produce identical stored verifiers when used correctly. Work factors and memory-hard concepts make large-scale guessing more expensive if hashes are exposed.\n\nFast general-purpose hashes are poor choices for password storage because speed helps attackers test many guesses quickly after a database exposure. Developers should not blur these tools together. Use hashes for the right integrity and identification purposes, MACs when authenticity with a shared secret is needed, and dedicated password hashing libraries for passwords. Choosing the right tool matters more than recognizing the name of a primitive.",
  "narrationPoints": [
    "A cryptographic hash maps input data to a fixed-size digest.",
    "Message authentication codes.",
    "Password hashing is a separate category.",
    "Fast general-purpose hashes are poor choices for password.",
    "A MAC can help a receiver verify that someone.",
    "Passwords should not be encrypted for storage."
  ]
};
