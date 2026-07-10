window.COURSE_MODULE = {
  "title": "Canonicalization and Normalization",
  "graphicAlt": "Blank placeholder graphic for canonicalization and normalization",
  "narration": "Canonicalization means converting data into a standard representation before making decisions. Normalization is closely related and often includes handling encoding, Unicode forms, whitespace, case, path separators, URL decoding, and other representation details. These steps matter because the same logical value can appear in multiple forms, and security decisions can fail when validation checks one form but the application later uses another.\n\nEncoding and decoding deserve special care. Data may arrive URL-encoded, HTML-encoded, base64-encoded, Unicode-normalized, escaped, or nested inside another format. Repeated decoding can be risky because a value may look harmless in one representation and become meaningful after another decoding step. Applications should have a clear, consistent order for decoding, normalizing, parsing, and validating.\n\nPath and URL handling are common examples. A filename or path may contain mixed separators, dot segments, encoded characters, unusual whitespace, case differences, or Unicode characters that look similar to expected characters. A URL may contain encoded hostnames, redirects, fragments, or query parameters that change meaning after parsing. Validate the parsed and normalized structure, not just the raw text.\n\nThe key risk is validating one representation and using another. If an application validates a raw string but a downstream library decodes it again, the decision may no longer apply. A safer design normalizes data before security decisions, uses well-tested parsers, stores structured values where possible, and avoids hand-rolled transformations for complex formats.",
  "narrationPoints": [
    "Canonicalization means converting data into a standard representation before making decisions.",
    "Encoding and decoding deserve special care.",
    "Path and URL handling are common examples.",
    "The key risk is validating one representation and using another."
  ]
};
