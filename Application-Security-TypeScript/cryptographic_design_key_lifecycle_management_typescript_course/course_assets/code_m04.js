window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Password and key-derivation APIs below are conceptual application adapters. Configure them using a maintained library and deployment-appropriate parameters; these are not exact APIs from Argon2, scrypt, or another package.",
  "codeExamples": [
    {
      "title": "Let the password verifier own salt and parameter handling",
      "language": "typescript",
      "blurb": "hash uses an approved expensive password-hashing construction and generates a fresh salt. The encoded verifier includes algorithm/version, salt, and work parameters. verify performs the library's supported verification, with bounded costs. Account updates must use appropriate concurrency and authentication policy.",
      "code": "const encodedVerifier = await passwordService.hash(password);\nawait accounts.storeVerifier(accountId, encodedVerifier);\n\nconst result = await passwordService.verify(password, storedVerifier);\nif (!result.valid) throw new InvalidCredentials();\nif (result.needsUpgrade) {\n  const upgraded = await passwordService.hash(password);\n  await accounts.replaceVerifierIfUnchanged(\n    accountId, storedVerifier, upgraded\n  );\n}\n// Neither salt nor encoding makes SHA-256 alone a password hasher."
    },
    {
      "title": "Separate derivation roles",
      "language": "typescript",
      "blurb": "deriveFromStrongRoot uses an approved general KDF such as HKDF with stable, distinct context encoding. Its root must already be strong secret material. The password-derived-key path requires a separate expensive password KDF; HKDF does not supply that cost.",
      "code": "const encryptionKey = await keyDerivation.deriveFromStrongRoot({\n  rootHandle,\n  purpose: \"record-encryption\",\n  environment: \"production\"\n});\n\nconst messageKey = await keyDerivation.deriveFromStrongRoot({\n  rootHandle,\n  purpose: \"message-authentication\",\n  environment: \"production\"\n});\n// Distinct purposes produce distinct subkeys in the reviewed scheme.\n// Do not substitute a human password for rootHandle's strong secret."
    }
  ]
};
