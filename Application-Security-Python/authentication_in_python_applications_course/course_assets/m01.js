window.COURSE_MODULE = {
  "title": "What Authentication Means in Python Applications",
  "graphicAlt": "An identity claim is verified by authentication before authorization evaluates permission, with sessions maintaining state across requests.",
  "narration": "Authentication is the process of verifying who or what is requesting access. In a Python application, the authenticating entity might be a human user, a service account, an API client, a background worker, a device, or a workload running in an automated environment. The implementation details may vary across Flask, Django, FastAPI, command-line tools, serverless functions, and automation services, but the underlying question is stable: has this subject proven an identity the application can trust for the next decision?\n\nAuthentication is related to identification, authorization, and session management, but it is not the same as any of them. Identification is the claim, such as a username, client identifier, or workload identity. Authentication verifies that claim. Authorization determines what the verified identity is allowed to do. Session management preserves authentication state across requests or interactions. Mixing these concepts together often produces systems where login success is treated as permission for too much.\n\nPython applications frequently rely on frameworks, libraries, identity providers, middleware, and platform features to perform authentication. That is healthy when the team understands the trust model and uses mature patterns. The risky path is custom authentication logic scattered across routes, scripts, handlers, and background jobs. Authentication should be explicit, consistent, and reviewable because mistakes affect every downstream access decision.\n\nSuccessful authentication is foundational, but it is never sufficient by itself. After identity is verified, the application still needs authorization, secure session handling, logging, monitoring, rate limiting where appropriate, privacy-aware error handling, and incident response visibility. Strong authentication design gives the rest of the security program a reliable identity signal without pretending that identity alone answers every security question.",
  "narrationPoints": [
    "Authentication is the process of verifying who or what is.",
    "Authentication is related to identification.",
    "Python applications frequently rely on frameworks.",
    "Successful authentication is foundational.",
    "Authentication should be explicit.",
    "Identification is the claim."
  ]
};
