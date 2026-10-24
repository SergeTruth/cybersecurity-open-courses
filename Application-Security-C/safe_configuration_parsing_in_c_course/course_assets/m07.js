window.COURSE_MODULE = {
  "title": "Paths, Resources, and Sensitive Settings",
  "graphicAlt": "Resource intent is checked before use, while sensitive-field diagnostics omit values.",
  "narration": "Configuration commonly points to files, directories, sockets, endpoints, resource names, credentials, tokens, keys, or other sensitive settings. Those values should be validated before the program opens, creates, modifies, deletes, connects, or logs anything based on them.\n\nPath-like values need basic shape checks such as empty value handling, length limits, allowed forms, and expected location. If a setting is meant to refer to an application directory, key file, data directory, or log path, the validation rule should match that intended scope.\n\nFile modes and resource roles matter. An input file, output file, directory, key material location, and temporary working directory have different expectations. The parser should not treat all strings as interchangeable paths. Later resource code should receive typed, validated intent where possible.\n\nSensitive settings require logging discipline. Credentials, tokens, keys, passwords, and private endpoints should not be printed in full during parse failures, startup diagnostics, or debug output. Logs may be retained, exported, searched, or accessible to more people than the runtime configuration.\n\nA useful pattern is to separate value validation from value display. The parser can verify that a sensitive value is present, within length limits, and formatted as expected while diagnostics report only the field name, source layer, and failure category. That gives operators useful information without exposing the value itself.",
  "narrationPoints": [
    "Configuration commonly points to files, directories, sockets, endpoints, resource names.",
    "Path-like values need basic shape checks such as empty value handling, length limits, allowed forms, and expected location.",
    "An input file, output file, directory, key material location, and temporary working directory have different expectations.",
    "Credentials, tokens, keys, passwords, and private endpoints should not be printed in full during parse failures.",
    "The parser can verify that a sensitive value is present, within length limits, and formatted as expected."
  ]
};
