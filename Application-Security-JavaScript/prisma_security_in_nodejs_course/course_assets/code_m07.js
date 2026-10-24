window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Updates, Nested Writes, Transactions, and Integrity with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Perform a constrained nested Prisma write",
      "language": "javascript",
      "blurb": "Inside one transaction, the server verifies every related product against the caller's tenant-visible catalog before performing the allowlisted nested write.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function createOrderWithItems(prisma, input, auth) {\n  scalarId(auth?.tenantId, \"authenticated tenant\"); scalarId(auth?.subjectId, \"authenticated subject\");\n  if (!auth?.tenantId || !auth?.subjectId || !Array.isArray(input?.items) || input.items.length < 1 || input.items.length > 50) {\n    throw new TypeError(\"invalid order\");\n  }\n  const items = input.items.map((item) => {\n    if (typeof item.productId !== \"string\" || !/^[A-Za-z0-9_-]{1,64}$/.test(item.productId) ||\n        !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 25) throw new TypeError(\"invalid order item\");\n    return { productId: item.productId, quantity: item.quantity };\n  });\n  const productIds = [...new Set(items.map((item) => item.productId))];\n  return prisma.$transaction(async (tx) => {\n    const products = await tx.product.findMany({\n      where: { id: { in: productIds }, tenantId: auth.tenantId, orderable: true }, select: { id: true }\n    });\n    const authorized = new Set(products.map((product) => product.id));\n    if (productIds.some((id) => !authorized.has(id))) throw new Error(\"product unavailable or unauthorized\");\n    return tx.order.create({ data: { tenantId: auth.tenantId, customerId: auth.subjectId, items: { create: items } },\n      select: { id: true, state: true, createdAt: true } });\n  });\n}\n"
    },
    {
      "title": "Keep a balance transfer inside one Prisma transaction",
      "language": "javascript",
      "blurb": "Both conditional updates must match exactly once; throwing rolls back the transaction when funds or tenant scope do not match.",
      "code": "export async function transferCredits(prisma, tenantId, fromId, toId, cents) {\n  const idPattern = /^[A-Za-z0-9_-]{1,64}$/;\n  const validId = (value) => typeof value === \"string\" && idPattern.test(value);\n  if (!validId(tenantId) || !validId(fromId) || !validId(toId) || fromId === toId) {\n    throw new TypeError(\"distinct tenant wallet ids required\");\n  }\n  if (!Number.isSafeInteger(cents) || cents < 1 || cents > 1_000_000) throw new RangeError(\"invalid transfer\");\n  return prisma.$transaction(async (tx) => {\n    const debit = await tx.wallet.updateMany({ where: { id: fromId, tenantId, balanceCents: { gte: cents } },\n      data: { balanceCents: { decrement: cents } } });\n    if (debit.count !== 1) throw new Error(\"debit rejected\");\n    const credit = await tx.wallet.updateMany({ where: { id: toId, tenantId }, data: { balanceCents: { increment: cents } } });\n    if (credit.count !== 1) throw new Error(\"credit rejected\");\n    return { transferred: cents };\n  });\n}\n"
    }
  ]
};
