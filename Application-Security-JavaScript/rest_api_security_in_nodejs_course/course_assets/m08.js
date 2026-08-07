window.COURSE_MODULE = {
  "title": "Secure Configuration, Headers, CORS, and Deployment Context",
  "graphicAlt": "Security diagram for REST API Security in NodeJS, Secure Configuration, Headers, CORS, and Deployment Context, showing the protected asset, trust boundary, enforcing component, and verification path with arrows from untrusted input to controlled output.",
  "narration": "Security depends on runtime configuration as much as source code. Development middleware, stack traces, debug endpoints, permissive defaults, internal documentation, and test credentials should not appear in production. Environment-specific configuration should be intentional, reviewed, and observable. A setting that is harmless on a local machine can become dangerous behind a public load balancer, especially when combined with real user data and production credentials.\n\nCORS should be configured deliberately. It is a browser security control, not authentication and not authorization. Broad origins combined with credentials can expose APIs to unintended browser-based calling contexts. If cookies are used, cookie attributes, HTTPS enforcement, proxy behavior, and origin policy need to line up. If bearer tokens are used, the API still needs server-side authentication and authorization regardless of CORS settings.\n\nDeployment context includes reverse proxies, forwarded headers, TLS termination, security headers, secrets, container images, and client-visible bundles. NodeJS applications running behind proxies should only trust forwarded headers from known infrastructure. Secrets should not live in source code, logs, images, or frontend bundles. Security headers may be set by the app or the proxy, but ownership should be clear. Configuration drift is a common root cause, so production settings should be part of review and release discipline.",
  "narrationPoints": [
    "Environment-specific configuration should be intentional, reviewed, and observable.",
    "If cookies are used, cookie attributes, HTTPS enforcement, proxy behavior, and origin policy need to line up.",
    "Deployment context includes reverse proxies, forwarded headers, TLS termination, security headers, secrets, container images, and client-visible bundles.",
    "If bearer tokens are used, the API still needs server-side authentication and authorization regardless of CORS settings.",
    "Security headers may be set by the app or the proxy, but ownership should be clear.",
    "Configuration drift is a common root cause, so production settings should be part of review and release discipline."
  ]
};
