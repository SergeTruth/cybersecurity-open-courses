window.COURSE_MODULE = {
  "title": "Dynamic Invocation and Type Activation",
  "graphicAlt": "Stable operation keys pass an allowlisted map, argument validation and authorization before reaching approved handlers.",
  "narration": "Dynamic invocation is security-sensitive because it turns runtime names and metadata into behavior. A string, attribute value, configuration entry, or file record can influence which constructor, method, property, event, or handler is used. That is a powerful pattern, but it needs clear boundaries.\n\nAvoid selecting types, constructors, methods, properties, or events directly from user-controlled strings. A request value should not become a raw type name. A configuration setting should not grant access to any class on the probing path. A plugin identifier should not become unrestricted assembly discovery.\n\nPrefer explicit maps, allowlists, fixed contracts, command registries, dependency injection registrations, or typed interfaces. These patterns keep the dynamic choice bounded. The application can expose stable operation keys without letting external data choose arbitrary runtime members.\n\nValidate and authorize the requested operation before invoking reflected code. Treat constructor arguments, method arguments, property values, and attribute-derived values as untrusted unless they come from a trusted source. Runtime activation should not skip normal dependency lifetime, authorization, validation, logging, or error-handling expectations.\n\nReflection exceptions should be handled safely. Failure responses should avoid exposing internal names, paths, stack details, or sensitive values unnecessarily. Logs should preserve enough safe context for troubleshooting without turning internal reflection behavior into public documentation.",
  "narrationPoints": [
    "A string, attribute value, configuration entry, or file record can influence.",
    "A configuration setting should not grant access to any class on the probing path.",
    "Prefer explicit maps, allowlists, fixed contracts, command registries, dependency injection registrations.",
    "Runtime activation should not skip normal dependency lifetime, authorization, validation, logging, or error-handling expectations.",
    "Logs should preserve enough safe context for troubleshooting without turning internal reflection behavior into public documentation."
  ]
};
