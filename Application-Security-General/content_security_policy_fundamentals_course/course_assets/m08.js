window.COURSE_MODULE = {
  "title": "Testing and Maintaining CSP",
  "graphicAlt": "CSP maintenance tests real browser behavior and critical journeys, supported by developer tools, staging tests, documented decisions, and clear policy ownership.",
  "narration": "Testing CSP starts with ordinary browser developer tools. The console can show blocked resources, policy violations, and useful details during development. Staging environments should run policies that closely match production so teams can catch missing sources and unsafe patterns before release. Automated header checks can verify that key pages include expected CSP headers, but header presence alone is not enough. The policy content and the application behavior both need review.\n\nTemplate and script usage review is central. Look for inline scripts, inline event handlers, raw HTML helpers, dynamic script loading, tag manager changes, and places where framework escaping or binding patterns are bypassed. Regression testing should include pages with authentication, payment flows, embedded widgets, dashboards, file previews, and other frontend-heavy features. A policy that works only for the homepage may not protect the application where the risk is highest.\n\nCSP needs ownership. Someone should understand why each directive exists, why each source is allowed, when report-only findings are reviewed, and how changes are approved. Document policy decisions so future developers do not weaken the policy to fix a broken page without understanding the tradeoff. As applications change, the CSP should evolve deliberately. Maintenance is not busywork; it is what keeps a once-useful policy from becoming outdated, noisy, or overly broad.",
  "narrationPoints": [
    "Testing CSP starts with ordinary browser developer tools.",
    "Template and script usage review is central.",
    "CSP needs ownership."
  ]
};
