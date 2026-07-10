window.COURSE_MODULE = {
  "title": "Allow Lists and Deny Lists",
  "graphicAlt": "Blank placeholder graphic for allow-list and deny-list validation",
  "narration": "Allow-list validation defines what is acceptable and rejects everything else. For many fields, this is the strongest approach. If a status can only be pending, approved, or rejected, the application should allow only those values. If a field should be a positive integer below a known maximum, the validation should enforce that. The rule is grounded in expected behavior rather than known attack strings.\n\nDeny-list validation tries to block specific bad patterns. Deny lists can be useful as supporting controls, such as blocking obviously dangerous file extensions or known abusive inputs, but they are usually weaker as the primary defense. Attackers and integration bugs can produce new, encoded, partial, or unexpected forms that the deny list did not anticipate.\n\nBrittle pattern matching is a common failure mode. A regular expression that attempts to detect every dangerous string can become complex, incomplete, and hard to reason about. The better question is often simpler: what should this field contain at all? An email field should be an email-shaped value. A country field should come from known country codes. A quantity should be a number in an allowed range.\n\nAllow lists are not always trivial. Some inputs, such as names, comments, search text, and international addresses, need flexibility. In those cases, validation should still define length, encoding, structure, and where the data may be used safely. When broad input is legitimate, pair validation with safe storage, safe APIs, output encoding, and context-aware handling.",
  "narrationPoints": [
    "Allow-list validation defines what is acceptable and rejects everything else.",
    "Deny-list validation tries to block specific bad patterns.",
    "Brittle pattern matching is a common failure mode.",
    "Allow lists are not always trivial."
  ]
};
