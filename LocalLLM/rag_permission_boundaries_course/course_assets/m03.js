window.COURSE_MODULE = {
  "title": "Identity, Entitlements, and Request Context",
  "graphicAlt": "Trusted identity and current entitlements determine retrieval scope; untrusted hints and ambiguous context cannot grant access.",
  "narration": "Permission-aware RAG starts with reliable identity and request context. Retrieval decisions need to know who is asking, which tenant or project they belong to, what groups or roles they have, which application is acting, and whether the request is direct, delegated, or service-to-service. Without that context, retrieval cannot safely decide which sources may be considered.\n\nClient-supplied hints should not be trusted by default. A request may include a tenant ID, role-like value, or document identifier, but trusted permission decisions should come from authoritative identity systems, verified session state, validated tokens, or server-side policy records. The application should decide which context is reliable before it reaches the retriever.\n\nEntitlements change over time. A user may join or leave a group, a project may end, a document may become restricted, or a service account may lose a permission. Cached permission state can improve performance, but it needs lifecycle rules. Teams should define how long permission caches live, when they are refreshed, and how revocation is handled for sensitive repositories.\n\nService accounts also need clear scope and accountability. A connector may need broad read access to ingest source content, but that does not mean the retrieval service can show all ingested content to every user. When context is missing, stale, conflicting, or ambiguous, the safer default is to fail closed. Denying uncertain access is less convenient than accidental disclosure, but it preserves the boundary.",
  "narrationPoints": [
    "Permission-aware RAG starts with reliable identity and request context.",
    "Client-supplied hints should not be trusted by default.",
    "Entitlements change over time.",
    "Service accounts also need clear scope and accountability."
  ]
};
