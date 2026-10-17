window.COURSE_MODULE = {
  "title": "Policy Architecture, Caching, and Data Filtering",
  "graphicAlt": "A policy decision feeds enforcement, while its cache is invalidated after relevant changes and unsafe evaluation is denied.",
  "narration": "Authorization architecture defines where decisions are made and where they are enforced. A policy decision point evaluates policy and context. A policy enforcement point applies the result by allowing or denying access. In a Python application, these roles might be implemented through local functions, shared libraries, framework hooks, a policy engine, a database rule layer, or a centralized authorization service.\n\nLocal checks can be simple, fast, and close to application code. Centralized policy services can improve consistency across multiple services. Policy engines can help express rules outside individual handlers. Each pattern has tradeoffs in performance, clarity, availability, and operational complexity. The right architecture should make safe behavior consistent and hard to bypass accidentally, not merely fashionable.\n\nData filtering is a common authorization pattern for list endpoints and search results. A caller should only receive records they are allowed to see. Filtering needs to happen in the backend query or service logic, not just in the client. Overbroad query results can expose sensitive data even if individual record pages have checks. The list view, export path, API endpoint, and report generator should all follow the same access expectations.\n\nCaching authorization decisions can improve performance, but stale permissions create risk. Roles, permissions, ownership, tenant membership, and policy versions can change. If cached decisions are used, the design should account for lifetime, invalidation, policy versioning, and fail-closed behavior. If the policy system cannot evaluate access safely, the safer default is generally to deny rather than allow. Error handling should support operators without revealing sensitive policy internals to unauthorized callers.",
  "narrationPoints": [
    "Authorization architecture defines where decisions are made.",
    "Local checks can be simple.",
    "Data filtering is a common authorization pattern for list.",
    "Caching authorization decisions can improve performance.",
    "The right architecture should make safe behavior consistent.",
    "A caller should only receive records they are allowed."
  ]
};
