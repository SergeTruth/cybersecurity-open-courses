window.COURSE_MODULE = {
  "title": "Status Codes, Timeouts, Retries, and Redirects",
  "graphicAlt": "Command results, expected HTTP status, time bounds and retry safety are checked before accepting a response.",
  "narration": "A curl command can complete at the transport level while the HTTP response still represents an application error. A script that only checks whether curl ran may miss an authorization failure, validation error, missing resource, rate limit, or server-side problem.\n\nSecure automation defines expected status codes. A health check, download, upload, and deployment trigger may each have different success criteria. Scripts should check both curl's command behavior and the HTTP status expectations for the workflow before trusting the response.\n\nTimeouts are essential for unattended jobs. Without them, a request can hang long enough to block a deployment, monitoring job, or scheduled task. Timeouts should be chosen with the service and workflow in mind, and failures should be reported clearly.\n\nRetries require care. Retrying a read-only request may be reasonable when a transient network problem occurs. Retrying a state-changing request may not be safe unless the API and workflow are designed for it. Idempotence, rate limits, and operational impact should guide retry behavior.\n\nRedirects should be reviewed. Following a redirect can change where content is fetched or where data is sent. In some workflows redirects are expected; in others they should be rejected or limited. A script should not blindly follow redirection when destination trust matters.\n\nSafe stopping behavior prevents misleading success. If a response is empty, malformed, unexpected, or returned with a status the workflow does not accept, later steps should not treat it as valid input. The script should stop or handle the condition deliberately.",
  "narrationPoints": [
    "A curl command can complete at the transport level while the HTTP response still represents an application error.",
    "A health check, download, upload, and deployment trigger may each have different success criteria.",
    "Without them, a request can hang long enough to block a deployment, monitoring job, or scheduled task.",
    "Retrying a read-only request may be reasonable when a transient network problem occurs.",
    "Following a redirect can change where content is fetched or where data is sent.",
    "If a response is empty, malformed, unexpected, or returned with a status the workflow does not accept, later steps should not treat it as valid input."
  ]
};
