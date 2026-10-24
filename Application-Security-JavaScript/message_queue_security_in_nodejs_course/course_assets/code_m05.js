window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Message Content, Secrets, and Data Exposure with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Project a safe message payload",
      "language": "javascript",
      "blurb": "The publisher builds an integration contract from selected fields instead of serializing an internal database record.",
      "code": "export function buildShipmentMessage(shipment, messageId) {\n  if (!shipment?.id || !shipment?.tenantId) throw new TypeError(\"shipment identity required\");\n  return { messageId, type: \"shipment.dispatched\", version: 1, payload: {\n    shipmentId: shipment.id, tenantId: shipment.tenantId, carrierCode: shipment.carrierCode,\n    dispatchedAt: new Date(shipment.dispatchedAt).toISOString()\n  } };\n}\n"
    },
    {
      "title": "Encrypt confidential queue content",
      "language": "javascript",
      "blurb": "Sensitive payload bytes are encrypted for the intended consumer while routing metadata remains minimal and non-secret.",
      "code": "function validEnvelopeText(value) {\n  return typeof value === \"string\" && value.length > 0 && value.length <= 128 &&\n    value.trim() === value && !/[\\u0000-\\u001f\\u007f]/.test(value);\n}\n\nexport async function protectQueuePayload(message, encryptForConsumer) {\n  if (!validEnvelopeText(message?.messageId) || !validEnvelopeText(message?.type) ||\n      !Number.isSafeInteger(message?.version) || message.version < 1 ||\n      !message.payload || typeof message.payload !== \"object\" || Array.isArray(message.payload)) {\n    throw new TypeError(\"queue envelope invalid\");\n  }\n  const context = Object.freeze({ audience: \"svc.fulfillment\", messageId: message.messageId,\n    type: message.type, version: message.version });\n  const protectedPayload = await encryptForConsumer(\n    Buffer.from(JSON.stringify(message.payload), \"utf8\"), context);\n  return { messageId: context.messageId, type: context.type, version: context.version, protectedPayload };\n}\n"
    }
  ]
};
