window.COURSE_MODULE = {
  "title": "Course Summary: A Practical Request-Control Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Practical Request-Control Baseline.",
  "narration": "A practical request-control baseline for ASP.NET Core begins with purpose. Rate limiting protects fairness, availability, cost, and backend resources. It should be based on endpoint behavior, user experience, tenant fairness, backend capacity, and operational visibility, not arbitrary numbers.\n\nChoose limiter algorithms based on the work being protected. Fixed windows, sliding windows, token buckets, and concurrency limiters each shape traffic differently. Expensive endpoints, bursty clients, and long-running operations may need different controls than cheap read endpoints.\n\nPartition fairly and scope policies clearly. Use stable, meaningful, privacy-aware keys such as user, tenant, API key, route, or client category where appropriate. Make global and endpoint-specific policies reviewable, and keep overrides rare, documented, and time-bound.\n\nRequest controls include more than rate limits. Kestrel request body limits, connection limits, header timeouts, data-rate controls, upload workflows, decompression constraints, and hosting-layer limits all shape how much work the system accepts. Align those limits across the app, proxy, gateway, CDN, and hosting environment.\n\nFinally, operate the controls. Monitor rejections, queues, latency, timeouts, body rejections, tenant hotspots, endpoint hotspots, and backend saturation. Tune limits with safe testing and production review. Treat request controls as ongoing operational controls, not constants that are set once and forgotten.",
  "narrationPoints": [
    "A practical request-control baseline for ASP.NET Core begins with purpose.",
    "Fixed windows, sliding windows, token buckets, and concurrency limiters each shape traffic differently.",
    "Make global and endpoint-specific policies reviewable, and keep overrides rare, documented, and time-bound.",
    "Kestrel request body limits, connection limits, header timeouts, data-rate controls, upload workflows, decompression constraints, and hosting-layer limits all shape how much work the system accepts.",
    "Treat request controls as ongoing operational controls, not constants that are set once and forgotten."
  ]
};
