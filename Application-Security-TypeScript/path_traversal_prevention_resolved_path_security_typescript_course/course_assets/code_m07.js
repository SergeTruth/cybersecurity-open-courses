window.COURSE_CODE_MODULE = {
  "title": "Test Path Relationships",
  "codeIntro": "Boundary tests cover both supported path models, positive controls, absolute and sibling escapes, root equality, object authorization, filesystem indirection, bounded creation, and incomplete-file cleanup.",
  "codeExamples": [
    {
      "title": "Exercise path and storage security contracts",
      "language": "typescript",
      "blurb": "The fixture uses node:path.posix and node:path.win32 in their corresponding roots and the production façades from modules 2–6 with trusted fakes. OS-specific adapter conformance tests must additionally create real symlinks, hard links, junctions, replacement races, short writes, and cleanup failures on every supported deployment platform.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type Principal = Readonly<{ opaquePrincipal: true }>;

interface LexicalRootUnderTest {
  resolveChild(requested: unknown, allowRoot: boolean): string;
}

interface DownloadServiceUnderTest {
  download(principal: Principal, attachmentId: unknown): Promise<Uint8Array>;
}

interface UploadServiceUnderTest {
  upload(principal: Principal, bytes: number): Promise<Readonly<{
    storedName: string;
    bytesWritten: number;
  }>>;
}

interface ExportResolverUnderTest {
  resolve(frameworkDecodedName: unknown): string;
}

interface StorageTestControl {
  allowAttachment(principal: Principal, attachmentId: string): void;
  denyAttachment(principal: Principal, attachmentId: string): void;
  makeTargetLink(): void;
  failUploadAfter(bytes: number): void;
  readonly downloadOpenCount: number;
  readonly incompleteFiles: number;
  readonly replacementWasAllowed: boolean;
}

type PathSecurityFixture = Readonly<{
  posixRoot: LexicalRootUnderTest;
  windowsRoot: LexicalRootUnderTest;
  downloads: DownloadServiceUnderTest;
  uploads: UploadServiceUnderTest;
  exports: ExportResolverUnderTest;
  storage: StorageTestControl;
  principalA: Principal;
  principalB: Principal;
}>;

type FixtureFactory = () => PathSecurityFixture;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function expectThrow(action: () => unknown): void {
  try {
    action();
  } catch {
    return;
  }
  throw new Error("expected rejection");
}

async function expectReject(action: () => Promise<unknown>): Promise<void> {
  try {
    await action();
  } catch {
    return;
  }
  throw new Error("expected rejection");
}

async function runPathSecurityRegressionTests(
  createFixture: FixtureFactory
): Promise<void> {
  {
    const fixture = createFixture();
    assert(
      fixture.posixRoot.resolveChild("reports/one.pdf", false) ===
        "/srv/app/files/reports/one.pdf",
      "POSIX positive control failed"
    );
    expectThrow(() => fixture.posixRoot.resolveChild(
      "../files-backup/report.pdf", false
    ));
    expectThrow(() => fixture.posixRoot.resolveChild(".", false));
    expectThrow(() => fixture.posixRoot.resolveChild("/etc/passwd", false));
    expectThrow(() => fixture.posixRoot.resolveChild("bad\\u0000name", false));
  }

  {
    const fixture = createFixture();
    assert(
      fixture.windowsRoot.resolveChild("reports\\\\one.pdf", false) ===
        "C:\\\\srv\\\\app\\\\files\\\\reports\\\\one.pdf",
      "Windows positive control failed"
    );
    expectThrow(() => fixture.windowsRoot.resolveChild(
      "..\\\\files-backup\\\\report.pdf", false
    ));
    expectThrow(() => fixture.windowsRoot.resolveChild(
      "C:\\\\outside.txt", false
    ));
    expectThrow(() => fixture.windowsRoot.resolveChild(
      "D:outside.txt", false
    ));
    expectThrow(() => fixture.windowsRoot.resolveChild(
      "\\\\\\\\server\\\\share\\\\outside.txt", false
    ));
  }

  {
    const fixture = createFixture();
    assert(fixture.exports.resolve("report_2026.csv").endsWith(
      "report_2026.csv"
    ), "export-name positive control failed");
    expectThrow(() => fixture.exports.resolve("CON.csv"));
    expectThrow(() => fixture.exports.resolve("file:stream.csv"));
    expectThrow(() => fixture.exports.resolve("../report.csv"));
  }

  {
    const fixture = createFixture();
    const id = "att_0123456789abcdef0123456789abcdef";
    fixture.storage.allowAttachment(fixture.principalA, id);
    const body = await fixture.downloads.download(fixture.principalA, id);
    assert(body.byteLength > 0, "download positive control failed");
    assert(fixture.storage.downloadOpenCount === 1,
      "authorized file must be opened exactly once");
  }

  {
    const fixture = createFixture();
    const id = "att_0123456789abcdef0123456789abcdef";
    fixture.storage.denyAttachment(fixture.principalB, id);
    await expectReject(() => fixture.downloads.download(
      fixture.principalB, id
    ));
    assert(fixture.storage.downloadOpenCount === 0,
      "cross-tenant denial must occur before open");
  }

  {
    const fixture = createFixture();
    const id = "att_0123456789abcdef0123456789abcdef";
    fixture.storage.allowAttachment(fixture.principalA, id);
    fixture.storage.makeTargetLink();
    await expectReject(() => fixture.downloads.download(
      fixture.principalA, id
    ));
    assert(fixture.storage.downloadOpenCount === 0,
      "link targets must be rejected before data is returned");
  }

  {
    const fixture = createFixture();
    const upload = await fixture.uploads.upload(
      fixture.principalA,
      1024
    );
    assert(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}\\.upload$/.test(upload.storedName),
      "storage name was not generated by the server");
    assert(upload.bytesWritten === 1024, "byte count mismatch");
    assert(!fixture.storage.replacementWasAllowed,
      "exclusive creation permitted replacement");
  }

  {
    const fixture = createFixture();
    await expectReject(() => fixture.uploads.upload(
      fixture.principalA,
      26_214_401
    ));
    assert(fixture.storage.incompleteFiles === 0,
      "failed upload left a partial file");
  }

  {
    const fixture = createFixture();
    fixture.storage.failUploadAfter(512);
    await expectReject(() => fixture.uploads.upload(
      fixture.principalA,
      1024
    ));
    assert(fixture.storage.incompleteFiles === 0,
      "short write left a partial file");
  }
}`
    }
  ]
};
