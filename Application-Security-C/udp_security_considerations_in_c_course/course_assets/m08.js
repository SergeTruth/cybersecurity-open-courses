window.COURSE_MODULE = {
  "title": "Broadcast, Multicast, and Discovery Traffic",
  "graphicAlt": "Broad-reach discovery announcements enter possibilities-list document, then separate authority gate for sensitive action.",
  "narration": "Broadcast, multicast, and discovery protocols often operate in noisy or mixed-trust local environments. They are designed to help components find each other, but that same broad reach means a listener may see messages from devices, services, test tools, or components outside the intended trust boundary.\n\nAnnouncements and discovery responses should be treated as untrusted until validated. The message may be malformed, outdated, duplicated, irrelevant, or from a component that should not influence this service. Discovery is a way to learn about possibilities, not a complete authorization decision.\n\nLimit which message types are accepted from broad-reach communication patterns. A discovery listener might accept a small announcement or status query but should not allow sensitive configuration changes, state-changing commands, or expensive work without additional checks. The protocol should separate discovery from authority.\n\nConfiguration should constrain where discovery listeners run and which interfaces they use. A discovery feature intended for a lab subnet should not quietly become active on every interface in production. Deployment documentation should state where discovery is expected and how it is restricted.\n\nLogs and diagnostics should distinguish normal discovery noise from meaningful security or reliability events. If every stray announcement is logged as an urgent problem, operators will tune out the logs. If important validation failures are hidden among routine noise, review and incident response become harder.",
  "narrationPoints": [
    "Broadcast, multicast, and discovery protocols often operate in noisy or mixed-trust local environments.",
    "Announcements and discovery responses should be treated as untrusted until validated.",
    "A discovery listener might accept a small announcement or status query but should not allow sensitive configuration changes.",
    "Configuration should constrain where discovery listeners run and which interfaces they use.",
    "If important validation failures are hidden among routine noise, review and incident response become harder."
  ]
};
