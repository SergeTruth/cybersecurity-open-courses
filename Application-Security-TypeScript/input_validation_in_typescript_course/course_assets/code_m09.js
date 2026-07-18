window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Compose a Complete Validation Flow",
  "codeExamples": [
    {
      "title": "Validate Boundary Input, Then Call Domain Logic",
      "language": "typescript",
      "code": "const TransferRequestSchema = z.object({\n  fromAccountId: z.string().uuid(),\n  toAccountId: z.string().uuid(),\n  amountCents: z.number().int().positive().max(100_000_00),\n  idempotencyKey: z.string().uuid(),\n}).strict();\n\ntype TransferRequest = z.infer<typeof TransferRequestSchema>;\n\nexport async function handleTransfer(caller: Caller, raw: unknown) {\n  const parsed = TransferRequestSchema.safeParse(raw);\n  if (!parsed.success) {\n    return { status: 400, body: { error: \"invalid transfer request\" } };\n  }\n\n  const transfer = await createTransfer(caller, parsed.data);\n  return { status: 202, body: { transferId: transfer.id } };\n}"
    },
    {
      "title": "Keep Business Invariants in the Domain Function",
      "language": "typescript",
      "code": "async function createTransfer(caller: Caller, request: TransferRequest) {\n  if (request.fromAccountId === request.toAccountId) {\n    throw new Error(\"cannot transfer to the same account\");\n  }\n\n  const fromAccount = await accounts.findAuthorized(caller, request.fromAccountId);\n  const toAccount = await accounts.findAuthorized(caller, request.toAccountId);\n\n  if (!fromAccount || !toAccount) {\n    throw new Error(\"account not found\");\n  }\n  if (fromAccount.balanceCents < request.amountCents) {\n    throw new Error(\"insufficient funds\");\n  }\n\n  return transfers.create({\n    ...request,\n    tenantId: caller.tenantId,\n    requestedBy: caller.id,\n  });\n}"
    }
  ]
};
