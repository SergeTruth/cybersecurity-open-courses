window.COURSE_MODULE = {
  "title": "API Design, Trust Boundaries, and Threat Modeling",
  "graphicAlt": "Security diagram for REST API Security in NodeJS, API Design, Trust Boundaries, and Threat Modeling, showing the protected asset, trust boundary, enforcing component, and verification path with arrows from untrusted input to controlled output.",
  "narration": "Good API security starts before implementation. A team should identify the users, services, clients, reverse proxies, identity providers, data stores, queues, third-party APIs, administrative interfaces, and background workers involved in the system. Public endpoints, authenticated user endpoints, service-to-service endpoints, and administrative endpoints should not all share the same assumptions. Each boundary changes what the API can trust and what it must verify.\n\nThreat modeling does not need to be heavyweight to be useful. For an endpoint like GET /users/:id, the team can ask who is allowed to read that user object, whether tenant boundaries apply, and what fields should be returned. For POST /invoices, it can ask who can create invoices, which price and customer fields are authoritative, and what duplicate requests do. For PATCH /roles or DELETE /documents/:id, the model should highlight high-impact authorization, audit, and recovery requirements before code is written.\n\nSecurity requirements should be defined per endpoint and per data object, not only at the application level. A route may require authentication, but the requested object may still be off limits. A service credential may identify an integration, but not prove that an end user may trigger the action. A reverse proxy may protect the network path, but not validate business authorization. Threat modeling helps teams identify these high-risk paths early, when the design is still easy to adjust.",
  "narrationPoints": [
    "Each boundary changes what the API can trust and what it must verify.",
    "Threat modeling does not need to be heavyweight to be useful.",
    "Threat modeling helps teams identify these high-risk paths early, when the design is still easy to adjust.",
    "A reverse proxy may protect the network path, but not validate business authorization.",
    "For an endpoint like GET /users/:id, the team can ask who is allowed to read that user object, whether tenant boundaries apply, and what fields should be returned.",
    "For PATCH /roles or DELETE /documents/:id, the model should highlight high-impact authorization, audit, and recovery requirements before code is written."
  ]
};
