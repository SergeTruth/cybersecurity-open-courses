window.COURSE_MODULE = {
  "title": "Exploitation and Initial Execution",
  "graphicAlt": "Conceptual visual of exploitation and initial execution reduced through patching, configuration, and telemetry.",
  "narration": "Exploitation and initial execution are where a possible intrusion starts to produce observable behavior in the environment. At this point, a weakness may be triggered, unsafe input may reach vulnerable logic, or a user action may cause untrusted content to run. The defensive task is to connect evidence without overclaiming. Did something execute? Which account, process, host, workload, or application was involved? What changed immediately afterward? Patching, secure configuration, input validation, least privilege, endpoint protection, and application telemetry all reduce risk at this stage, but the response still depends on evidence. One alert rarely tells the whole story. Analysts should build a timeline that connects delivery signals, process behavior, authentication events, application logs, and control decisions. Initial execution is also a place where prevention and detection meet. A blocked attempt may reveal a control working as intended; a successful execution may require containment and deeper scope review. Keep the analysis conceptual and authorized. The goal is to determine what happened, how confident the team is, and what response decision is justified by the available evidence. This stage is also a useful checkpoint for control validation. If a patch, hardening standard, or prevention control should have blocked the behavior, the team should verify whether the control was present, whether it worked, and whether any exception or coverage gap needs follow-up.",
  "narrationPoints": [
    "Exploitation turns a weakness into activity.",
    "Defensive controls include patching and secure configuration.",
    "Least privilege can reduce impact.",
    "Endpoint and application telemetry support detection.",
    "Evidence should connect the event to observed behavior."
  ]
};
