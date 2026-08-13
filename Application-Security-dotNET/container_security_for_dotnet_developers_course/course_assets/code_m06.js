window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Network Exposure, Ports, TLS, and Service Boundaries' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Expose one internal HTTP port for a trusted TLS proxy",
      "language": "dockerfile",
      "blurb": "The image listens only on the documented application port, carries no certificate or private key, disables diagnostics, runs non-root, and leaves TLS termination and public port publication to reviewed deployment configuration.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS publish\nWORKDIR /src\nCOPY src/Catalog.Api/Catalog.Api.csproj src/Catalog.Api/packages.lock.json ./\nRUN dotnet restore Catalog.Api.csproj --locked-mode\nCOPY src/Catalog.Api/ ./\nRUN --network=none dotnet publish Catalog.Api.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=publish --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV ASPNETCORE_HTTP_PORTS=8080 DOTNET_EnableDiagnostics=0\nEXPOSE 8080\nENTRYPOINT [\"dotnet\", \"Catalog.Api.dll\"]\n"
    },
    {
      "title": "Reject unsafe host port publication",
      "language": "bash",
      "blurb": "The gate parses docker-inspect port bindings, requires the application to expose only TCP 8080, and permits host publication only on loopback with a nonprivileged numeric port; missing or malformed evidence fails closed.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-ports INSPECT.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json, sys\ndef unique(pairs):\n    result={}\n    for key,value in pairs:\n        if key in result: raise ValueError('duplicate JSON member')\n        result[key]=value\n    return result\ndata=json.load(open(sys.argv[1], 'rb'),object_pairs_hook=unique)\nitem=data[0] if isinstance(data,list) and len(data)==1 else None\nif not isinstance(item,dict): raise SystemExit('one inspection object required')\nexposed=(item.get('Config') or {}).get('ExposedPorts') or {}\nif set(exposed) != {'8080/tcp'}: raise SystemExit('unexpected container port')\nbindings=(item.get('HostConfig') or {}).get('PortBindings') or {}\nif set(bindings) not in (set(),{'8080/tcp'}): raise SystemExit('unexpected host port binding')\nfor binding in bindings.get('8080/tcp') or []:\n    if binding.get('HostIp') not in ('127.0.0.1','::1'): raise SystemExit('public host binding rejected')\n    port=binding.get('HostPort','')\n    if not port.isascii() or not port.isdigit() or not 1024 <= int(port) <= 65535: raise SystemExit('host port rejected')\nPY\n"
    }
  ]
};
