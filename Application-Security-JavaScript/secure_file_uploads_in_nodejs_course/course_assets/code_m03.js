window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Intake Controls, Authentication, and Upload Limits through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Enforce actual multipart bytes while streaming",
      "language": "javascript",
      "blurb": "A transform counts bytes received for one file and stops the pipeline immediately when the authenticated route's upload budget is exceeded.",
      "code": "import { Transform } from \"node:stream\";\nimport { pipeline } from \"node:stream/promises\";\n\nconst MAXIMUM_UPLOAD_BYTES = 100 * 1024 * 1024;\n\nexport async function receiveUploadStream(source, quarantineSink, maximumBytes) {\n  if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 1 ||\n      maximumBytes > MAXIMUM_UPLOAD_BYTES) {\n    throw new RangeError(\"upload byte limit invalid\");\n  }\n  let bytes = 0;\n  const meter = new Transform({\n    transform(chunk, _encoding, callback) {\n      if (!Buffer.isBuffer(chunk)) {\n        callback(new TypeError(\"upload stream must emit Buffer chunks\"));\n        return;\n      }\n      if (chunk.length > maximumBytes - bytes) {\n        callback(new RangeError(\"upload too large\"));\n        return;\n      }\n      bytes += chunk.length;\n      callback(null, chunk);\n    }\n  });\n  await pipeline(source, meter, quarantineSink);\n  return Object.freeze({ bytes });\n}\n"
    },
    {
      "title": "Reserve an authenticated subject upload slot",
      "language": "javascript",
      "blurb": "A durable quota store uses the application's validated clock and must return exact Boolean approval plus a canonical reservation identifier before upload begins.",
      "code": "const applicationClock = () => Date.now();\nconst identityPattern = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\nconst reservationIdPattern = /^[A-Za-z0-9_-]{2,128}$/;\n\nexport async function reserveUpload(store, auth) {\n  const subjectId = auth?.subjectId;\n  const tenantId = auth?.tenantId;\n  const rawReserveCapability = store?.reserve;\n  const reserve = typeof rawReserveCapability === \"function\"\n    ? rawReserveCapability.bind(store)\n    : null;\n  if (typeof subjectId !== \"string\" || !identityPattern.test(subjectId) ||\n      typeof tenantId !== \"string\" || !identityPattern.test(tenantId) || !reserve) {\n    throw new Error(\"validated authentication and quota store required\");\n  }\n  const now = applicationClock();\n  if (!Number.isSafeInteger(now) || now < 0) throw new Error(\"upload quota clock invalid\");\n  const day = new Date(now).toISOString().slice(0, 10);\n  const result = await reserve(Object.freeze({\n    tenantId, subjectId, day, concurrentLimit: 3, dailyLimit: 100\n  }));\n  const allowed = result?.allowed;\n  const reservationId = result?.reservationId;\n  if (!result || typeof result !== \"object\" || allowed !== true) {\n    if (allowed === false) throw new Error(\"upload quota exceeded\");\n    throw new Error(\"upload quota result invalid\");\n  }\n  if (typeof reservationId !== \"string\" || !reservationIdPattern.test(reservationId)) {\n    throw new Error(\"upload reservation identifier invalid\");\n  }\n  return Object.freeze({ reservationId });\n}\n"
    }
  ]
};
