window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Image Supply Chain, Vulnerabilities, and SBOMs' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Label a locked build for supply-chain correlation",
      "language": "dockerfile",
      "blurb": "Digest-pinned build inputs and locked restore remain external CI requirements, while canonical revision and source arguments become OCI labels. Publication is network-disabled and the runtime contains only the reviewed output.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nARG SOURCE_REPOSITORY\nARG SOURCE_REVISION\nFROM ${SDK_IMAGE} AS build\nWORKDIR /src\nCOPY src/Inventory.Api/Inventory.Api.csproj src/Inventory.Api/packages.lock.json ./\nRUN dotnet restore Inventory.Api.csproj --locked-mode\nCOPY src/Inventory.Api/ ./\nRUN --network=none dotnet publish Inventory.Api.csproj -c Release -o /out --no-restore -p:UseAppHost=false -p:ContinuousIntegrationBuild=true\n\nFROM ${RUNTIME_IMAGE}\nARG SOURCE_REPOSITORY\nARG SOURCE_REVISION\nLABEL org.opencontainers.image.source=$SOURCE_REPOSITORY \\\n      org.opencontainers.image.revision=$SOURCE_REVISION\nWORKDIR /app\nCOPY --from=build --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV ASPNETCORE_HTTP_PORTS=8080 DOTNET_EnableDiagnostics=0\nENTRYPOINT [\"dotnet\", \"Inventory.Api.dll\"]\n"
    },
    {
      "title": "Require SBOM and provenance output from BuildKit",
      "language": "bash",
      "blurb": "The release wrapper validates canonical commit and digest references, uses a reviewed Docker client configuration, writes an OCI image plus provenance and SBOM attestations to an explicit output directory, and never accepts mutable base-image tags.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\numask 077\n[[ $# -eq 6 ]] || { /usr/bin/printf '%s\\n' 'usage: attest-build DOCKERFILE CONTEXT OUTPUT SDK_IMAGE RUNTIME_IMAGE REVISION' >&2; exit 2; }\nreadonly dockerfile=$1 context=$2 output=$3 sdk=$4 runtime=$5 revision=$6\nreadonly ref_re='^[a-z0-9][a-z0-9._/-]*@sha256:[a-f0-9]{64}$'\n[[ -f $dockerfile && -d $context && ! -e $output && $sdk =~ $ref_re && $runtime =~ $ref_re && $revision =~ ^[a-f0-9]{40}$ ]] || { /usr/bin/printf '%s\\n' 'attested build inputs rejected' >&2; exit 3; }\n/usr/bin/install -d -m 0700 -- \"$output\"\n[[ -x /usr/bin/docker && -d /etc/orders/docker ]] || exit 4\n/usr/bin/env -i PATH='/usr/bin:/bin' HOME='/nonexistent' DOCKER_CONFIG='/etc/orders/docker' \\\n  /usr/bin/docker buildx build --file \"$dockerfile\" --build-arg \"SDK_IMAGE=$sdk\" \\\n    --build-arg \"RUNTIME_IMAGE=$runtime\" --build-arg \"SOURCE_REVISION=$revision\" \\\n    --build-arg 'SOURCE_REPOSITORY=https://git.example.com/orders/inventory' \\\n    --provenance=mode=max --sbom=true --output \"type=oci,dest=$output/image.tar\" \"$context\"\n"
    }
  ]
};
