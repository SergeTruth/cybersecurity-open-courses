window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Log effective authority without sensitive environment data",
      "language": "bash",
      "blurb": "The audit event records IDs, groups, and capability sets while omitting environment variables, command arguments, and secret contents.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nuid=\"$(id -u)\"\ngid=\"$(id -g)\"\ngroups=\"$(id -G | tr ' ' ',')\"\ncaps=\"$(awk '/^CapEff:/ {print $2}' /proc/self/status)\"\n[[ \"$uid$gid\" =~ ^[0-9]+$ && \"$caps\" =~ ^[A-Fa-f0-9]+$ ]] || exit 70\nlogger --tag privilege-audit -- \\\n  \"event=authority_snapshot uid=$uid gid=$gid groups=$groups cap_eff=$caps\"\n"
    },
    {
      "title": "Compare privileged access with an approved roster",
      "language": "bash",
      "blurb": "With authoritative enumerable account data, the review combines explicit members with accounts whose primary GID is sudo. Separate sudoers-policy and live-session reviews remain necessary.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n# NSS enumeration must be authoritative and complete for this deployment.\n# This reviews group membership, not all sudoers grants or already-running sessions.\napproved=\"${1:?approved sorted roster required}\"\n[[ -f \"$approved\" && ! -L \"$approved\" ]] || exit 66\nstage=\"$(mktemp -d)\"\ntrap 'rm -f -- \"$stage/group\" \"$stage/passwd\" \"$stage/current\"; rmdir -- \"$stage\"' EXIT\ntrap 'exit 130' INT\ntrap 'exit 143' TERM HUP\ngetent group sudo > \"$stage/group\" || exit 70\ngetent passwd > \"$stage/passwd\" || exit 70\n[[ \"$(wc -l < \"$stage/group\")\" -eq 1 ]] || exit 70\nIFS=: read -r group_name password gid members < \"$stage/group\"\n[[ \"$group_name\" == sudo && \"$gid\" =~ ^[0-9]{1,10}$ ]] || exit 70\nawk -F: -v gid=\"$gid\" '\n  NR == FNR {n=split($4, names, \",\"); for(i=1;i<=n;i++) if(names[i]!=\"\") print names[i]; next}\n  $4 == gid {print $1}\n' \"$stage/group\" \"$stage/passwd\" | LC_ALL=C sort -u > \"$stage/current\"\nif ! diff -u -- \"$approved\" \"$stage/current\"; then\n  printf 'privileged membership review required\\n' >&2; exit 77\nfi\n"
    }
  ]
};
