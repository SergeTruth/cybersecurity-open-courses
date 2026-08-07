window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Configuration, Headers, CORS, and Deployment Context with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Allowlist CORS origins with credentials",
      "language": "javascript",
      "blurb": "Credentialed cross-origin requests receive one exact approved origin; unknown and missing origins do not get reflective access.",
      "code": "const approvedOrigins = new Set([\n  \"https://app.example.com\", \"https://admin.example.com\"\n]);\n\nexport function corsHeaders(origin) {\n  if (typeof origin !== \"string\" || !approvedOrigins.has(origin)) return null;\n  return Object.freeze({\n    \"Access-Control-Allow-Origin\": origin,\n    \"Access-Control-Allow-Credentials\": \"true\",\n    \"Access-Control-Allow-Methods\": \"GET,POST,PATCH\",\n    \"Access-Control-Allow-Headers\": \"Content-Type,X-CSRF-Token\",\n    \"Access-Control-Max-Age\": \"600\",\n    Vary: \"Origin\"\n  });\n}\n"
    },
    {
      "title": "Apply a baseline REST security-header policy",
      "language": "javascript",
      "blurb": "The middleware sets a narrow policy and disables framework disclosure without confusing headers with authentication or authorization.",
      "code": "export function securityHeaders(request, response, next) {\n  const secure = request?.secure;\n  const rawRemoveHeader = response?.removeHeader;\n  const rawSetHeader = response?.setHeader;\n  if (typeof secure !== \"boolean\" || typeof rawRemoveHeader !== \"function\" ||\n      typeof rawSetHeader !== \"function\" || typeof next !== \"function\") {\n    throw new TypeError(\"HTTP middleware contract invalid\");\n  }\n  const removeHeader = rawRemoveHeader.bind(response);\n  const setHeader = rawSetHeader.bind(response);\n  removeHeader(\"X-Powered-By\");\n  setHeader(\"X-Content-Type-Options\", \"nosniff\");\n  setHeader(\"Referrer-Policy\", \"no-referrer\");\n  setHeader(\"Permissions-Policy\", \"camera=(), microphone=(), geolocation=()\");\n  setHeader(\"Content-Security-Policy\", \"default-src 'none'; frame-ancestors 'none'\");\n  if (secure) {\n    setHeader(\"Strict-Transport-Security\", \"max-age=31536000; includeSubDomains\");\n  }\n  return next();\n}\n"
    }
  ]
};
