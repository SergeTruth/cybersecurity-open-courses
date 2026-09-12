window.COURSE_CODE_MODULE = {
  "title": "Recognize the Boundary Violation",
  "codeIntro": "This isolated anti-pattern is independently type-checkable with TypeScript 7.0.2, target ES2022, and strict mode. It is deliberately unsafe: request data is inserted into the SQL program before the database API receives it.",
  "codeExamples": [
    {
      "title": "Insecure: concatenate request data into SQL",
      "language": "typescript",
      "blurb": "Never deploy this function. TypeScript still produces an ordinary string whose SQL structure can be influenced by the request value; the declarations make the unsafe boundary explicit without implying that the example is safe.",
      "code": `// Deliberately insecure teaching example. Do not deploy.
interface QueryRequest {
  readonly query: Readonly<Record<string, unknown>>;
}

interface UnsafeDatabase {
  query(sqlText: string): Promise<unknown>;
}

async function insecureEmailLookup(
  req: QueryRequest,
  db: UnsafeDatabase
): Promise<unknown> {
  const rawEmail = req.query.email;
  const email = typeof rawEmail === "string" ? rawEmail : "";

  // INSECURE: request data becomes part of the SQL program.
  const sqlText =
    "SELECT id, email FROM users WHERE email = '" +
    email +
    "'";

  return db.query(sqlText);
}`
    }
  ]
};
