window.COURSE_MODULE = {
  "title": "Validation by Context",
  "graphicAlt": "Blank placeholder graphic for context-specific validation",
  "narration": "Validation rules depend on context because the same string may be safe and valid in one place but invalid or dangerous in another. An email address, URL, filename, numeric field, date, JSON object, file upload, database identifier, and command argument all have different expectations. A single universal validation function cannot understand every destination and business rule.\n\nEmail addresses and URLs illustrate the point. Email validation should usually confirm basic structure and length without trying to perfectly model every edge case of the email standards. URL validation should parse the URL, check allowed schemes, consider host and redirect behavior, and enforce business rules. A URL that is valid text may still be unacceptable if the application only permits internal documentation links or known domains.\n\nFile uploads require multiple checks. The application may need to validate size, file type, extension, detected content type, storage location, naming rules, access controls, and how the file will later be served or processed. A file that is acceptable for private storage may be unsafe if published directly to a web-accessible path. Validation must reflect the lifecycle of the data.\n\nDatabase identifiers and command arguments should be handled with safe APIs, not by trusting validation alone. Even when a value is validated, use parameterized queries, allow-listed identifiers, safe library calls, and explicit argument handling. Context-specific validation reduces bad input, but secure use of the data is what prevents many classes of failures.",
  "narrationPoints": [
    "Validation rules depend on context because the same string may be safe and valid in one place but invalid or dangerous in another.",
    "Email addresses and URLs illustrate the point.",
    "File uploads require multiple checks.",
    "Database identifiers and command arguments should be handled with safe APIs, not by trusting validation alone."
  ]
};
