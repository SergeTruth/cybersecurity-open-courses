window.COURSE_MODULE = {
  "title": "Investigation Questions",
  "graphicAlt": "Placeholder illustration for DFIR investigation questions",
  "narration": "Strong DFIR work is driven by questions. The first question is usually simple: what happened? The answer may start as a rough description, such as a suspicious login, encrypted files, abnormal outbound traffic, or a user report of mailbox activity. As evidence improves, the description should become more precise. A vague alert becomes a timeline of actions, systems, accounts, tools, and decisions.\n\nThe next question is when it happened. Timing helps define scope. Analysts may need to identify the first known suspicious event, the first confirmed malicious action, the time of containment, and any gaps where evidence is missing. Time zones, clock drift, log retention, and delayed ingestion can all complicate this work. A careful timeline helps the team avoid false certainty.\n\nScope is another core question: what systems and accounts were affected? A compromised account may touch cloud storage, email, collaboration platforms, VPN, source code, administrative consoles, and business applications. A compromised endpoint may lead to lateral movement, credential theft, or malware deployment. DFIR teams look for connections between artifacts rather than treating each alert as an isolated event.\n\nInvestigators also ask how the activity started, what data or services were impacted, whether the threat is still active, and what must be done next. These questions connect analysis to action. If the initial vector was phishing, the response may include mailbox searches and user notification. If an exposed service was exploited, patching and external scanning may become urgent. If data was accessed, legal and privacy teams may need a defensible record of facts. The investigation is successful when it helps the organization make safe decisions.",
  "narrationPoints": [
    "Strong DFIR work is driven by questions.",
    "The first question is usually simple: what happened?",
    "The answer may start as a rough description, such as a suspicious login, encrypted files, abnormal outbound traffic, or a user report of mailbox.",
    "As evidence improves, the description should become more precise.",
    "A vague alert becomes a timeline of actions, systems, accounts, tools, and decisions.",
    "The next question is when it happened."
  ]
};
