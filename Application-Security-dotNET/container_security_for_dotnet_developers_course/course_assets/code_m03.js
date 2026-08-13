window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Dockerfile and Build Pipeline Hardening' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Publish from locked inputs into a digest-pinned runtime",
      "language": "dockerfile",
      "blurb": "CI must supply digest-pinned SDK and runtime references. The build copies restore-affecting central props with the project and lock file before restoring, then copies the remaining source, publishes without network access, and places only the framework-dependent output in a non-root runtime with diagnostics disabled.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS restore\nWORKDIR /src\nCOPY Directory.Build.props Directory.Packages.props ./\nCOPY src/Orders.Api/Orders.Api.csproj src/Orders.Api/packages.lock.json ./src/Orders.Api/\nRUN dotnet restore src/Orders.Api/Orders.Api.csproj --locked-mode\n\nFROM restore AS publish\nCOPY src/Orders.Api/ ./src/Orders.Api/\nRUN --network=none dotnet publish src/Orders.Api/Orders.Api.csproj \\\n    --configuration Release --output /out --no-restore \\\n    -p:UseAppHost=false -p:ContinuousIntegrationBuild=true\n\nFROM ${RUNTIME_IMAGE} AS runtime\nWORKDIR /app\nCOPY --from=publish --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV ASPNETCORE_HTTP_PORTS=8080 DOTNET_EnableDiagnostics=0\nEXPOSE 8080\nENTRYPOINT [\"dotnet\", \"Orders.Api.dll\"]\n"
    },
    {
      "title": "Build only with canonical digest-pinned base references",
      "language": "bash",
      "blurb": "The clean-environment CI entry point validates both image references as canonical repository-plus-SHA-256 values, checks the Dockerfile and context, uses a reviewed Docker configuration, and asks BuildKit for SBOM and provenance attestations.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\numask 077\n\n[[ $# -eq 4 ]] || { /usr/bin/printf '%s\\n' 'usage: gate-build DOCKERFILE CONTEXT SDK_IMAGE RUNTIME_IMAGE' >&2; exit 2; }\nreadonly dockerfile=$1 context=$2 sdk_image=$3 runtime_image=$4\nreadonly image_pattern='^[a-z0-9][a-z0-9._/-]*@sha256:[a-f0-9]{64}$'\n[[ -f \"$dockerfile\" && -d \"$context\" && \"$sdk_image\" =~ $image_pattern && \"$runtime_image\" =~ $image_pattern ]] || {\n  /usr/bin/printf '%s\\n' 'container build inputs rejected' >&2\n  exit 3\n}\n[[ -x /usr/bin/docker && -d /etc/orders/docker ]] || { /usr/bin/printf '%s\\n' 'reviewed docker client unavailable' >&2; exit 4; }\n/usr/bin/env -i PATH='/usr/bin:/bin' HOME='/nonexistent' DOCKER_CONFIG='/etc/orders/docker' \\\n  /usr/bin/docker buildx build --file \"$dockerfile\" --build-context \"default=$context\" \\\n    --build-arg \"SDK_IMAGE=$sdk_image\" --build-arg \"RUNTIME_IMAGE=$runtime_image\" \\\n    --provenance=mode=max --sbom=true --pull --load \"$context\"\n"
    }
  ]
};
