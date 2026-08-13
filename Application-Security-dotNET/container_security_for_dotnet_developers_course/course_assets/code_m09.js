window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Logging, Diagnostics, Debugging, and Production Review' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Ship a production runtime without diagnostic endpoints",
      "language": "dockerfile",
      "blurb": "The final chiseled image runs non-root, disables .NET diagnostics and startup hooks, emits application logs to standard streams, exposes only the service port, and contains no debug tools or shell-based health command.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG CHISELED_RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS build\nWORKDIR /src\nCOPY src/Payments.Api/Payments.Api.csproj src/Payments.Api/packages.lock.json ./\nRUN dotnet restore Payments.Api.csproj --locked-mode\nCOPY src/Payments.Api/ ./\nRUN --network=none dotnet publish Payments.Api.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${CHISELED_RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=build --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV ASPNETCORE_HTTP_PORTS=8080 \\\n    DOTNET_EnableDiagnostics=0 \\\n    DOTNET_STARTUP_HOOKS=\nEXPOSE 8080\nENTRYPOINT [\"dotnet\", \"Payments.Api.dll\"]\n"
    },
    {
      "title": "Reject production images with debugging configuration",
      "language": "bash",
      "blurb": "The validator parses one duplicate-free image-inspect record, requires the numeric non-root user and exec-form .NET entry point, rejects startup hooks, diagnostic enablement, shell entry points, extra exposed ports, and embedded health commands.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-production-image INSPECT.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json,re,sys\ndef unique(pairs):\n    result={}\n    for key,value in pairs:\n        if key in result: raise ValueError('duplicate JSON member')\n        result[key]=value\n    return result\ndata=json.load(open(sys.argv[1],'rb'),object_pairs_hook=unique); item=data[0] if isinstance(data,list) and len(data)==1 else None\nif not isinstance(item,dict): raise SystemExit('one image record required')\nc=item.get('Config') or {}; env={}\nfor item_value in c.get('Env') or []:\n    if not isinstance(item_value,str) or '=' not in item_value: raise SystemExit('environment entry rejected')\n    key,value=item_value.split('=',1)\n    if not key or key in env: raise SystemExit('duplicate or empty environment name rejected')\n    env[key]=value\nif re.fullmatch(r'[1-9][0-9]*(:[1-9][0-9]*)?',c.get('User','')) is None: raise SystemExit('non-root user required')\nif any(int(value)>4294967294 for value in c['User'].split(':')): raise SystemExit('numeric user exceeds platform policy')\nif c.get('Entrypoint') != ['dotnet','Payments.Api.dll']: raise SystemExit('entry point rejected')\nif set((c.get('ExposedPorts') or {}).keys()) != {'8080/tcp'}: raise SystemExit('port set rejected')\nif env.get('DOTNET_EnableDiagnostics') != '0' or env.get('DOTNET_STARTUP_HOOKS','') != '': raise SystemExit('diagnostic environment rejected')\nif c.get('Healthcheck') not in (None,{}): raise SystemExit('embedded health command rejected')\nPY\n"
    }
  ]
};
