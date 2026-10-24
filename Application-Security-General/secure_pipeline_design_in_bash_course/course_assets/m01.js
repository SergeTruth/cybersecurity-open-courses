window.COURSE_MODULE = {
  "title": "Why Secure Pipeline Design Matters",
  "graphicAlt": "Separate pipeline stages pass data through a validation boundary before an operational decision.",
  "narration": "Bash pipelines are one of the reasons shell automation feels powerful. A script can connect commands with a compact syntax, send the output of one tool into another, and quickly filter, transform, summarize, or route data. That compactness is useful, but it also means important behavior can be hidden inside a short line.\n\nA pipeline is data-flow automation. It may process logs, reports, build artifacts, configuration snippets, backup metadata, monitoring output, deployment evidence, or inventory lists. When later actions depend on that output, pipeline correctness becomes an operational control. A wrong assumption can affect what gets deployed, reported, alerted on, archived, or ignored.\n\nThe risk is not that pipelines are bad. The risk is that pipelines can silently drop data, hide failures, over-trust text output, mix diagnostic errors with expected results, or process more data than intended. A pipeline can look successful even when an upstream command failed or produced no useful data.\n\nSecure pipeline design makes data flow visible. Each stage should have a clear purpose, each boundary should have clear assumptions, and important results should be checked before downstream steps make decisions. The script should be understandable to a reviewer who was not present when the pipeline was written.\n\nThe defensive goal is predictable, reviewable behavior. A secure pipeline handles input intentionally, preserves meaningful boundaries, separates data from diagnostics, detects failure clearly, and logs enough for operators to troubleshoot without exposing sensitive information.",
  "narrationPoints": [
    "Bash pipelines are one of the reasons shell automation feels powerful.",
    "When later actions depend on that output, pipeline correctness becomes an operational control.",
    "The risk is not that pipelines are bad.",
    "Each stage should have a clear purpose, each boundary should have clear assumptions, and important results should be checked before downstream steps make decisions.",
    "A script can connect commands with a compact syntax, send the output of one tool into another, and quickly filter, transform, summarize, or route data.",
    "A wrong assumption can affect what gets deployed, reported, alerted on, archived, or ignored."
  ]
};
