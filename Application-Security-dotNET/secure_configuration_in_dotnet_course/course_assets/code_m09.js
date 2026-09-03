window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Cloud, Container, CI/CD, and Operational Configuration' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Keep operational configuration explicit and nonsecret",
      "language": "dockerfile",
      "blurb": "The runtime sets only reviewed nonsecret defaults and a configuration revision, leaves credentials to the secret provider, disables diagnostics, and uses a non-root identity. Deployment may override only fields admitted by the application schema.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nARG CONFIG_REVISION\nFROM ${SDK_IMAGE} AS publish\nWORKDIR /src\nCOPY src/Shipping.Api/Shipping.Api.csproj src/Shipping.Api/packages.lock.json ./\nRUN dotnet restore Shipping.Api.csproj --locked-mode\nCOPY src/Shipping.Api/ ./\nRUN --network=none dotnet publish Shipping.Api.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${RUNTIME_IMAGE}\nARG CONFIG_REVISION\nWORKDIR /app\nCOPY --from=publish --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV ASPNETCORE_ENVIRONMENT=Production \\\n    ASPNETCORE_HTTP_PORTS=8080 \\\n    Orders__MaximumBatchSize=100 \\\n    Configuration__Revision=$CONFIG_REVISION \\\n    DOTNET_EnableDiagnostics=0\nENTRYPOINT [\"dotnet\", \"Shipping.Api.dll\"]\n"
    },
    {
      "title": "Validate the exact production configuration schema",
      "language": "bash",
      "blurb": "The validator loads a bounded duplicate-free JSON object, requires the complete nonsecret production field set, validates primitive types and application ranges, rejects unknown fields, and requires a canonical configuration revision digest.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 && ! -L $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-config CONFIG.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json,os,re,stat,sys\npath=sys.argv[1]; st=os.stat(path,follow_symlinks=False)\nif not stat.S_ISREG(st.st_mode) or st.st_size > 32768: raise SystemExit('configuration file rejected')\ndef unique(pairs):\n    out={}\n    for k,v in pairs:\n        if k in out: raise ValueError('duplicate configuration member')\n        out[k]=v\n    return out\nd=json.load(open(path,encoding='utf-8'),object_pairs_hook=unique)\nif not isinstance(d,dict) or set(d)!={'environment','httpPort','maximumBatchSize','configurationRevision'}: raise SystemExit('configuration schema rejected')\nif d['environment']!='Production' or d['httpPort']!=8080 or type(d['maximumBatchSize']) is not int or not 1<=d['maximumBatchSize']<=100: raise SystemExit('configuration values rejected')\nif not isinstance(d['configurationRevision'],str) or re.fullmatch(r'[a-f0-9]{64}',d['configurationRevision']) is None: raise SystemExit('configuration revision rejected')\nPY\n"
    }
  ]
};
