window.COURSE_MODULE = {
  "title": "Building Hunt Hypotheses",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "A hunt hypothesis is a focused, testable statement about activity that may be present in the environment. It gives the hunt direction and defines what evidence would support, weaken, or disprove the idea. A vague goal such as finding anything suspicious produces unfocused searches and uncertain conclusions.\n\nThreat-informed hypotheses can begin with relevant intelligence, but they must be adapted to the actual architecture and assets. Incident lessons, known control weaknesses, vulnerabilities, change history, and operator concerns can also identify useful questions.\n\nA remote-access hypothesis might ask whether vendor sessions reached assets outside approved destinations or times. An engineering hypothesis might ask whether a privileged workstation communicated with a controller without a matching work order. A pathway hypothesis might ask whether systems crossed a zone boundary through an undocumented route.\n\nWrite the hypothesis with scope, time range, assets, expected behavior, data sources, exclusions, and required reviewers. Identify blind spots before searching. If the available telemetry cannot answer the question, the hunt should say so rather than forcing a conclusion.\n\nLook for disconfirming evidence as well as supporting evidence. Planned maintenance, failover, equipment replacement, and troubleshooting may explain unusual activity. Confirmation bias is especially risky when technical patterns have process meaning.\n\nA completed hunt states the result and confidence: supported, not supported, inconclusive, or unable to test. Even a disproved hypothesis can improve baselines, inventory, telemetry coverage, and future detection design.",
  "narrationPoints": [
    "A hunt hypothesis is a focused, testable statement about activity that may be present in the environment.",
    "It gives the hunt direction and defines what evidence would support, weaken, or disprove the idea.",
    "A vague goal such as finding anything suspicious produces unfocused searches and uncertain conclusions.",
    "Threat-informed hypotheses can begin with relevant intelligence, but they must be adapted to the actual architecture and assets.",
    "Incident lessons, known control weaknesses, vulnerabilities, change history, and operator concerns can also identify useful questions.",
    "A remote-access hypothesis might ask whether vendor sessions reached assets outside approved destinations or times."
  ]
};
