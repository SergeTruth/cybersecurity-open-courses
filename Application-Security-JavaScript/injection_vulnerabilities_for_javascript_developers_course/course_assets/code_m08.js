window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Test Injection Controls",
  "codeExamples": [
    {
      "title": "Import and Test the Actual Control Module",
      "language": "javascript",
      "code": `import { describe, expect, it } from "vitest";
import DOMPurify from "dompurify";
import {
  buildResizeInvocation,
  buildTicketQuery,
  buildUserListQuery,
  evaluateRule,
  parseTicketFilter,
  renderEmail,
  safeExternalUrl,
  sanitizeArticleHtml,
  selectReportModule,
  updateProfile,
} from "./injection_controls.mjs";

describe("SQL controls", () => {
  it.each(["constructor", "__proto__", "toString"])(
    "rejects inherited mapping name %s",
    (name) => {
      expect(() => buildUserListQuery({ sortBy: name })).toThrow("unsupported");
      expect(() => buildUserListQuery({ direction: name })).toThrow("unsupported");
    },
  );

  it("keeps malicious search text in the parameter array", () => {
    const attack = "%' OR 1=1 --";
    const query = buildUserListQuery({ sortBy: "email", direction: "asc", searchText: attack });
    expect(query.text).toContain("ORDER BY email ASC");
    expect(query.text).not.toContain(attack);
    expect(query.values).toEqual(["%" + attack + "%", 50]);
  });
});

describe("document query controls", () => {
  it("rejects operators, inherited fields, and object values", () => {
    expect(() => parseTicketFilter({ $where: "return true" })).toThrow();
    expect(() => parseTicketFilter(Object.create({ status: "open" }))).toThrow();
    expect(() => parseTicketFilter({ status: { $ne: null } })).toThrow();
  });
  it("creates only application-owned fields", () => {
    expect(buildTicketQuery(parseTicketFilter({ status: "open" })))
      .toEqual({ status: "open" });
  });

  it("rejects a document operator in userId before updating", async () => {
    let called = false;
    const collection = {
      updateOne(query, update) {
        called = true;
        return { query, update };
      },
    };
    const body = { displayName: "Ada", timeZone: "UTC" };
    await expect(updateProfile(collection, { $ne: null }, body))
      .rejects.toThrow("userId is invalid");
    expect(called).toBe(false);

    const result = await updateProfile(collection, "user_1234", body);
    expect(result.query).toEqual({ user_id: "user_1234" });
  });
});

describe("process argument controls", () => {
  it.each(["-help.png", "a;touch-pwned.png", "../outside.png"])(
    "rejects dangerous filename %s",
    (inputName) => expect(() => buildResizeInvocation({
      inputName,
      size: "small",
      workDirectory: "/srv/app/private-resize/resize-test",
    })).toThrow(),
  );
  it("uses an absolute executable and a private generated output path", () => {
    const invocation = buildResizeInvocation({
      inputName: "photo.png",
      size: "small",
      workDirectory: "/srv/app/private-resize/resize-test",
    });
    expect(invocation.file).toBe("/usr/bin/magick");
    expect(invocation.args.at(-1))
      .toBe("/srv/app/private-resize/resize-test/result.png");
  });
});

describe("browser and HTML controls", () => {
  it.each([
    "javascript:alert(1)",
    "//evil.example/path",
    "https://evil.example/",
    "https://user:password@example.com/path",
    "https://example.com:4443/path",
  ])(
    "rejects dangerous URL %s",
    (value) => expect(() => safeExternalUrl(value)).toThrow(),
  );
  it("removes scripts, handlers, and unsafe URL schemes", () => {
    const clean = sanitizeArticleHtml(DOMPurify,
      '<p onclick="steal()">Hi<script>alert(1)</script><a href="javascript:bad()">x</a></p>');
    expect(clean).not.toMatch(/script|onclick|javascript:/i);
  });
});

describe("application-owned dispatch", () => {
  it.each(["constructor", "__proto__", "toString"])(
    "rejects unsupported rule, template, and module name %s",
    (name) => {
      expect(() => evaluateRule(
        { field: "purchaseTotal", operator: name, value: 1 },
        { purchaseTotal: 2 },
      )).toThrow();
      expect(() => renderEmail(name, { displayName: "Ada" })).toThrow();
      expect(() => selectReportModule(name)).toThrow();
    },
  );
});
`
    }
  ]
};
