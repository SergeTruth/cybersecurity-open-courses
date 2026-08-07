window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Choosing Node.js Process APIs Safely through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Choose a process API from explicit requirements",
      "language": "javascript",
      "blurb": "The selector accepts an exact own-data Boolean requirement record and chooses one explicit Node process API; shell interpretation always requires a separate review.",
      "code": "const REQUIREMENT_FIELDS = new Set([\n  \"shellSyntax\", \"nodeIpc\", \"streams\", \"boundedResult\"\n]);\n\nfunction exactDataRecord(value, fields) {\n  if (!value || typeof value !== \"object\" || Array.isArray(value) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return null;\n  const descriptors = Object.getOwnPropertyDescriptors(value);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length !== fields.size || keys.some((key) =>\n      typeof key !== \"string\" || !fields.has(key) ||\n      !descriptors[key].enumerable || !(\"value\" in descriptors[key]))) return null;\n  return Object.freeze(Object.fromEntries(\n    keys.map((key) => [key, descriptors[key].value])\n  ));\n}\n\nexport function selectProcessApi(requirements) {\n  const selected = exactDataRecord(requirements, REQUIREMENT_FIELDS);\n  if (!selected) throw new TypeError(\"exact process requirements required\");\n  const shellSyntax = selected.shellSyntax;\n  const nodeIpc = selected.nodeIpc;\n  const streams = selected.streams;\n  const boundedResult = selected.boundedResult;\n  if ([shellSyntax, nodeIpc, streams, boundedResult]\n      .some((value) => typeof value !== \"boolean\")) {\n    throw new TypeError(\"Boolean process requirements required\");\n  }\n  if (shellSyntax) {\n    throw new Error(\"shell interpretation requires separate security review\");\n  }\n  if (Number(nodeIpc) + Number(streams) + Number(boundedResult) !== 1) {\n    throw new TypeError(\"process requirements must select exactly one API\");\n  }\n  if (nodeIpc) return \"fork\";\n  if (streams) return \"spawn\";\n  return \"execFile\";\n}\n"
    },
    {
      "title": "Run a fixed executable with execFile",
      "language": "javascript",
      "blurb": "An absolute executable, argument array, minimal environment, timeout, and output ceiling demonstrate the buffered execFile boundary without invoking a shell.",
      "code": "import { execFile } from \"node:child_process\";\nimport { promisify } from \"node:util\";\nconst execFileAsync = promisify(execFile);\n\nexport async function readGitRevision(repositoryRoot) {\n  const result = await execFileAsync(\"/usr/bin/git\", [\"rev-parse\", \"--verify\", \"HEAD\"], {\n    cwd: repositoryRoot, env: { PATH: \"/usr/bin:/bin\", LANG: \"C\" }, timeout: 3000, maxBuffer: 64 * 1024,\n    windowsHide: true, shell: false\n  });\n  return result.stdout.trim();\n}\n"
    }
  ]
};
