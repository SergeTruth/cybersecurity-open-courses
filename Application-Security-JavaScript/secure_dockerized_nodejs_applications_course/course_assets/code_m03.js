window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Dockerfiles and Base Image Selection through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Render a pinned multi-stage Node.js Dockerfile",
      "language": "javascript",
      "blurb": "Build and runtime references carry independently verified canonical lowercase digests, must identify distinct image content, and the runtime stage copies application output and pruned production dependencies.",
      "code": "export function secureDockerfile(images) {\n  const digest = /^sha256:[a-f0-9]{64}$/;\n  const buildDigest = images?.buildDigest;\n  const runtimeDigest = images?.runtimeDigest;\n  if (typeof buildDigest !== \"string\" || typeof runtimeDigest !== \"string\" ||\n      !digest.test(buildDigest) || !digest.test(runtimeDigest) || buildDigest === runtimeDigest) {\n    throw new TypeError(\"two distinct canonical base image digests required\");\n  }\n  return [\n    \"FROM node:22-bookworm@\" + buildDigest + \" AS build\",\n    \"WORKDIR /app\", \"COPY package.json package-lock.json ./\", \"RUN npm ci --ignore-scripts\", \"COPY . .\", \"RUN npm run build\",\n    \"RUN npm prune --omit=dev --ignore-scripts\",\n    \"FROM node:22-bookworm-slim@\" + runtimeDigest, \"ENV NODE_ENV=production\", \"WORKDIR /app\",\n    \"COPY --from=build --chown=65532:65532 /app/dist ./dist\",\n    \"COPY --from=build --chown=65532:65532 /app/node_modules ./node_modules\",\n    \"COPY --from=build --chown=65532:65532 /app/package.json ./package.json\",\n    \"USER 65532:65532\", \"CMD [\\\"node\\\",\\\"dist/server.js\\\"]\"\n  ].join(\"\\n\") + \"\\n\";\n}\n"
    },
    {
      "title": "Reject floating or mutable base-image references",
      "language": "javascript",
      "blurb": "The review helper requires a digest and rejects latest tags, bare repositories, and build-stage images that differ from the approved registry policy.",
      "code": "const canonicalBaseImage =\n  /^([a-z0-9]+(?:[._-][a-z0-9]+)*(?:\\/[a-z0-9]+(?:[._-][a-z0-9]+)*)+)@sha256:([a-f0-9]{64})$/;\n\nexport function validateBaseImage(reference, approvedRepositories) {\n  if (typeof reference !== \"string\" || !(approvedRepositories instanceof Set)) {\n    throw new Error(\"pinned approved base image required\");\n  }\n  const match = reference.match(canonicalBaseImage);\n  if (!match || !Set.prototype.has.call(approvedRepositories, match[1])) {\n    throw new Error(\"pinned approved base image required\");\n  }\n  return Object.freeze({ repository: match[1], digest: \"sha256:\" + match[2] });\n}\n"
    }
  ]
};
