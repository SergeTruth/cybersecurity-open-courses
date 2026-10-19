window.COURSE_MODULE = {
  "title": "Tenant Isolation and Leakage Prevention",
  "graphicAlt": "Trusted tenant scope governs retrieval, prompts and operational stores, including administrative access and exports.",
  "narration": "Multi-tenant and multi-project RAG systems need strict separation across the full operating environment. Tenant context should be enforced by trusted server-side code, not chosen by the client. A user interface may display a selected tenant or project, but the authorization decision should come from verified identity, membership, and policy state.\n\nIsolation choices appear throughout the pipeline. Some organizations use per-tenant document stores, indexes, and caches. Others use shared infrastructure with strict tenant filters and careful operational controls. Either pattern requires explicit rules for storage, retrieval, prompt assembly, logs, traces, exports, analytics, backups, and administrative tooling. A boundary that exists in the index but not in logs or exports is not complete.\n\nDebugging convenience can become a leakage path. Support dashboards may show retrieved chunks. Trace views may capture prompts. Admin tools may let operators browse indexes. Export features may include citations or transcripts. Cached prompts and responses may retain sensitive material after the source access changed. These surfaces deserve the same permission thinking as the user-facing answer.\n\nTenant isolation should be verified before onboarding sensitive users or datasets. Tests should prove that one tenant cannot retrieve, cite, log, export, or view another tenant's material through normal features or operational tooling. Isolation is not only a storage design. It is a full-system property that includes how people operate and troubleshoot the platform.",
  "narrationPoints": [
    "Multi-tenant and multi-project RAG systems need strict separation across the full operating environment.",
    "Isolation choices appear throughout the pipeline.",
    "Debugging convenience can become a leakage path.",
    "Tenant isolation should be verified before onboarding sensitive users or datasets."
  ]
};
