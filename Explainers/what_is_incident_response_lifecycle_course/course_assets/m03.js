window.COURSE_MODULE = {
  "title": "Detect: Finding Possible Incidents",
  "graphicAlt": "Conceptual visual of possible incident signals coming from alerts, logs, users, cloud tools, and threat intelligence.",
  "narration": "Detection is the point where the organization notices something that might be an incident. That signal might come from a security alert, an endpoint tool, cloud monitoring, identity logs, a user report, a vendor notification, threat intelligence, a data loss signal, or an unusual business process event. Detection is not the same as confirmation. It is a prompt to ask better questions. What happened? Which system, user, service, or data set is involved? Is the activity expected, suspicious, or clearly harmful? Good detection provides context so analysts can prioritize the next step. A useful alert should point toward relevant evidence instead of just raising alarm. Weak detection creates delays and uncertainty: responders may learn about an incident late, lack the logs needed to scope it, or spend time chasing noisy signals. Detection engineering should therefore focus on meaningful coverage, clear alert descriptions, useful enrichment, and routing to people who can act. The goal is not to alert on everything. The goal is to notice important signals early enough that analysis and containment still have time to reduce impact. Detection also benefits from feedback. If analysts repeatedly close an alert as noise, the detection may need tuning. If responders keep asking for context that is not present, enrichment should improve. The best detection program learns from incidents, near misses, user reports, and false positives rather than treating alerts as fixed forever.",
  "narrationPoints": [
    "Detection identifies possible incident signals.",
    "Sources include alerts, logs, users, tools, and intelligence.",
    "Detection is not the same as confirmation.",
    "Context helps analysts prioritize next steps.",
    "Weak detection delays response and increases uncertainty."
  ]
};
