window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Prove the Acceleration Stack",
  "codeExamples": [
    {
      "title": "Collect a Host GPU Stack Inventory",
      "language": "bash",
      "code": "REPORT=gpu-stack-inventory.txt\n\n{\n  printf '[os]\\n'\n  cat /etc/os-release 2>/dev/null || true\n  printf '\\n[kernel]\\n'\n  uname -a\n  printf '\\n[pci gpu devices]\\n'\n  lspci -nn | grep -Ei 'vga|3d|display|nvidia|amd|ati|intel' || true\n  printf '\\n[loaded gpu modules]\\n'\n  lsmod | grep -Ei 'nvidia|amdgpu|i915|drm' || true\n  printf '\\n[device nodes]\\n'\n  ls -l /dev/nvidia* /dev/dri/* 2>/dev/null || true\n} | tee \"$REPORT\""
    },
    {
      "title": "Check Whether Python Uses GPU Acceleration",
      "language": "python",
      "code": "import json\nimport platform\n\nreport = {\n    \"python\": platform.python_version(),\n    \"gpu_runtime\": \"not checked\",\n    \"available\": False,\n    \"details\": {},\n}\n\ntry:\n    import torch\n\n    report[\"gpu_runtime\"] = \"pytorch\"\n    report[\"available\"] = torch.cuda.is_available()\n    report[\"details\"] = {\n        \"torch\": torch.__version__,\n        \"cuda_build\": torch.version.cuda,\n        \"hip_build\": getattr(torch.version, \"hip\", None),\n        \"device_count\": torch.cuda.device_count(),\n        \"device_names\": [torch.cuda.get_device_name(i) for i in range(torch.cuda.device_count())],\n    }\nexcept Exception as error:\n    report[\"details\"] = {\"error\": str(error)}\n\nprint(json.dumps(report, indent=2))"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
