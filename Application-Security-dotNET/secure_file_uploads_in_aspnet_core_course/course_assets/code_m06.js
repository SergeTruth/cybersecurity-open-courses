window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Image, Document, and Archive Handling Risks' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Isolate document and archive processing in a worker image",
      "language": "dockerfile",
      "blurb": "The locked processor build produces a non-root diagnostics-disabled worker with no listening port. Deployment supplies a bounded scratch volume and enforces CPU, memory, filesystem, and network isolation around high-risk parser libraries.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS publish\nWORKDIR /src\nCOPY src/Upload.Processor/Upload.Processor.csproj src/Upload.Processor/packages.lock.json ./\nRUN dotnet restore Upload.Processor.csproj --locked-mode\nCOPY src/Upload.Processor/ ./\nRUN --network=none dotnet publish Upload.Processor.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=publish --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV DOTNET_EnableDiagnostics=0 \\\n    Processor__ScratchRoot=/work/scratch \\\n    Processor__MaximumExpandedBytes=52428800\nENTRYPOINT [\"dotnet\", \"Upload.Processor.dll\"]\n"
    },
    {
      "title": "Reject unsafe archive inventory before extraction",
      "language": "bash",
      "blurb": "The validator consumes a bounded JSON inventory from a trusted archive reader, rejects absolute, parent, backslash, empty, duplicate, link, device, and oversized entries, and enforces total entry and expanded-byte ceilings before any extraction begins.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 && ! -L $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-archive INVENTORY.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json,os,stat,sys\ndef unique(pairs):\n    result={}\n    for key,value in pairs:\n        if key in result: raise ValueError('duplicate JSON member')\n        result[key]=value\n    return result\np=sys.argv[1]; st=os.stat(p,follow_symlinks=False)\nif not stat.S_ISREG(st.st_mode) or st.st_size > 1024*1024: raise SystemExit('archive inventory rejected')\nd=json.load(open(p,encoding='utf-8'),object_pairs_hook=unique)\nif not isinstance(d,list) or not 1<=len(d)<=1000: raise SystemExit('archive entry count rejected')\nseen=set(); total=0\nfor e in d:\n    if not isinstance(e,dict) or set(e)!={'name','type','size'} or e['type']!='file' or type(e['size']) is not int or not 0<=e['size']<=10*1024*1024: raise SystemExit('archive entry rejected')\n    name=e['name']\n    if not isinstance(name,str) or not name or len(name)>240 or name.startswith('/') or '\\\\' in name: raise SystemExit('archive name rejected')\n    parts=name.split('/')\n    if any(part in ('','.', '..') for part in parts) or name in seen: raise SystemExit('archive path rejected')\n    seen.add(name); total += e['size']\n    if total > 50*1024*1024: raise SystemExit('expanded archive limit exceeded')\nPY\n"
    }
  ]
};
