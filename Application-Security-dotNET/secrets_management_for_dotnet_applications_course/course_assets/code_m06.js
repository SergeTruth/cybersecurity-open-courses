window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'CI/CD, Containers, and Deployment Secrets' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Deploy only secret references in the application image",
      "language": "dockerfile",
      "blurb": "The locked build never accepts secret ARG values, and the runtime configuration contains only a canonical provider reference. The workload identity resolves the value after startup; no secret file or literal enters an image layer.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS build\nWORKDIR /src\nCOPY src/Notifications.Worker/Notifications.Worker.csproj src/Notifications.Worker/packages.lock.json ./\nRUN dotnet restore Notifications.Worker.csproj --locked-mode\nCOPY src/Notifications.Worker/ ./\nRUN --network=none dotnet publish Notifications.Worker.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=build --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV Secrets__Provider=vault \\\n    Secrets__NotificationKeyReference=vault://notifications/api-key/v7 \\\n    DOTNET_EnableDiagnostics=0\nENTRYPOINT [\"dotnet\", \"Notifications.Worker.dll\"]\n"
    },
    {
      "title": "Reject literal secrets in deployment environment evidence",
      "language": "bash",
      "blurb": "The gate parses a bounded JSON environment object, requires the exact nonsecret field set, validates a canonical versioned vault reference, and rejects unknown fields, non-string values, duplicate JSON members, and secret-shaped literal configuration.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 && ! -L $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-secret-env ENV.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json,os,re,stat,sys\npath=sys.argv[1]; info=os.stat(path,follow_symlinks=False)\nif not stat.S_ISREG(info.st_mode) or info.st_size > 16384: raise SystemExit('environment evidence rejected')\ndef unique(pairs):\n    out={}\n    for key,value in pairs:\n        if key in out: raise ValueError('duplicate member')\n        out[key]=value\n    return out\ndata=json.load(open(path,encoding='utf-8'),object_pairs_hook=unique)\nexpected={'Secrets__Provider','Secrets__NotificationKeyReference','DOTNET_EnableDiagnostics'}\nif not isinstance(data,dict) or set(data)!=expected or not all(isinstance(v,str) for v in data.values()): raise SystemExit('environment schema rejected')\nif data['Secrets__Provider']!='vault' or data['DOTNET_EnableDiagnostics']!='0': raise SystemExit('environment policy rejected')\nif re.fullmatch(r'vault://notifications/api-key/v[1-9][0-9]{0,5}',data['Secrets__NotificationKeyReference']) is None: raise SystemExit('secret reference rejected')\nPY\n"
    }
  ]
};
