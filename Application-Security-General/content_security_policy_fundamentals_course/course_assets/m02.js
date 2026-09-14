window.COURSE_MODULE = {
  "title": "Why CSP Matters",
  "graphicAlt": "Secure rendering and dependency review address root causes, while a browser-enforced CSP boundary can reduce the impact of unexpected loading or script execution.",
  "narration": "CSP matters because frontend applications often load code and content from many places. A page may use local scripts, framework bundles, style sheets, images, fonts, analytics, payment widgets, maps, media embeds, API calls, and tag managers. Without a policy, the browser has less application-specific guidance about which sources are expected. CSP gives the browser a way to reject or report resource loads that fall outside the intended design.\n\nA strong CSP can limit damage from injected content. If a page is vulnerable to reflected or stored content injection, CSP may prevent some inline script execution, restrict external script sources, block plugin-like content, limit framing, or reduce risky navigation behavior. That does not excuse the underlying bug. The root cause still needs to be fixed. But reducing impact while improving visibility is valuable, especially in complex applications where one missed output encoding issue can have serious consequences.\n\nCSP is strongest when it is paired with secure rendering habits. Reducing reliance on inline scripts, using safe templates, avoiding raw HTML helpers, controlling third-party resources, and encoding output correctly all make CSP easier to deploy. Violation reports can reveal risky frontend behavior, unexpected dependencies, browser extension noise, or missed resource origins. In practice, CSP is both a protective control and a diagnostic tool for understanding what the browser is being asked to run.",
  "narrationPoints": [
    "CSP matters because frontend applications often load code and content from many places.",
    "A strong CSP can limit damage from injected content.",
    "CSP is strongest when it is paired with secure rendering habits."
  ]
};
