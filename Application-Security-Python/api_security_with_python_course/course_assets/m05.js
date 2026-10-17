window.COURSE_MODULE = {
  "title": "Authorization and Object-Level Access Control",
  "graphicAlt": "Subject, action, resource and context feed one policy decision; only its permitted branch reaches the protected operation.",
  "narration": "Authorization decides what the authenticated subject may access or do. Roles, permissions, scopes, and claims can all help express capability, but sensitive APIs usually need more context. The service should verify the current subject, action, resource, and context. Context may include tenant, organization, ownership, workflow state, delegated access, risk level, and whether the request is user-initiated or service-initiated.\n\nObject-level authorization is one of the most important API controls. A caller being allowed to use an endpoint does not mean the caller can access every record referenced by that endpoint. List endpoints should filter results to what the caller may see. Detail endpoints should check access to the specific object. Update, delete, export, and administrative actions should verify permission at the point where the operation occurs.\n\nTenant and organization boundaries deserve special attention. Multi-tenant APIs should prevent one tenant from reading, modifying, exporting, or triggering work against another tenant's data. This cannot be left to client behavior, hidden buttons, hidden routes, or documentation. Server-side enforcement should be present even when the caller is internal, privileged, or using an integration path. Boundaries should be testable and visible during review.\n\nDelegated access and administrative actions should be narrow and auditable. Support tools, background services, partner integrations, and admin endpoints often need special privileges, but those privileges should be explicit, limited, and logged. A mature API does not ask only whether a subject is powerful. It asks whether this subject is allowed to perform this action on this resource for this reason right now.",
  "narrationPoints": [
    "Authorization decides what the authenticated subject may.",
    "Object-level authorization is one of the most important API.",
    "Tenant and organization boundaries deserve special.",
    "Delegated access and administrative actions should.",
    "The service should verify the current subject.",
    "A caller being allowed to use an endpoint does not mean."
  ]
};
