window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Entra ID Baseline for .NET",
  "graphicAlt": "A secure Entra baseline combines owned registrations, maintained libraries, token validation, server authorization and recurring operational review.",
  "narration": "A secure Entra ID baseline for .NET starts with the application trust boundary. Know whether the software is a web app, API, daemon, admin tool, public client, partner integration, or multitenant service. Keep app registrations reviewable, environment-specific, owned, and free of stale redirect URIs and unused credentials.\n\nChoose the right authentication flow and use maintained libraries such as Microsoft.Identity.Web and MSAL. Validate access tokens fully, then enforce scopes, app roles, and resource authorization on the server. A valid token is not a complete authorization decision.\n\nRequest least-privilege permissions and treat consent as governance. Prefer managed identities where appropriate, and manage client secrets, certificates, workload identities, token caches, and downstream API access deliberately. Development convenience should not define production behavior.\n\nFinally, handle Conditional Access and claims challenges safely, protect logs from tokens and secrets, monitor identity and authorization events, and review production configuration regularly. Entra ID provides the identity foundation, but secure .NET applications still need careful engineering around it.",
  "narrationPoints": [
    "A secure Entra ID baseline for .NET starts with the application trust boundary.",
    "Validate access tokens fully, then enforce scopes, app roles, and resource authorization on the server.",
    "Prefer managed identities where appropriate, and manage client secrets, certificates, workload identities, token caches.",
    "Entra ID provides the identity foundation, but secure .NET applications still need careful engineering around it.",
    "Finally, handle Conditional Access and claims challenges safely, protect logs from tokens and secrets, monitor identity and authorization events."
  ]
};
