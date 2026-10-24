window.COURSE_MODULE = {
  "title": "The Limits of rand and Similar APIs",
  "graphicAlt": "Legacy rand gear allowed toward modest documented non-security use.",
  "narration": "Legacy C APIs such as rand are familiar, but they are not appropriate for security-sensitive randomness. They were not designed to protect tokens, keys, nonces, session identifiers, or other values where prediction has security consequences.\n\nThe behavior of rand can vary by implementation. Range, quality, period, state size, and seeding behavior are not properties you should depend on for sensitive decisions. Code that seems acceptable on one platform may have different behavior elsewhere.\n\nSmall or predictable seeds produce repeatable sequences. Seeding a deterministic generator with a low-entropy value can make output repeat across runs or environments. That may be acceptable when repeatability is intentional for tests. It is not acceptable for secrets or access-control values.\n\nSimple modulo logic can also introduce range bias when the source range is not evenly divisible by the target range. This is a separate issue from the quality of the generator itself. Even a good source can be mapped poorly into a bounded range.\n\nFor limited non-security uses, legacy APIs may be acceptable when the quality requirements are modest and documented. The important review rule is to flag any security-sensitive use of legacy or weak randomness APIs. If the value protects access, confidentiality, integrity, or protocol safety, use a trusted platform or approved library source instead.",
  "narrationPoints": [
    "Legacy C APIs such as rand are familiar, but they are not appropriate for security-sensitive randomness.",
    "Range, quality, period, state size, and seeding behavior are not properties you should depend on for sensitive decisions.",
    "Seeding a deterministic generator with a low-entropy value can make output repeat across runs or environments.",
    "Simple modulo logic can also introduce range bias when the source range is not evenly divisible by the target range.",
    "If the value protects access, confidentiality, integrity, or protocol safety, use a trusted platform or approved library source instead."
  ]
};
