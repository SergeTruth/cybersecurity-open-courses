window.COURSE_MODULE = {
  "title": "Logging Without Leaking Sensitive Data",
  "graphicAlt": "Structured metadata and tested redaction limit routine logs, while debug records use controlled access and retention.",
  "narration": "AI logs can become a privacy risk very quickly. Prompts may include customer data, personal information, project secrets, source excerpts, internal file paths, API keys, credentials pasted by mistake, or sensitive business context. Outputs may repeat or transform that information. Tool arguments and retrieved chunks can add even more data to telemetry if logging is careless.\n\nSafe logging starts with structured events. Instead of recording full prompts and responses by default, log fields such as workflow name, model version, request category, status, latency, error class, retrieval count, tool status, and review state. These fields support operations without turning routine logs into a shadow copy of the AI workload.\n\nRedaction and masking should be designed deliberately. Secrets, tokens, personal data, customer identifiers, file paths, tenant identifiers, and sensitive source references may need to be removed, hashed, generalized, or stored only in restricted investigation records. Redaction should be tested because AI workflows often combine data from several places.\n\nSeparate routine logging from debug logging. Debug logs may be useful during development or incident response, but they should have clear controls, short retention, restricted access, and a way to turn them off. Production-style logs should usually be more conservative.\n\nFinally, treat logs as data. They need access control, retention rules, review, and deletion paths. A sovereign AI system is not truly private if its telemetry quietly becomes the largest uncontrolled data store in the environment.",
  "narrationPoints": [
    "AI logs can become a privacy risk very quickly.",
    "Safe logging starts with structured events.",
    "Redaction and masking should be designed deliberately.",
    "Separate routine logging from debug logging.",
    "Finally, treat logs as data."
  ]
};
