window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Malware Scanning, Quarantine, and Processing Pipelines' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Run the quarantine scanner as a dedicated non-root worker",
      "language": "dockerfile",
      "blurb": "The scanner worker is built from locked dependencies, runs as a fixed non-root identity with diagnostics disabled, receives no public HTTP port, and expects quarantine and signature-database capabilities to be mounted read-only or writable according to deployment policy.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS build\nWORKDIR /src\nCOPY src/Upload.Scanner/Upload.Scanner.csproj src/Upload.Scanner/packages.lock.json ./\nRUN dotnet restore Upload.Scanner.csproj --locked-mode\nCOPY src/Upload.Scanner/ ./\nRUN --network=none dotnet publish Upload.Scanner.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=build --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV DOTNET_EnableDiagnostics=0 \\\n    Scanner__QuarantineRoot=/work/quarantine \\\n    Scanner__SignatureRoot=/signatures\nENTRYPOINT [\"dotnet\", \"Upload.Scanner.dll\"]\n"
    },
    {
      "title": "Validate exact malware-scanner result evidence",
      "language": "bash",
      "blurb": "The gate parses a bounded duplicate-free JSON result, admits only exact clean, infected, or error outcomes, validates low-cardinality engine and signature-version identifiers, and requires a canonical object ID without accepting scanner prose as trusted control data.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 && ! -L $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-scan-result RESULT.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json,os,re,stat,sys\np=sys.argv[1]; st=os.stat(p,follow_symlinks=False)\nif not stat.S_ISREG(st.st_mode) or st.st_size > 8192: raise SystemExit('scanner result rejected')\ndef unique(pairs):\n    out={}\n    for k,v in pairs:\n        if k in out: raise ValueError('duplicate member')\n        out[k]=v\n    return out\nd=json.load(open(p,encoding='utf-8'),object_pairs_hook=unique)\nif not isinstance(d,dict) or set(d)!={'objectId','outcome','engine','signatureVersion'}: raise SystemExit('scanner result schema rejected')\nif re.fullmatch(r'[a-f0-9]{48}',d.get('objectId','')) is None or d.get('outcome') not in ('clean','infected','error'): raise SystemExit('scanner result values rejected')\nif re.fullmatch(r'[a-z0-9][a-z0-9._-]{0,31}',d.get('engine','')) is None or re.fullmatch(r'[0-9]{8}',d.get('signatureVersion','')) is None: raise SystemExit('scanner metadata rejected')\nPY\n"
    }
  ]
};
