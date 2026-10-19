window.COURSE_MODULE = {
  "title": "Reflection Emit, Dynamic Code, and Runtime Generation",
  "graphicAlt": "Trusted rules produce generated behavior that is tested and checked against its deployment target; untrusted executable text is excluded.",
  "narration": "Dynamic code generation includes reflection emit, compiled expressions, runtime proxies, generated accessors, and other code-like runtime behavior. These techniques can be legitimate in serializers, ORMs, proxy frameworks, test tools, and performance-sensitive libraries.\n\nGenerated behavior should be traceable to trusted code and trusted configuration. A generated accessor, proxy, or expression may not appear directly in source, but the rule that produced it should be understandable. Reviewers should be able to answer what is generated, from which inputs, and under whose control.\n\nAvoid generating executable behavior from user-controlled input. If a dynamic generator accepts configuration, templates, expressions, or metadata, define which sources are trusted and which values are only data. A dynamic mechanism should not turn untrusted text into runtime behavior.\n\nDynamic code can reduce reviewability because the final behavior may not appear directly in source. Logging and diagnostics should make generated behavior understandable without exposing sensitive data. Test coverage should exercise generated paths, not only the static code around them.\n\nRuntime generation may be limited or unsupported in some deployment models, restricted environments, or ahead-of-time scenarios. Deployment targets should be part of the design review so a dynamic feature does not become a production reliability issue.",
  "narrationPoints": [
    "Dynamic code generation includes reflection emit, compiled expressions, runtime proxies, generated accessors.",
    "Generated behavior should be traceable to trusted code and trusted configuration.",
    "If a dynamic generator accepts configuration, templates, expressions, or metadata, define.",
    "Logging and diagnostics should make generated behavior understandable without exposing sensitive data.",
    "Runtime generation may be limited or unsupported in some deployment models, restricted environments."
  ]
};
