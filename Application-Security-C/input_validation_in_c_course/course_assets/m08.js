window.COURSE_MODULE = {
  "title": "Safe Error Handling and Rejection",
  "graphicAlt": "Input is staged temporarily and committed only after full validation; rejection preserves live state and requires cleanup and safe reporting.",
  "narration": "Validation failure should produce predictable behavior. Fail-closed behavior means the program rejects input and avoids unsafe continuation when validation does not succeed. The code should not keep processing a value simply because a later layer might catch the problem.\n\nAvoid partial state updates on invalid input. If a parser updates configuration, modifies an object, allocates resources, or writes records before validation is complete, a failure can leave the program in an inconsistent state. A safer pattern validates into temporary state and commits only after the full contract is satisfied.\n\nTemporary resources should be cleaned up on rejection. Buffers, parsed fields, dynamic objects, file handles, and intermediate records should have clear ownership during validation. Failure paths deserve the same cleanup review as success paths.\n\nError reporting should be useful but safe. Logs can record source, field name, failure category, length range, or validation rule without copying secrets, raw sensitive values, or large untrusted text. User-facing messages should avoid unnecessary internal details while still making the failure understandable enough for normal operation.\n\nMost importantly, invalid data should not continue deeper into the program under a warning-only model unless the contract explicitly supports that. Once validation fails, later code should not have to defend against the rejected representation as if it were still usable.",
  "narrationPoints": [
    "Fail-closed behavior means the program rejects input and avoids unsafe continuation when validation does not succeed.",
    "If a parser updates configuration, modifies an object, allocates resources, or writes records before validation is complete.",
    "Buffers, parsed fields, dynamic objects, file handles, and intermediate records should have clear ownership during validation.",
    "Logs can record source, field name, failure category, length range, or validation rule without copying secrets.",
    "Once validation fails, later code should not have to defend against the rejected representation as if it were still usable."
  ]
};
