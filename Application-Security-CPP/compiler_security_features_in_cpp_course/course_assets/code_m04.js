window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Executable Layout, PIE, ASLR, and Memory Permissions to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Link PIE, RELRO, immediate binding, and a non-executable stack",
      "language": "bash",
      "blurb": "The command names each linker control explicitly for the release executable rather than relying on toolchain defaults.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nsource=${1:?translation unit required}\noutput=${2:?output executable required}\n\n/usr/bin/g++ -std=c++20 -O2 -fPIE \"$source\" -pie   -Wl,-z,relro,-z,now,-z,noexecstack   -o \"$output\"\n"
    },
    {
      "title": "Inspect memory-permission and relocation metadata",
      "language": "bash",
      "blurb": "The release gate confirms a position-independent executable, bind-now relocation policy, and no executable GNU stack.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nbinary=${1:?release executable required}\n\n/usr/bin/readelf -h \"$binary\" | /usr/bin/grep -Eq 'Type:[[:space:]]+DYN'\n/usr/bin/readelf -d \"$binary\" | /usr/bin/grep -Eq 'BIND_NOW|FLAGS.*NOW'\n/usr/bin/readelf -W -l \"$binary\" |\n  /usr/bin/awk '/GNU_STACK/ { found=1; if ($0 ~ /RWE/) exit 1 } END { exit !found }'\n"
    }
  ]
};
