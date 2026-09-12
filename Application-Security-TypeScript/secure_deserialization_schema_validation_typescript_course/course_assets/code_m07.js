window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Use this test matrix to cover the entire boundary. Limits are application decisions; the values below are illustrative cases, not recommended universal settings.",
  "codeExamples": [
    {
      "title": "Test outcomes and side effects",
      "language": "json",
      "blurb": "For every rejection, assert that protected writes and sends were not invoked. For accepted transformations, assert the exact value reaching the service. Exercise the actual adapters, including alternate ingestion paths.",
      "code": "[\n  {\n    \"case\": \"Malformed JSON\",\n    \"expect\": \"Controlled parse rejection; no protected effects\"\n  },\n  {\n    \"case\": \"Nested property outside a reject-unknown schema\",\n    \"expect\": \"Structural rejection; no protected effects\"\n  },\n  {\n    \"case\": \"Schema returns stripped or normalized output\",\n    \"expect\": \"Service receives accepted fields and normalized values only\"\n  },\n  {\n    \"case\": \"Valid resource identifier from another tenant\",\n    \"expect\": \"Authorization rejection; no protected effects\"\n  },\n  {\n    \"case\": \"Valid dates in reversed order\",\n    \"expect\": \"Semantic rejection; no protected effects\"\n  },\n  {\n    \"case\": \"Unknown variant or unsupported version\",\n    \"expect\": \"Contract rejection; no dynamic dispatch\"\n  },\n  {\n    \"case\": \"Input exceeds decompressed-size limit\",\n    \"expect\": \"Ingestion stops at the enforcing layer before unbounded work\"\n  },\n  {\n    \"case\": \"Collection length above the supported maximum\",\n    \"expect\": \"Rejection before per-element side effects\"\n  }\n]"
    }
  ]
};
