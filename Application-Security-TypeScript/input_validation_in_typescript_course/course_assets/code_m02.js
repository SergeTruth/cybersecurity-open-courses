window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate at Trust Boundaries",
  "codeExamples": [
    {
      "title": "Parse Route, Query, and Header Inputs",
      "language": "typescript",
      "code": "type ListUsersInput = {\n  tenantId: string;\n  pageSize: number;\n  requestId: string;\n};\n\nexport function parseListUsersInput(req: Request): ListUsersInput {\n  const url = new URL(req.url);\n  const tenantId = url.pathname.split(\"/\").at(-2) ?? \"\";\n  const pageSize = Number(url.searchParams.get(\"pageSize\") ?? \"25\");\n  const requestId = req.headers.get(\"x-request-id\") ?? crypto.randomUUID();\n\n  if (!/^[a-z0-9_-]{3,40}$/.test(tenantId)) {\n    throw new Error(\"tenantId is invalid\");\n  }\n  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {\n    throw new Error(\"pageSize must be from 1 to 100\");\n  }\n  if (requestId.length > 80) {\n    throw new Error(\"requestId is too long\");\n  }\n\n  return { tenantId, pageSize, requestId };\n}"
    },
    {
      "title": "Validate Browser Storage and Message Events",
      "language": "typescript",
      "code": "type ThemePreference = \"light\" | \"dark\" | \"system\";\n\nexport function readThemePreference(storage: Storage): ThemePreference {\n  const value: unknown = storage.getItem(\"theme\");\n  return value === \"light\" || value === \"dark\" || value === \"system\" ? value : \"system\";\n}\n\ntype AppMessage = { type: \"refresh\"; source: \"trusted-widget\" };\n\nexport function parseAppMessage(event: MessageEvent<unknown>): AppMessage | undefined {\n  if (event.origin !== \"https://widgets.example.com\") {\n    return undefined;\n  }\n  if (typeof event.data !== \"object\" || event.data === null) {\n    return undefined;\n  }\n\n  const data = event.data as Record<string, unknown>;\n  return data.type === \"refresh\" && data.source === \"trusted-widget\"\n    ? { type: \"refresh\", source: \"trusted-widget\" }\n    : undefined;\n}"
    },
    {
      "title": "Validate Environment Variables Before Use",
      "language": "typescript",
      "code": "type RuntimeConfig = {\n  nodeEnv: \"development\" | \"test\" | \"production\";\n  port: number;\n  allowedOrigins: string[];\n};\n\nexport function loadRuntimeConfig(env: NodeJS.ProcessEnv): RuntimeConfig {\n  const nodeEnv = env.NODE_ENV;\n  const port = Number(env.PORT ?? \"3000\");\n  const allowedOrigins = (env.ALLOWED_ORIGINS ?? \"\").split(\",\").map((item) => item.trim()).filter(Boolean);\n\n  if (nodeEnv !== \"development\" && nodeEnv !== \"test\" && nodeEnv !== \"production\") {\n    throw new Error(\"NODE_ENV is invalid\");\n  }\n  if (!Number.isInteger(port) || port < 1 || port > 65535) {\n    throw new Error(\"PORT must be a TCP port number\");\n  }\n  if (nodeEnv === \"production\" && allowedOrigins.some((origin) => !origin.startsWith(\"https://\"))) {\n    throw new Error(\"production origins must use HTTPS\");\n  }\n\n  return { nodeEnv, port, allowedOrigins };\n}"
    }
  ]
};
