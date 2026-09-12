window.COURSE_CODE_MODULE = {
  "title": "Keep the related changes in one transaction",
  "codeIntro": "Conceptual TypeScript adapter contract, not a specific ORM API. The transaction and every participating query must use the same database transaction context.",
  "codeExamples": [
    {
      "title": "Reserve inventory and record the reservation together",
      "language": "typescript",
      "blurb": "The decrement is a conditional atomic mutation. If inserting the reservation fails, the adapter rolls back both changes. Use appropriate isolation for any additional predicates. The reservation ID is fixed for the logical operation.",
      "code": "const reservation = await db.transaction(async tx => {\n  const changed = await tx.decrementIfAvailable({\n    tenantId: auth.tenantId, itemId\n  });\n  if (changed.affectedRows !== 1) {\n    throw new AvailabilityConflictError();\n  }\n  return tx.insertReservation({\n    id: reservationId,\n    tenantId: auth.tenantId,\n    itemId\n  });\n});\n// Return success only after the transaction commits.\n// Do not send email or call a payment service inside this block."
    }
  ]
};
