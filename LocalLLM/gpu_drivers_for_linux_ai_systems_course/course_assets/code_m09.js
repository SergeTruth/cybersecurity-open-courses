window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Build a Repeatable GPU Validation Record",
  "codeExamples": [
    {
      "title": "Run a Compact End-to-End Validation Checklist",
      "language": "bash",
      "code": "REPORT=gpu-ai-validation-summary.txt\n\n{\n  printf '[kernel]\\n'\n  uname -r\n  printf '\\n[hardware]\\n'\n  lspci -nn | grep -Ei 'nvidia|amd|ati|vga|3d|display' || true\n  printf '\\n[modules]\\n'\n  lsmod | grep -Ei 'nvidia|amdgpu|drm' || true\n  printf '\\n[nvidia status]\\n'\n  nvidia-smi --query-gpu=name,driver_version,cuda_version,memory.total --format=csv 2>/dev/null || true\n  printf '\\n[amd status]\\n'\n  rocminfo 2>/dev/null | grep -E 'Name:|Runtime Version' | head -30 || true\n  printf '\\n[devices]\\n'\n  ls -l /dev/nvidia* /dev/dri/renderD* /dev/kfd 2>/dev/null || true\n} | tee \"$REPORT\""
    },
    {
      "title": "Track Evidence Needed for a Recoverable Stack",
      "language": "python",
      "code": "from pathlib import Path\n\nrequired_artifacts = {\n    \"stack_manifest\": \"gpu-ai-stack-manifest.txt\",\n    \"validation_summary\": \"gpu-ai-validation-summary.txt\",\n    \"python_smoke_test\": \"gpu-python-smoke.json\",\n    \"container_check\": \"container-gpu-check.txt\",\n    \"package_versions\": \"gpu-package-versions.txt\",\n    \"rollback_plan\": \"gpu-driver-rebuild-checklist.md\",\n}\n\nfor name, path in required_artifacts.items():\n    status = \"present\" if Path(path).exists() else \"missing\"\n    print({\"artifact\": name, \"path\": path, \"status\": status})"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
