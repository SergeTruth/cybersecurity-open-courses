window.COURSE_MODULE = {
  "title": "Implementation and Testing",
  "graphicAlt": "Blank placeholder graphic for implementing and testing validation",
  "narration": "Implementation should make validation consistent and maintainable. Centralized validation, schema validation, framework validators, typed request models, and reusable business rule checks can all help. The goal is not to hide every rule in one giant function. The goal is to make validation clear, testable, and close to the boundary where data enters the trusted part of the application.\n\nServer-side validation is mandatory. Client-side validation improves usability by catching mistakes early, but clients can be modified, bypassed, or replaced entirely. Attackers and automated tools can send requests directly to the server. The server must enforce the real rules, even if the browser or mobile application already performed friendly checks.\n\nError messages should help legitimate users without revealing unnecessary internal details. A message can explain that a field is required, out of range, or in the wrong format. It should not expose stack traces, database structure, secret values, parser internals, or security-sensitive logic. Invalid input should also be logged carefully, avoiding raw sensitive values where possible.\n\nTesting validation requires both positive and negative cases. Unit tests should confirm valid examples pass and invalid examples fail. Negative tests should cover missing fields, wrong types, boundary values, unexpected encodings, excessive length, disallowed values, and invalid field relationships. Fuzzing at a high level can help discover parser and boundary issues. Good validation is engineered, tested, and revisited as the application evolves.",
  "narrationPoints": [
    "Implementation should make validation consistent and maintainable.",
    "Server-side validation is mandatory.",
    "Error messages should help legitimate users without revealing unnecessary internal details.",
    "Testing validation requires both positive and negative cases."
  ]
};
