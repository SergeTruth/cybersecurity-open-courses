window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "The failure boundary below assumes a vetted wrapper that releases no plaintext before authentication completes. Named error and audit helpers are conceptual application components.",
  "codeExamples": [
    {
      "title": "Return a controlled failure without logging secrets",
      "language": "typescript",
      "blurb": "Authorization precedes decryption; the vetted crypto wrapper never releases provisional plaintext. auditQueue.tryEnqueue is an application-owned synchronous, bounded, nonblocking boolean operation; slow sinks run separately. Classification is checked against a finite vocabulary, and correlation IDs are server-generated. Classification or enqueue failures cannot replace ProtectedDataUnavailable. Expose the local saturating drop counter to a separate metrics or health scrape, without recursive telemetry; that monitoring integration is outside this excerpt.",
      "code": "let droppedCryptoEvents = 0;\n\nfunction recordCryptoFailure(error: unknown, requestId: string): void {\n  try {\n    const category: unknown = classifyCryptoFailure(error);\n    if (category !== \"authentication_failed\" &&\n        category !== \"key_unavailable\" && category !== \"internal\") {\n      throw new Error(\"Invalid crypto failure category\");\n    }\n    if (typeof requestId !== \"string\" || requestId.length > 128 ||\n        !/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(requestId)) {\n      throw new Error(\"Invalid correlation identifier\");\n    }\n    if (auditQueue.tryEnqueue(Object.freeze({\n      requestId,\n      operation: \"record-decrypt\",\n      outcome: category\n    })) === true) return;\n  } catch {\n    // Never log raw errors or invoke another telemetry sink here.\n  }\n  droppedCryptoEvents = Math.min(\n    droppedCryptoEvents + 1, Number.MAX_SAFE_INTEGER\n  );\n}\n\nconst resource = await repository.findAuthorized(auth, recordId);\ntry {\n  return await cryptoService.decryptForResource(resource);\n} catch (error) {\n  recordCryptoFailure(error, requestId);\n  throw new ProtectedDataUnavailable();\n}\n// Tests: bad tag/AAD => no plaintext or protected side effect.\n// Full/throwing audit queue => the same safe failure, plus a local drop.\n// Also test historical reads, retired-key rejection, and no key fallback."
    }
  ]
};
