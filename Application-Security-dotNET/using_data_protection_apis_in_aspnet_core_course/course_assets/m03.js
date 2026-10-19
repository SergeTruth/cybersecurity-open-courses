window.COURSE_MODULE = {
  "title": "Framework Features That Depend on Data Protection",
  "graphicAlt": "Cookies, antiforgery tokens and account workflows depend on compatible durable keys, whose loss disrupts users.",
  "narration": "ASP.NET Core uses Data Protection behind several framework features. Developers may depend on it even when they never call IDataProtectionProvider directly. That is why Data Protection configuration should be treated as part of application reliability and security, not as an invisible implementation detail.\n\nAuthentication cookies depend on protected payloads. The framework protects authentication ticket data so the server can later validate and read it. If the application loses access to the keys needed to unprotect those cookies, users may be signed out unexpectedly or moved through sign-in flows more often than intended.\n\nAntiforgery tokens use protected values to validate browser request intent. ASP.NET Core Identity workflows, such as password reset and email confirmation, may also rely on protected token behavior. TempData and other protected state mechanisms may depend on Data Protection depending on configuration and framework usage.\n\nFailures often appear as ordinary user experience problems: users are logged out, forms fail validation, confirmation links stop working, reset links no longer validate, or temporary state disappears. The root cause may be key-ring location, application name, hosting topology, deployment slot behavior, or lost storage.\n\nFor production systems, Data Protection is both a security feature and an availability dependency. The configuration needs owners, documentation, monitoring, and deployment review so protected framework payloads remain readable by the intended application instances for the intended period.",
  "narrationPoints": [
    "ASP.NET Core uses Data Protection behind several framework features.",
    "The framework protects authentication ticket data so the server can later validate and read it.",
    "TempData and other protected state mechanisms may depend on Data Protection depending on configuration and framework usage.",
    "The root cause may be key-ring location, application name, hosting topology, deployment slot behavior, or lost storage.",
    "For production systems, Data Protection is both a security feature and an availability dependency."
  ]
};
