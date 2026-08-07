window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Producer and Consumer Authorization with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Authorize the authenticated producer principal",
      "language": "javascript",
      "blurb": "Producer identity comes from broker-authenticated connection context, not an attacker-controlled event.source field.",
      "code": "const grants = new Map([\n  [\"svc.billing\", new Set([\"invoice.created\", \"invoice.voided\"])],\n  [\"svc.accounts\", new Set([\"account.created\"])]\n]);\n\nexport function authorizePublish(brokerContext, eventType) {\n  const authentication = brokerContext?.authentication;\n  const principalId = brokerContext?.principalId;\n  if (authentication !== \"mTLS\" || typeof principalId !== \"string\" ||\n      !grants.get(principalId)?.has(eventType)) {\n    throw new Error(authentication === \"mTLS\" ? \"publish not authorized\" : \"producer unauthenticated\");\n  }\n  return Object.freeze({ principalId, eventType });\n}\n"
    },
    {
      "title": "Constrain consumer commands by service identity",
      "language": "javascript",
      "blurb": "The dispatcher maps authenticated consumer identities to named handlers instead of trusting a command name inside the message.",
      "code": "const consumerRoutes = new Map([\n  [\"svc.fulfillment\", \"reserveInventory\"],\n  [\"svc.mailer\", \"sendReceipt\"]\n]);\n\nexport async function dispatchConsumerCommand(context, envelope, handlers) {\n  const principalId = context?.principalId;\n  const authentication = context?.authentication;\n  const command = envelope?.command;\n  const payload = envelope?.payload;\n  const route = typeof principalId === \"string\"\n    ? consumerRoutes.get(principalId)\n    : undefined;\n  if (authentication !== \"broker-certificate\" || !route) {\n    throw new Error(\"consumer not authorized\");\n  }\n  if (command !== route) throw new Error(\"command does not match consumer grant\");\n  const handler = handlers instanceof Map\n    ? Map.prototype.get.call(handlers, route)\n    : undefined;\n  if (typeof handler !== \"function\") throw new TypeError(\"consumer handler unavailable\");\n  return handler(payload);\n}\n"
    }
  ]
};
