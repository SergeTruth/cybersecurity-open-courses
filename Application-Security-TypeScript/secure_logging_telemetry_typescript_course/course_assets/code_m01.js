window.COURSE_CODE_MODULE = {
  "title": "Log the Event, Not the Framework Object",
  "codeIntro": "The safer call records a stable event and the minimum context needed to explain the update. The anti-pattern makes the telemetry schema depend on everything reachable from the request.",
  "codeExamples": [
    {
      "title": "Explicit event mapping",
      "language": "typescript",
      "blurb": "Authentication and resource identifiers are selected deliberately; the request object never enters the event.",
      "code": `interface UpdateTelemetry {
  projectId: string;
  actorId: string;
  requestId: string;
}

function recordProjectUpdate(ctx: UpdateTelemetry): void {
  logger.info({
    event: "project.update",
    projectId: ctx.projectId,
    actorId: ctx.actorId,
    requestId: ctx.requestId,
    outcome: "success"
  });
}

// Avoid: the request may expose headers, cookies, bodies, and internals.
// logger.info({ request: req });`
    }
  ]
};
