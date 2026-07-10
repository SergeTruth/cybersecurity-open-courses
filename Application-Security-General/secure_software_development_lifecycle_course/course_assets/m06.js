window.COURSE_MODULE = {
  "title": "Security Testing and Verification",
  "graphicAlt": "Blank placeholder image for a lesson on security testing and verification.",
  "narration": "Security testing verifies whether assumptions, controls, and expected behaviors hold under realistic conditions. Unit tests can check security behavior in small pieces of code, such as authorization decisions or validation logic. Integration tests can confirm that components work together safely. Abuse-case tests exercise scenarios where a feature might be misused, while regression tests help keep fixed security issues from returning.\n\nAutomated techniques include static analysis at a high level, dynamic testing at a high level, dependency scanning, container scanning, and secrets scanning. Each method sees a different part of the problem. Static analysis can identify risky code patterns. Dynamic testing can observe behavior in a running system. Dependency and container scanners can find known vulnerable components. Secrets scanners can catch credentials before they spread.\n\nTesting has limits. False positives are reported issues that do not apply as described after review. False negatives are real issues that the test did not find. Manual security review and penetration testing at a high level can add human judgment, but they still do not replace secure requirements and design. Testing is evidence, not magic. It verifies selected assumptions; it does not prove the entire system is safe.\n\nFindings must be triaged, assigned, fixed, validated, and tracked to closure or risk acceptance. A report that nobody owns is not a control. Teams need severity criteria, service-level expectations, retest steps, and a way to distinguish urgent defects from lower-risk improvements. The secure SDLC turns testing output into engineering work that improves the product.",
  "narrationPoints": [
    "Security testing verifies whether assumptions, controls, and expected behaviors hold under realistic conditions.",
    "Unit tests can check security behavior in small pieces of code, such as authorization decisions or validation logic.",
    "Integration tests can confirm that components work together safely.",
    "Abuse-case tests exercise scenarios where a feature might be misused, while regression tests help keep fixed security issues from returning.",
    "Automated techniques include static analysis at a high level, dynamic testing at a high level, dependency scanning, container scanning, and secrets scanning.",
    "Each method sees a different part of the problem."
  ]
};
