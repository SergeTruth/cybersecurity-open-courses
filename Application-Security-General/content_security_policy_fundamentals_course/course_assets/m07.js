window.COURSE_MODULE = {
  "title": "Reporting and Monitoring",
  "graphicAlt": "CSP violation reports are triaged into policy gaps, unexpected behavior, and environment noise while sensitive report data is minimized and findings inform policy improvement.",
  "narration": "CSP reporting gives teams visibility into policy violations. Reports can show that the browser blocked or would have blocked a resource load, inline execution attempt, frame, connection, or other behavior. report-uri and report-to are reporting mechanisms at a high level, with browser support and operational details that teams should verify for their environment. Report-only policies are especially useful during rollout because they reveal what enforcement would affect before users experience breakage.\n\nReports are not perfect signals. Browser extensions, privacy tools, old cached pages, unusual clients, injected enterprise tooling, and harmless user environment differences can generate noise. Some reports may also include URLs or context that should be treated as sensitive. Privacy considerations matter because reporting endpoints receive browser-side event data. Teams should collect the minimum useful data, protect the reporting pipeline, and avoid treating every report as an incident by default.\n\nThe value of reporting is improvement. Reports can identify missing policy entries, unexpected third-party dependencies, risky inline behavior, or pages that still rely on patterns the team wants to remove. Monitoring for unexpected resource loads can also help spot frontend drift. A useful reporting program has triage rules, ownership, dashboards or summaries, and a feedback loop into policy maintenance. CSP reports are evidence for tuning the policy, not a pile of warnings to ignore.",
  "narrationPoints": [
    "CSP reporting gives teams visibility into policy violations.",
    "Reports are not perfect signals.",
    "The value of reporting is improvement."
  ]
};
