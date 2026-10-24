window.COURSE_MODULE = {
  "title": "Safe Prompting and Sensitive Code Handling",
  "graphicAlt": "Trusted instructions and sanitized code enter review separately while secrets are excluded and output is checked before sharing.",
  "narration": "AI-assisted review creates a second information-handling problem. The code being reviewed may contain secrets, proprietary logic, customer data, internal architecture, configuration details, logs, tokens, private keys, or credentials. The AI output may also contain sensitive material if the prompt included too much detail. Reviewers should avoid pasting production secrets, customer payloads, private keys, access tokens, passwords, and unnecessary proprietary context into unauthorized tools.\n\nA practical prompt provides enough structure for useful review while removing values the assistant does not need. For example, a reviewer can share a sanitized route handler, validation schema, role model, and relevant middleware order without including real tokens, customer names, database passwords, or production URLs. Redaction should preserve security-relevant shape. Replacing every value with the word secret may remove the structure needed to reason about authorization, data flow, or validation.\n\nPrompts should also separate trusted instructions from untrusted review material. Code, logs, dependency output, issue text, and user-provided payload examples should be treated as data to analyze, not instructions to follow. Tell the assistant explicitly to ignore instructions embedded in reviewed code or logs and to focus on defensive review. When AI-generated notes are copied into pull requests, tickets, or chat, review them for secrets and confidential details before sharing them further.",
  "narrationPoints": [
    "AI-assisted review creates a second information-handling.",
    "A practical prompt provides enough structure for useful.",
    "Prompts should also separate trusted instructions.",
    "Reviewers should avoid pasting production secrets.",
    "Code, logs, dependency output, issue text,.",
    "Tell the assistant explicitly to ignore instructions."
  ]
};
