window.COURSE_CODE_MODULE = {
  "title": "Recognize an Overly Broad Update",
  "codeIntro": "This isolated function is deliberately unsafe. Its repository receives an unknown request body as persistence capability without an operation contract, authorization scope, or explicit mapping.",
  "codeExamples": [
    {
      "title": "Direct request-to-ORM assignment",
      "language": "typescript",
      "blurb": "The explicit names and interface make this anti-pattern compile without suggesting that authentication or ORM schema awareness establishes field-level permission. Production code must use the later narrow boundaries.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
interface DangerouslyBroadAccountRepository {
  updateById(accountId: string, arbitraryData: unknown): Promise<void>;
}

async function deliberatelyUnsafeMassAssignmentDemo(
  repository: DangerouslyBroadAccountRepository,
  accountId: string,
  requestBody: unknown
): Promise<void> {
  // INSECURE ANTI-PATTERN: external data becomes persistence capability.
  await repository.updateById(accountId, requestBody);
}`
    }
  ]
};
