window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Document and Pin a Known-Good Stack",
  "codeExamples": [
    {
      "title": "Create a Version Manifest Before Changes",
      "language": "bash",
      "code": "MANIFEST=gpu-ai-stack-manifest.txt\n\n{\n  printf '[timestamp]\\n%s\\n\\n' \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"\n  printf '[os]\\n'\n  cat /etc/os-release 2>/dev/null || true\n  printf '\\n[kernel]\\n'\n  uname -r\n  printf '\\n[gpu hardware]\\n'\n  lspci -nn | grep -Ei 'nvidia|amd|ati|vga|3d|display' || true\n  printf '\\n[nvidia]\\n'\n  nvidia-smi --query-gpu=name,driver_version,cuda_version --format=csv 2>/dev/null || true\n  printf '\\n[amd rocm]\\n'\n  rocminfo 2>/dev/null | grep -E 'Name:|Marketing Name|Runtime Version' | head -40 || true\n} | tee \"$MANIFEST\""
    },
    {
      "title": "Capture Package Versions Without Installing Anything",
      "language": "bash",
      "code": "printf '[debian packages]\\n'\ndpkg-query -W 'nvidia*' 'cuda*' 'libcuda*' 'rocm*' 'amdgpu*' 2>/dev/null || true\n\nprintf '\\n[debian package policy]\\n'\napt-cache policy 'nvidia-driver*' 'cuda-toolkit*' 'rocm*' 2>/dev/null || true\n\nprintf '\\n[rpm packages]\\n'\nrpm -qa '*nvidia*' '*cuda*' '*rocm*' '*amdgpu*' 2>/dev/null | sort || true\n\nprintf '\\n[held packages]\\n'\napt-mark showhold 2>/dev/null || true"
    },
    {
      "title": "Write a Rebuild Checklist Artifact",
      "language": "python",
      "code": "from pathlib import Path\n\nsteps = [\n    \"Confirm distribution, kernel, and Secure Boot policy.\",\n    \"Record GPU hardware and current driver stack.\",\n    \"Choose one package source strategy: distribution or vendor.\",\n    \"Confirm kernel headers and DKMS/module rebuild path.\",\n    \"Install or update during a maintenance window.\",\n    \"Validate host GPU tools and AI runtime smoke tests.\",\n    \"Validate container GPU access if containers are used.\",\n    \"Record rollback point, package versions, and validation output.\",\n]\n\nPath(\"gpu-driver-rebuild-checklist.md\").write_text(\n    \"\\n\".join(f\"- [ ] {step}\" for step in steps),\n    encoding=\"utf-8\",\n)"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
