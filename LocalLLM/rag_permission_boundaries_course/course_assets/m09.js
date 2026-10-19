window.COURSE_MODULE = {
  "title": "Auditing, Testing, and Failure Modes",
  "graphicAlt": "Negative access and lifecycle tests inspect both retrieval and operational surfaces, supported by minimized audit evidence.",
  "narration": "Permission boundaries should be tested with realistic user and tenant scenarios. A happy-path test that confirms the right user can retrieve the right content is not enough. Teams also need negative tests for users without access, revoked access, stale indexes, deleted documents, missing metadata, mixed sources, and cross-tenant requests.\n\nAccess revocation is a particularly important failure mode. If a user leaves a group or a document is restricted, related chunks and index records should stop appearing in future results. Deleted-document tests confirm that removed content no longer participates in retrieval or citations. Missing-metadata tests confirm that records fail closed when the system cannot make a safe permission decision.\n\nAudit logs should help teams reconstruct what happened without storing more sensitive data than necessary. Useful records may include request identity, tenant, policy version, retrieval filters, source identifiers, allowed source references, excluded source counts, response provenance, and operational correlation IDs. Raw sensitive text should be logged only when there is a deliberate governed need.\n\nReviews should look beyond the main answer path. Caches, debug logs, traces, exports, transcripts, analytics, admin views, and summaries can all become leakage paths. Incident readiness matters because RAG permission mistakes can be hard to reconstruct after the fact. Teams need enough evidence to understand impact, correct data, notify owners, and improve tests without creating a second data exposure through excessive logging.",
  "narrationPoints": [
    "Permission boundaries should be tested with realistic user and tenant scenarios.",
    "Access revocation is a particularly important failure mode.",
    "Audit logs should help teams reconstruct what happened without storing more sensitive data than necessary.",
    "Reviews should look beyond the main answer path."
  ]
};
