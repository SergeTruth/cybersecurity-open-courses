window.COURSE_MODULE = {
  "title": "Course Summary",
  "graphicAlt": "Blank placeholder image for Course Summary.",
  "narration": "Security headers help browsers enforce safer behavior around transport, scripts, framing, content types, referrers, and browser capabilities. They are one of the most practical defense-in-depth controls available to web teams because they are enforced by the browser and can reduce the impact of several common weakness patterns. Their value comes from matching policy to real application requirements.\n\nStrong header programs start with clear architecture. HSTS depends on HTTPS readiness across domains and subdomains. CSP depends on knowing which scripts, styles, images, connections, forms, and base URLs are legitimate. Framing controls depend on knowing which pages may be embedded. MIME controls depend on accurate content handling. Referrer and permissions policies depend on privacy and feature requirements.\n\nDeployment should be careful and observable. Use report-only modes and staged max-age values where appropriate. Test in browsers, with scanners, and through real user workflows. Document exceptions and avoid overbroad settings that look secure but allow everything important. Review headers when application architecture, third-party dependencies, cloud routing, or partner integrations change.\n\nThe final takeaway is that headers are most effective when combined with secure coding, output encoding, session security, dependency management, access control, and regular review. They do not replace those controls. They make the browser an active participant in enforcing the application's security expectations, which is exactly why they deserve deliberate design and maintenance.",
  "narrationPoints": [
    "Security headers help browsers enforce safer behavior around transport, scripts, framing, content types, referrers, and browser capabilities.",
    "Strong header programs start with clear architecture.",
    "Deployment should be careful and observable.",
    "The final takeaway is that headers are most effective when combined with secure coding, output encoding, session security, dependency manageme..."
  ]
};
