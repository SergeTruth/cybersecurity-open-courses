window.COURSE_MODULE = {
  "title": "Rotation, Versioning, and Envelope Encryption",
  "graphicAlt": "A versioned transition validates key retirement; envelope encryption separates wrapping a data key from protecting data.",
  "narration": "Rotation limits damage from exposed, stale, overused, or broadly shared keys. But rotation is not just a policy statement. It is an engineering capability that has to work before an emergency. A team that has never rotated a JWT signing key, HMAC webhook secret, database encryption key, or service credential may discover during an incident that rotation breaks production.\n\nSome keys can be rotated by issuing a new key and invalidating the old one. Others require staged rollout. Verifiers may need to accept both old and new signing keys during a transition. Encrypted records may need key identifiers or version metadata so the application can choose the right decryption key. Old keys may need a controlled decrypt-only period before retirement.\n\nEnvelope encryption can make rotation more practical. Data encryption keys protect data. Key encryption keys protect those data keys. Rotating a key encryption key may involve rewrapping data keys instead of re-encrypting every record. This can reduce operational pain while still supporting separation by record, tenant, service, or purpose. The pattern still needs metadata, ownership, audit, and recovery rules.\n\nRotation should include validation that old keys no longer grant unintended access. That may mean checking expired JWT signing keys, retired webhook secrets, invalidated API keys, old object-storage credentials, or data keys after rewrap. Revocation should be explicit when compromise is suspected. The question is not whether rotation is written in a policy; the question is whether the team can execute it safely under pressure.",
  "narrationPoints": [
    "A team that has never rotated a JWT signing key, HMAC webhook secret, database encryption key, or service credential may discover during an incident that rotation breaks production.",
    "Some keys can be rotated by issuing a new key and invalidating the old one.",
    "Rotating a key encryption key may involve rewrapping data keys instead of re-encrypting every record.",
    "That may mean checking expired JWT signing keys, retired webhook secrets, invalidated API keys, old object-storage credentials, or data keys after rewrap.",
    "Rotation should include validation that old keys no longer grant unintended access.",
    "Rotation limits damage from exposed, stale, overused, or broadly shared keys."
  ]
};
