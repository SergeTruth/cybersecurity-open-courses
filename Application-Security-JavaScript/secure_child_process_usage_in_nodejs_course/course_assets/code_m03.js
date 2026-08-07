window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Understanding child_process APIs through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Describe child_process API security properties",
      "language": "javascript",
      "blurb": "The deeply immutable catalog records shell use, buffering, streaming, and IPC behavior so callers cannot alter the policy before review.",
      "code": "function deepFreeze(value) {\n  if (!value || typeof value !== \"object\" || Object.isFrozen(value)) return value;\n  for (const nested of Object.values(value)) deepFreeze(nested);\n  return Object.freeze(value);\n}\n\nexport const childProcessApis = deepFreeze({\n  spawn: { shellByDefault: false, streams: true, buffersOutput: false, ipc: false },\n  execFile: { shellByDefault: false, streams: false, buffersOutput: true, ipc: false },\n  exec: { shellByDefault: true, streams: false, buffersOutput: true, ipc: false },\n  fork: { shellByDefault: false, streams: true, buffersOutput: false, ipc: true }\n});\n\nexport function requireApi(name, property) {\n  if (!childProcessApis[name] || childProcessApis[name][property] !== true) {\n    throw new Error(\"child process API does not meet requirement\");\n  }\n  return name;\n}\n"
    },
    {
      "title": "Fork a fixed Node worker with constrained IPC",
      "language": "javascript",
      "blurb": "A logical worker name resolves through an application-owned module catalog, inherited arguments are removed, and every IPC message still requires validation.",
      "code": "import { fork } from \"node:child_process\";\n\nconst workerCatalog = new Map([\n  [\"document-parser\", \"/srv/app/workers/document-parser.js\"],\n  [\"metadata-parser\", \"/srv/app/workers/metadata-parser.js\"]\n]);\nexport function startParserWorker(workerName, signal) {\n  const workerModule = workerCatalog.get(workerName);\n  if (!workerModule) throw new Error(\"approved worker name required\");\n  return fork(workerModule, [], { execArgv: [\"--disable-proto=throw\"], env: { NODE_ENV: \"production\" },\n    cwd: \"/srv/app\", serialization: \"advanced\", signal, stdio: [\"ignore\", \"pipe\", \"pipe\", \"ipc\"] });\n}\n"
    }
  ]
};
