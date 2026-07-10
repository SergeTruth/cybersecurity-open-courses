window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating Multiple Input Sources",
  "codeExamples": [
    {
      "title": "Code Example: Validating Multiple Input Sources",
      "language": "javascript",
      "code": "function parsePositiveInteger(value, name, maximum) {\n  const number = Number(value);\n  if (!Number.isInteger(number) || number < 1 || number > maximum) {\n    throw new Error(`${name} must be an integer from 1 to ${maximum}`);\n  }\n  return number;\n}\n\nfunction parseShortText(value, name, maximum) {\n  if (typeof value !== \"string\") {\n    throw new Error(`${name} must be text`);\n  }\n\n  const text = value.trim();\n  if (text.length === 0 || text.length > maximum) {\n    throw new Error(`${name} must be 1 to ${maximum} characters`);\n  }\n  return text;\n}\n\nconst query = new URLSearchParams(\"?pageSize=25\");\nconst storageValue = JSON.parse('{\"displayName\":\"Ada\"}');\n\nconst pageSize = parsePositiveInteger(query.get(\"pageSize\"), \"pageSize\", 100);\nconst displayName = parseShortText(storageValue.displayName, \"displayName\", 80);\n\nconsole.log({ pageSize, displayName });"
    }
  ]
};
