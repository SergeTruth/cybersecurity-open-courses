window.COURSE_MODULE = {
  "title": "How CSP Is Delivered",
  "graphicAlt": "CSP delivered by HTTP response headers can first report violations without blocking, then enforce a tuned policy by blocking disallowed behavior.",
  "narration": "CSP is commonly delivered through the Content-Security-Policy HTTP response header. When the browser receives the page, it reads the header and applies the policy to resource loading and execution. There is also a Content-Security-Policy-Report-Only header. Report-only mode lets teams observe violations without blocking behavior. That is extremely useful for rollout because many applications have more frontend dependencies and inline behavior than teams initially realize.\n\nA meta tag can provide some CSP behavior, but it has limitations and is not a complete substitute for headers. Some directives and reporting behaviors are not available or are less effective through meta delivery. Headers are the normal production approach because they are applied early and centrally. Teams should understand how their web server, CDN, application framework, reverse proxy, and deployment platform set headers so policies are consistent across pages.\n\nRollout should be deliberate. Starting with report-only mode helps teams collect data, identify expected resources, and avoid breaking production pages unexpectedly. After noise is reduced and required sources are understood, the policy can be enforced in stages. High-value pages may need extra attention. A good rollout includes monitoring, ownership, documentation, and regression checks so future changes do not quietly weaken or break the policy.",
  "narrationPoints": [
    "CSP is commonly delivered through the Content-Security-Policy HTTP response header.",
    "A meta tag can provide some CSP behavior, but it has limitations and is not a complete substitute for headers.",
    "Rollout should be deliberate."
  ]
};
