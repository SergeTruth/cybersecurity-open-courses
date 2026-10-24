window.COURSE_MODULE = {
  "title": "Exit Status, pipefail, and Safe Failure",
  "graphicAlt": "A completed formatter cannot hide an upstream failure when stage results and output validity determine workflow success.",
  "narration": "Failure handling in pipelines is easy to get wrong. A pipeline may appear successful because the last command succeeded even though an earlier command failed. A final formatting step can run normally after receiving no useful data, which can hide the real problem from the script and the operator.\n\nBash's pipefail option can help by making failures from earlier pipeline stages visible in the pipeline's result. It is a useful defensive tool, but it should be used with understanding. Some commands intentionally return nonzero for conditions that are not fatal in a particular workflow, such as no records matching a filter.\n\nSecure pipeline design defines success for the workflow, not only for each command. Success may mean a command completed, output was nonempty, required fields were present, counts were within an expected range, and downstream decisions had enough evidence to proceed. Exit status is necessary, but it may not be sufficient.\n\nScripts should distinguish expected non-success from real failure. If no-match is acceptable, handle it explicitly. If no-match means a deployment target is missing, stop clearly. If a parser receives empty input, avoid treating empty output as a valid result unless that condition is defined.\n\nSafe failure is honest failure. The script should stop before later steps depend on a false success signal. It should report enough context for an operator to understand which stage failed and what assumption was not met, without dumping sensitive data into logs.",
  "narrationPoints": [
    "Failure handling in pipelines is easy to get wrong.",
    "Bash's pipefail option can help by making failures from earlier pipeline stages visible in the pipeline's result.",
    "Secure pipeline design defines success for the workflow, not only for each command.",
    "Scripts should distinguish expected non-success from real failure.",
    "The script should stop before later steps depend on a false success signal.",
    "A pipeline may appear successful because the last command succeeded even though an earlier command failed."
  ]
};
