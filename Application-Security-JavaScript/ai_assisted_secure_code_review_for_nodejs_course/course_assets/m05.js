window.COURSE_MODULE = {
  "title": "Authentication, Authorization, and Session Review",
  "graphicAlt": "Verified identity and resource-specific permission are separate gates before a sensitive action.",
  "narration": "Authentication review asks how the application establishes identity and whether that identity is verified consistently. In a Node.js API, identity may come from a session cookie, bearer token, JWT, API key, service credential, or upstream identity provider. AI can help locate where tokens are parsed, where signatures and expiration are checked, where request.user is populated, and which routes rely on that value. The reviewer must verify that the code actually enforces those checks in the request path being changed.\n\nAuthorization review asks a different question: is the verified identity allowed to perform this action on this specific object. Authentication is not a substitute for authorization. A user requesting a document by ID may be logged in and still have no right to read that document. AI can help trace object identifiers from req.params, req.query, or req.body into database calls and point out where the code checks ownership, tenant, role, or permission. The reviewer should look for role checks without object checks and tenant filters that are applied in one path but missing in another.\n\nSession behavior deserves careful review because small inconsistencies can undermine access control. Review cookie flags, session invalidation, password reset behavior, token refresh, logout, API key handling, service-to-service credentials, and administrative assumptions. If AI suggests that a route appears protected, ask it to identify the exact middleware or guard, the files involved, and the data flow that proves enforcement. A useful finding explains where the identity is created, where permission is checked, and where the sensitive action happens.",
  "narrationPoints": [
    "Authentication review asks how the application establishes.",
    "Authorization review asks a different question: is.",
    "Session behavior deserves careful review.",
    "The reviewer must verify that the code actually enforces.",
    "Review cookie flags.",
    "The reviewer should look for role checks without object."
  ]
};
