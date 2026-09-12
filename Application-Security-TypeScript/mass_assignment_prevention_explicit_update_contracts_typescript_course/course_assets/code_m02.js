window.COURSE_CODE_MODULE = {
  "title": "Define a Contract for One Operation",
  "codeIntro": "The source-level contract exposes only profile presentation fields, independently of the larger persistence and response models. Module 3 adds the required runtime boundary.",
  "codeExamples": [
    {
      "title": "Narrow profile-update request",
      "language": "typescript",
      "blurb": "The type documents developer intent but does not validate JSON or remove extra properties. Role changes use a separate command and authorization path rather than adding role to this contract.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const SUPPORTED_TIMEZONES = Object.freeze([
  "UTC",
  "America/New_York",
  "Europe/London"
] as const);

type SupportedTimezone = typeof SUPPORTED_TIMEZONES[number];

type UpdateProfileRequest = Readonly<{
  displayName?: string;
  timezone?: SupportedTimezone;
}>;

type AccountResponse = Readonly<{
  publicId: string;
  displayName: string;
  timezone: SupportedTimezone;
  role: "member" | "manager" | "administrator";
}>;

// Do not use Partial<AccountResponse>, a database entity, or an ORM-generated
// update type as public input. TypeScript types are not runtime filters.`
    }
  ]
};
