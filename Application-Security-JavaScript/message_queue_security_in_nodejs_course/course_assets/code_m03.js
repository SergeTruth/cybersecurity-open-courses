window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Producer, Consumer, and Broker Permissions with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Declare least-privilege queue grants",
      "language": "javascript",
      "blurb": "Publish and consume permissions name exact exchanges, routing keys, and queues rather than granting broker-wide wildcards.",
      "code": "export const brokerGrants = Object.freeze({\n  \"svc.orders\": Object.freeze({ publish: Object.freeze([Object.freeze({ exchange: \"orders\", routingKey: \"order.created\" })]), consume: Object.freeze([]) }),\n  \"svc.fulfillment\": Object.freeze({ publish: Object.freeze([]), consume: Object.freeze([Object.freeze({ queue: \"fulfillment.order-created\" })]) })\n});\nexport function mayPublish(principalId, exchange, routingKey) {\n  return typeof principalId === \"string\" && Object.hasOwn(brokerGrants, principalId) &&\n    brokerGrants[principalId].publish.some(grant => grant.exchange === exchange && grant.routingKey === routingKey);\n}\n"
    },
    {
      "title": "Validate broker-authenticated consumer context",
      "language": "javascript",
      "blurb": "Consumer authorization uses the principal established by the broker connection and checks the exact queue grant.",
      "code": "export function authorizeConsume(context, queueName, grants) {\n  if (context?.authentication !== \"mTLS\" || typeof context.principalId !== \"string\") {\n    throw new Error(\"consumer authentication required\");\n  }\n  const queues = grants.get(context.principalId) ?? new Set();\n  if (!queues.has(queueName)) throw new Error(\"queue consume denied\");\n  return { principalId: context.principalId, queueName };\n}\n"
    }
  ]
};
