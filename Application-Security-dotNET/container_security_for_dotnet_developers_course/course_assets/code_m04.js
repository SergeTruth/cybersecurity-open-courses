window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Running as Non-Root and Limiting Runtime Privilege' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Run a shell-free application image as a fixed non-root identity",
      "language": "dockerfile",
      "blurb": "The chiseled runtime receives only published output owned by numeric UID and GID 1654, launches through an exec-form entry point, disables diagnostics, and contains no package-manager or user-creation layer in the final image.",
      "code": "# syntax=docker/dockerfile:1.7\nARG SDK_IMAGE\nARG CHISELED_RUNTIME_IMAGE\nFROM ${SDK_IMAGE} AS build\nWORKDIR /src\nCOPY src/Orders.Worker/Orders.Worker.csproj src/Orders.Worker/packages.lock.json ./\nRUN dotnet restore Orders.Worker.csproj --locked-mode\nCOPY src/Orders.Worker/ ./\nRUN --network=none dotnet publish Orders.Worker.csproj -c Release -o /out --no-restore -p:UseAppHost=false\n\nFROM ${CHISELED_RUNTIME_IMAGE}\nWORKDIR /app\nCOPY --from=build --chown=1654:1654 /out/ ./\nUSER 1654:1654\nENV DOTNET_EnableDiagnostics=0 DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1\nENTRYPOINT [\"dotnet\", \"Orders.Worker.dll\"]\n"
    },
    {
      "title": "Verify effective runtime privilege from container inspection evidence",
      "language": "bash",
      "blurb": "The validator parses one duplicate-free docker-inspect JSON document and requires a numeric nonzero user, read-only root filesystem, no-new-privileges, every Linux capability dropped, no privileged mode, and no writable bind mounts.",
      "code": "#!/usr/bin/env -S -i PATH=/usr/bin:/bin /bin/bash --noprofile --norc\nset -euo pipefail\n[[ $# -eq 1 && -f $1 ]] || { /usr/bin/printf '%s\\n' 'usage: verify-runtime INSPECT.json' >&2; exit 2; }\n/usr/bin/python3 - \"$1\" <<'PY'\nimport json, re, sys\ndef unique(pairs):\n    result={}\n    for key,value in pairs:\n        if key in result: raise ValueError('duplicate JSON member')\n        result[key]=value\n    return result\nwith open(sys.argv[1], 'rb') as handle:\n    data = json.load(handle, object_pairs_hook=unique)\nitem = data[0] if isinstance(data, list) and len(data) == 1 else None\nif not isinstance(item, dict): raise SystemExit('one inspection object required')\nconfig, host = item.get('Config', {}), item.get('HostConfig', {})\nuser = config.get('User')\nif not isinstance(user, str) or re.fullmatch(r'[1-9][0-9]*(:[1-9][0-9]*)?', user) is None: raise SystemExit('non-root numeric user required')\nif any(int(value)>4294967294 for value in user.split(':')): raise SystemExit('numeric user exceeds platform policy')\nif host.get('Privileged') is not False or host.get('ReadonlyRootfs') is not True: raise SystemExit('runtime isolation rejected')\nif 'no-new-privileges' not in (host.get('SecurityOpt') or []): raise SystemExit('no-new-privileges required')\nif host.get('CapDrop') != ['ALL'] or host.get('CapAdd') not in (None,[]): raise SystemExit('capability policy rejected')\nfor mount in item.get('Mounts') or []:\n    if mount.get('Type') == 'bind' and mount.get('RW') is True: raise SystemExit('writable bind mount rejected')\nPY\n"
    }
  ]
};
