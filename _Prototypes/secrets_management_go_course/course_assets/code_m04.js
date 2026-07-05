window.COURSE_CODE_MODULE = {
  "title": "Redaction Helpers",
  "codeIntro": "These examples make accidental printing safer by controlling how secret-bearing values are represented.",
  "codeExamples": [
    {
      "title": "Safe String Representation",
      "language": "go",
      "blurb": "A String method can expose useful context while hiding the sensitive fields.",
      "code": "package config\n\nimport \"fmt\"\n\ntype DatabaseConfig struct {\n    Host     string\n    Name     string\n    User     string\n    Password string\n}\n\nfunc (c DatabaseConfig) String() string {\n    return fmt.Sprintf(\n        \"DatabaseConfig{Host:%q, Name:%q, User:%q, Password:%s}\",\n        c.Host,\n        c.Name,\n        c.User,\n        \"[REDACTED]\",\n    )\n}"
    }
  ]
};
