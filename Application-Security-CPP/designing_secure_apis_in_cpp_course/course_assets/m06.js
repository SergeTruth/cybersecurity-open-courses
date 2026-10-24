window.COURSE_MODULE = {
  "title": "Error Handling and Failure Semantics",
  "graphicAlt": "Failure contracts describe remaining state, cleanup responsibilities and retry expectations.",
  "narration": "Secure APIs define failure behavior as carefully as success behavior. Callers should know what happens when input is invalid, access is denied, a dependency fails, resources are exhausted, or verification does not succeed.\n\nDifferent projects use exceptions, error codes, result objects, or status types. The important part is consistency and clarity. A security-sensitive failure should not disappear into a default value that looks like success.\n\nAPIs should preserve invariants after errors. If a function updates several fields, writes a file, changes authorization state, or reserves resources, the contract should explain whether the operation is atomic, partially applied, or rolled back.\n\nPartial updates need policy. If they are allowed, callers need enough information to recover safely. If they are not allowed, the API should structure work so failure leaves the system in a predictable state.\n\nDiagnostics should help maintainers without leaking secrets or sensitive internal details. User-facing messages may be simple, while internal logs can include sanitized context. Both should avoid exposing protected values.\n\nAuthorization failures should be consistent. A caller should not learn sensitive information because one path reports too much detail while another path is silent.\n\nReview failure semantics by asking whether a caller can continue safely after each error. If the answer is not clear, the API contract needs more precision.\n\nRetry expectations should be part of the contract. Some errors are temporary, some require caller correction, and some should stop the workflow until policy or configuration changes.\n\nCleanup guarantees matter too. If an API allocates, locks, opens, registers, or reserves anything before failing, callers need to know what remains their responsibility.\n\nClear failure semantics make secure behavior easier than guessing.",
  "narrationPoints": [
    "Secure APIs define failure behavior as carefully as success behavior.",
    "The important part is consistency and clarity.",
    "If they are allowed, callers need enough information to recover safely.",
    "User-facing messages may be simple, while internal logs can include sanitized context.",
    "Retry expectations should be part of the contract.",
    "Clear failure semantics make secure behavior easier than guessing."
  ]
};
