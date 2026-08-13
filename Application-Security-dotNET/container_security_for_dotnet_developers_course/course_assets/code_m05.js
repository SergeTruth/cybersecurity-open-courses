window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secrets, Configuration, and Environment Separation' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Use a BuildKit secret only during package restore",
      "language": "dockerfile",
      "blurb": "A required NuGet configuration is mounted as an ephemeral BuildKit secret for the restore instruction, never copied or declared as an ARG or ENV value, and the final runtime receives only published binaries.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS build\nWORKDIR /src\nCOPY src/Billing.Api/Billing.Api.csproj src/Billing.Api/packages.lock.json ./\nRUN --mount=type=secret,id=nuget_config,required=true \\\n    NUGET_CREDENTIALPROVIDER_SESSIONTOKENCACHE_ENABLED=false \\\n    dotnet restore Billing.Api.csproj --locked-mode --configfile /run/secrets/nuget_config\nCOPY src/Billing.Api/ ./\nRUN --network=none dotnet publish Billing.Api.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=build --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV ASPNETCORE_HTTP_PORTS=8080 DOTNET_EnableDiagnostics=0\nENTRYPOINT [\"dotnet\", \"Billing.Api.dll\"]\n"
    },
    {
      "title": "Reject Dockerfiles that persist secret-shaped configuration",
      "language": "bash",
      "blurb": "The source gate reads a bounded regular Dockerfile, rejects secret-bearing ARG, ENV, COPY, and ADD instructions, requires a BuildKit secret mount for private restore, and does not rely on a keyword scan of image history after disclosure already occurred.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 && ! -L $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-secret-build Dockerfile' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport os, re, stat, sys\npath=sys.argv[1]; info=os.stat(path, follow_symlinks=False)\nif not stat.S_ISREG(info.st_mode) or info.st_size > 256*1024: raise SystemExit('Dockerfile type or size rejected')\ntext=open(path, encoding='utf-8').read()\nfor line in text.splitlines():\n    code=line.strip()\n    if re.match(r'(?i)^(ARG|ENV)\\s+.*(PASSWORD|TOKEN|SECRET|API_KEY)', code): raise SystemExit('persistent secret variable rejected')\n    if re.match(r'(?i)^(COPY|ADD)\\s+.*(\\.env|nuget\\.config|\\.pem|\\.pfx)', code): raise SystemExit('secret-bearing copy rejected')\nif '--mount=type=secret,id=nuget_config,required=true' not in text: raise SystemExit('required BuildKit secret mount missing')\nif '/run/secrets/nuget_config' not in text: raise SystemExit('restore does not consume mounted secret')\nPY\n"
    }
  ]
};
