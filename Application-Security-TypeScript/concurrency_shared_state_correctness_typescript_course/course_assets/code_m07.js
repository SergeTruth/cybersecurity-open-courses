window.COURSE_CODE_MODULE = {
  "title": "Create overlap and inspect authoritative results",
  "codeIntro": "Conceptual integration-test pseudocode. Run against an isolated test datastore. The harness reserves enough separate connections and supplies a deadline-bound barrier.",
  "codeExamples": [
    {
      "title": "Start competing reservations together",
      "language": "typescript",
      "blurb": "A start barrier coordinates attempts; controlled hooks at vulnerable read/write boundaries can exercise specific schedules. Verify the harness is not silently serializing requests on one connection. This is a teaching example, not a test executed during the static course build.",
      "code": "await harness.seedInventory({ itemId, quantity: 1 });\nconst barrier = harness.createBarrier(10);\nconst attempts = Array.from({ length: 10 }, (_, index) =>\n  harness.withSeparateConnection(async connection => {\n    await barrier.arriveAndWait();\n    return harness.reserveOne({\n      connection, itemId, operationId: `reserve-${index}`\n    });\n  })\n);\nconst results = await Promise.allSettled(attempts);\nawait harness.assertEveryOutcomeIsExpected(results);\n\nconst state = await harness.readAuthoritativeState(itemId);\nexpect(state.quantity).toBe(0);\nexpect(state.committedReservations).toHaveLength(1);\nexpect(state.partialEffects).toHaveLength(0);"
    }
  ]
};
