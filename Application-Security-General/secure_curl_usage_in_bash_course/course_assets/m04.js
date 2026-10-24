window.COURSE_MODULE = {
  "title": "Bash Invocation Patterns for curl",
  "graphicAlt": "Validated values remain separate in an argument tray before becoming a reviewable request; a constructed command string is discouraged.",
  "narration": "A Bash script should invoke curl in a way that is easy to review and test. The executable, stable options, URL, headers, method, payload source, output destination, timeout, and retry behavior should be visible as separate parts of the request design.\n\nAvoid building one large curl command string from variable data. Command strings are difficult to review because they mix data, options, quoting rules, and shell syntax. They also tempt later re-parsing, which makes it harder to prove what curl will actually receive.\n\nArrays are useful for curl options and operands. A script can define fixed options, append validated optional values, and pass the array while preserving argument boundaries. This approach is clearer than manually adding quotes inside a generated command line.\n\nQuote values that should remain literal. URLs, header values, file paths, output paths, request data values, and method names should not accidentally split into multiple arguments or become shell syntax. Validation decides whether a value is allowed; quoting and arrays preserve the value during invocation.\n\nInputs that affect methods, headers, files, timeouts, redirects, retries, and output locations should be validated before curl runs. A target environment label can map to a known API base URL. A supported method can be selected from a small set. A download path can be checked against approved directories.\n\nThe goal is a request that another engineer can inspect. If the script makes clear which options are fixed, which values vary, and what validation protects them, curl automation becomes easier to maintain and safer to operate.",
  "narrationPoints": [
    "A Bash script should invoke curl in a way that is easy to review and test.",
    "Avoid building one large curl command string from variable data.",
    "Arrays are useful for curl options and operands.",
    "URLs, header values, file paths, output paths, request data values, and method names should not accidentally split into multiple arguments or become shell syntax.",
    "Inputs that affect methods, headers, files, timeouts, redirects, retries, and output locations should be validated before curl runs.",
    "The goal is a request that another engineer can inspect."
  ]
};
