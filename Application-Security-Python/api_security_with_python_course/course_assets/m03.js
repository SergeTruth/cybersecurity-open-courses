window.COURSE_MODULE = {
  "title": "Request Validation and Input Handling",
  "graphicAlt": "Untrusted request data passes schema, limit and business-rule checks before normalized values reach business logic; rejected input stops safely.",
  "narration": "API request data can arrive through path parameters, query parameters, headers, cookies, JSON bodies, form fields, and uploaded files. The sender might be a normal client, an integration, a service, a script, or a broken automation job. The defensive rule is straightforward: treat request data as untrusted until it has been validated for type, shape, range, format, size, and business intent.\n\nSchema validation is useful because it makes the input contract visible. It can define required fields, optional fields, nesting, allowed values, and basic formats. Type validation is valuable, but it does not prove the request is safe. A valid identifier can point to another tenant's resource. A correctly formatted date can be outside an allowed business window. A well-formed JSON object can still request an action the caller should not perform.\n\nUnexpected fields and size limits deserve deliberate choices. If the API silently accepts extra fields, clients may believe those fields have meaning or accidentally influence server behavior through over-posting. If bodies, arrays, strings, nested structures, or uploads are unbounded, validation can become an availability problem. Safe parsing means choosing parsers and limits that match the data contract and failure behavior the service is prepared to handle.\n\nError responses should help legitimate clients fix bad requests without disclosing internals. They can explain that a field is missing, malformed, too large, out of range, or unsupported. They should not expose stack traces, raw queries, secrets, token contents, internal paths, or service topology. Good validation creates a clean boundary: reject what is outside the contract, explain failures safely, and only pass trusted, normalized data into business logic.",
  "narrationPoints": [
    "API request data can arrive through path parameters.",
    "Schema validation is useful.",
    "Unexpected fields and size limits deserve deliberate.",
    "Error responses should help legitimate clients fix bad.",
    "A well-formed JSON object can still request an action.",
    "They should not expose stack traces."
  ]
};
